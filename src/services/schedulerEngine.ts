import { getChapterMaster } from '../data/lessonPlansMaster';
import {
  AcademicYear,
  CurriculumItem,
  TimetableSlot,
  SchoolCalendarEvent,
  ScheduledLesson,
  LessonPlan,
  TeachingPeriodConfig
} from '../types';
import { storageService } from './storageService';

export interface GenerationResult {
  totalGenerated: number;
  preservedCount: number;
  newCount: number;
  expectedCompletionDate?: string;
  remainingCurriculumCount: number;
  warnings: string[];
  scheduledLessons: ScheduledLesson[];
}

export interface ConflictReport {
  hasConflict: boolean;
  errors: string[];
}

export class SchedulerEngine {
  /**
   * Conflict Detection before saving timetable slots
   */
  public detectTimetableConflicts(
    slots: TimetableSlot[],
    candidate: Partial<TimetableSlot>,
    ignoreId?: string
  ): ConflictReport {
    const errors: string[] = [];
    const activeSlots = slots.filter(s => s.status === 'ACTIVE' && s.timetableId !== ignoreId);

    for (const slot of activeSlots) {
      if (slot.dayOfWeek !== candidate.dayOfWeek || slot.periodNumber !== candidate.periodNumber) {
        continue;
      }

      // Conflict 1: A teacher cannot teach two classes at the same time
      if (candidate.teacherId && slot.teacherId === candidate.teacherId) {
        errors.push(
          `លោកគ្រូ/អ្នកគ្រូ បានជាប់បង្រៀនថ្នាក់មួយទៀតរួចហើយនៅ ថ្ងៃទី ${slot.dayOfWeek} ម៉ោងទី ${slot.periodNumber}!`
        );
      }

      // Conflict 2: A class cannot study two subjects at the same time
      if (candidate.classId && slot.classId === candidate.classId) {
        errors.push(
          `ថ្នាក់នេះមានមុខវិជ្ជាកំពុងរៀនរួចហើយនៅ ថ្ងៃទី ${slot.dayOfWeek} ម៉ោងទី ${slot.periodNumber}!`
        );
      }
    }

    return {
      hasConflict: errors.length > 0,
      errors
    };
  }

  /**
   * Generates all teaching dates and matches curriculum sequentially
   */
  public async generateAnnualSchedule(
    academicYearId: string,
    targetClassId?: string,
    targetSubjectId?: string,
    newStartDate?: string,
    forceResetAll: boolean = false
  ): Promise<GenerationResult> {
    const years = await storageService.getAcademicYears();
    const activeYear = years.find(y => y.academicYearId === academicYearId);
    if (!activeYear) {
      throw new Error('រកមិនឃើញឆ្នាំសិក្សាដែលបានជ្រើសរើស!');
    }

    if (newStartDate) {
      await storageService.updateAcademicOpeningDate(newStartDate);
      activeYear.startDate = newStartDate;
    }

    const settings = await storageService.getSettings();
    const periods = settings.periods || [];
    const allTimetables = await storageService.getTimetables(academicYearId);
    const calendarEvents = await storageService.getCalendarEvents(academicYearId);
    const allCurriculum = await storageService.getCurriculum(academicYearId);
    const existingScheduled = await storageService.getScheduledLessons(academicYearId);
    const existingLessonPlans = await storageService.getLessonPlans();

    // 1. Identify preserved sessions (completed, has attendance, or custom lesson plan edited)
    const preservedIds = new Set<string>();
    const preservedSessions: ScheduledLesson[] = [];

    if (!forceResetAll) {
      for (const s of existingScheduled) {
        if (targetClassId && s.classId !== targetClassId) {
          preservedSessions.push(s);
          preservedIds.add(s.scheduledLessonId);
          continue;
        }
        if (targetSubjectId && s.subjectId !== targetSubjectId) {
          preservedSessions.push(s);
          preservedIds.add(s.scheduledLessonId);
          continue;
        }

        const isCompleted = s.teachingStatus === 'COMPLETED' || s.teachingStatus === 'MISSED' || s.isMakeUp;
        const hasPlan = existingLessonPlans.some(p => p.scheduledLessonId === s.scheduledLessonId && p.status !== 'NOT_PREPARED');

        if (isCompleted || hasPlan) {
          preservedSessions.push(s);
          preservedIds.add(s.scheduledLessonId);
        }
      }
    }

    // Filter timetables
    let timetableToUse = allTimetables.filter(t => t.status === 'ACTIVE');
    if (targetClassId) {
      timetableToUse = timetableToUse.filter(t => t.classId === targetClassId);
    }
    if (targetSubjectId) {
      timetableToUse = timetableToUse.filter(t => t.subjectId === targetSubjectId);
    }

    // Filter curriculum
    let curriculumToUse = allCurriculum.sort((a, b) => a.lessonOrder - b.lessonOrder);
    if (targetSubjectId) {
      curriculumToUse = curriculumToUse.filter(c => c.subjectId === targetSubjectId);
    }

    // 2. Build list of valid teaching dates between startDate and endDate
    const startDate = new Date(activeYear.startDate);
    const endDate = new Date(activeYear.endDate);
    const warnings: string[] = [];

    // Map holidays by Date string
    const holidayMap = new Map<string, SchoolCalendarEvent>();
    for (const ev of calendarEvents) {
      if (!ev.isTeachingDay) {
        let cur = new Date(ev.startDate);
        const evEnd = new Date(ev.endDate);
        while (cur <= evEnd) {
          const ds = cur.toISOString().split('T')[0];
          holidayMap.set(ds, ev);
          cur.setDate(cur.getDate() + 1);
        }
      }
    }

    // Group curriculum by class/subject pairs
    const classes = targetClassId ? [targetClassId] : Array.from(new Set(timetableToUse.map(t => t.classId)));
    const newScheduledLessons: ScheduledLesson[] = [];
    const newLessonPlans: LessonPlan[] = [];

    for (const cId of classes) {
      const classTimetable = timetableToUse.filter(t => t.classId === cId);
      const subjectsInClass = Array.from(new Set(classTimetable.map(t => t.subjectId)));

      for (const sId of subjectsInClass) {
        const slots = classTimetable.filter(t => t.subjectId === sId);
        const subjectCurriculum = curriculumToUse.filter(c => c.subjectId === sId);

        // Track curriculum progress pointer
        let currIdx = 0;
        let currPeriodAllocated = 0;

        // Skip curriculum items already covered in preserved sessions
        const preservedForClassSubj = preservedSessions.filter(
          p => p.classId === cId && p.subjectId === sId && p.curriculumId
        );
        const coveredCurriculumIds = new Set(preservedForClassSubj.map(p => p.curriculumId));
        while (currIdx < subjectCurriculum.length && coveredCurriculumIds.has(subjectCurriculum[currIdx].curriculumId)) {
          currIdx++;
        }

        // Generate day by day
        let currentDay = new Date(startDate);
        while (currentDay <= endDate) {
          const dayOfWeek = currentDay.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
          const dateStr = currentDay.toISOString().split('T')[0];

          // Check if Sunday or non-working day
          if (dayOfWeek === 0 || !settings.workingDays.includes(dayOfWeek)) {
            currentDay.setDate(currentDay.getDate() + 1);
            continue;
          }

          // Check if Holiday/Closure
          const holiday = holidayMap.get(dateStr);
          if (holiday && holiday.isFullDay) {
            currentDay.setDate(currentDay.getDate() + 1);
            continue;
          }

          // Find timetable slots for this day of week
          const daySlots = slots.filter(s => s.dayOfWeek === dayOfWeek).sort((a, b) => a.periodNumber - b.periodNumber);

          for (const slot of daySlots) {
            // Check if already in preserved sessions
            const alreadyExists = preservedSessions.some(
              p => p.date === dateStr && p.periodNumber === slot.periodNumber && p.classId === cId
            );
            if (alreadyExists) {
              continue;
            }

            // Check half-day closure blocking
            if (holiday && !holiday.isFullDay) {
              const pConfig = periods.find(p => p.periodNumber === slot.periodNumber);
              if (holiday.blockedSession === 'MORNING' && pConfig?.session === 'MORNING') continue;
              if (holiday.blockedSession === 'AFTERNOON' && pConfig?.session === 'AFTERNOON') continue;
            }

            // Allocate curriculum item
            let matchedCurr: CurriculumItem | undefined = undefined;
            if (currIdx < subjectCurriculum.length) {
              matchedCurr = subjectCurriculum[currIdx];
              currPeriodAllocated++;
              if (currPeriodAllocated >= (matchedCurr.requiredPeriods || 1)) {
                currIdx++;
                currPeriodAllocated = 0;
              }
            }

            const lessonId = `SCH-${cId}-${dateStr}-P${slot.periodNumber}`;
            const schedLesson: ScheduledLesson = {
              scheduledLessonId: lessonId,
              academicYearId,
              date: dateStr,
              dayOfWeek,
              periodNumber: slot.periodNumber,
              startTime: slot.startTime,
              endTime: slot.endTime,
              teacherId: slot.teacherId,
              classId: cId,
              subjectId: sId,
              curriculumId: matchedCurr?.curriculumId,
              chapterNumber: matchedCurr?.chapterNumber,
              chapterTitle: matchedCurr?.chapterTitle,
              lessonTitle: matchedCurr?.lessonTitle,
              topic: matchedCurr?.topicTitle || 'ស្វ័យសិក្សា និងរំលឹកមេរៀន',
              lessonOrder: matchedCurr?.lessonOrder,
              teachingStatus: 'PLANNED'
            };
            newScheduledLessons.push(schedLesson);

            // Pre-create linked 5-step Lesson Plan if not exists
            const existingPlan = existingLessonPlans.find(p => p.scheduledLessonId === lessonId);
            if (!existingPlan && matchedCurr) {
              const master = getChapterMaster(matchedCurr.chapterNumber);
              const planId = `LP-${lessonId}`;
              const newPlan: LessonPlan = {
                lessonPlanId: planId,
                scheduledLessonId: lessonId,
                academicYearId,
                teacherId: slot.teacherId,
                classId: cId,
                subjectId: sId,
                date: dateStr,
                periodNumber: slot.periodNumber,
                chapterTitle: matchedCurr.chapterTitle,
                lessonTitle: matchedCurr.lessonTitle,
                topic: matchedCurr.topicTitle,
                durationMinutes: 50,
                learningObjectivesKnowledge: master.objectivesKnowledge || matchedCurr.learningObjectives,
                learningObjectivesSkills: master.objectivesSkill,
                learningObjectivesAttitude: master.objectivesAttitude,
                teachingMaterials: `${master.teachingMaterials.join(', ')} (ទំព័រ ${matchedCurr.studentBookPage || ''})`,
                teachingMethods: master.teachingMethod,
                steps: [
                  {
                    stepNumber: 1,
                    stepNameKm: 'ជំហានទី ១',
                    stepSubNameKm: master.defaultSteps.step1.title,
                    teacherActivities: master.defaultSteps.step1.teacherActivity,
                    studentActivities: master.defaultSteps.step1.studentActivity,
                    content: master.defaultSteps.step1.content,
                    durationMinutes: master.defaultSteps.step1.durationMin
                  },
                  {
                    stepNumber: 2,
                    stepNameKm: 'ជំហានទី ២',
                    stepSubNameKm: master.defaultSteps.step2.title,
                    teacherActivities: master.defaultSteps.step2.teacherActivity,
                    studentActivities: master.defaultSteps.step2.studentActivity,
                    content: master.defaultSteps.step2.content,
                    durationMinutes: master.defaultSteps.step2.durationMin
                  },
                  {
                    stepNumber: 3,
                    stepNameKm: 'ជំហានទី ៣',
                    stepSubNameKm: master.defaultSteps.step3.title,
                    teacherActivities: master.defaultSteps.step3.teacherActivity,
                    studentActivities: master.defaultSteps.step3.studentActivity,
                    content: `${matchedCurr.lessonTitle} - ${matchedCurr.topicTitle}: ${master.defaultSteps.step3.content}`,
                    durationMinutes: master.defaultSteps.step3.durationMin
                  },
                  {
                    stepNumber: 4,
                    stepNameKm: 'ជំហានទី ៤',
                    stepSubNameKm: master.defaultSteps.step4.title,
                    teacherActivities: master.defaultSteps.step4.teacherActivity,
                    studentActivities: master.defaultSteps.step4.studentActivity,
                    content: master.defaultSteps.step4.content,
                    durationMinutes: master.defaultSteps.step4.durationMin
                  },
                  {
                    stepNumber: 5,
                    stepNameKm: 'ជំហានទី ៥',
                    stepSubNameKm: master.defaultSteps.step5.title,
                    teacherActivities: master.defaultSteps.step5.teacherActivity,
                    studentActivities: master.defaultSteps.step5.studentActivity,
                    content: master.defaultSteps.step5.content,
                    durationMinutes: master.defaultSteps.step5.durationMin
                  }
                ],
                assessmentHomework: master.defaultSteps.step5.content || 'លំហាត់អនុវត្តតាមសៀវភៅពុម្ព',
                notes: 'ដកស្រង់ចេញពីកិច្ចតែងការបង្រៀនគណិតវិទ្យាថ្នាក់ទី៨ វិទ្យាស្ថានជាតិអប់រំ (NIE) ជំនាន់ទី១៧',
                status: 'PREPARED',
                updatedAt: new Date().toISOString()
              };
              newLessonPlans.push(newPlan);
            }
          }

          currentDay.setDate(currentDay.getDate() + 1);
        }

        // Check if curriculum was completely scheduled
        if (currIdx < subjectCurriculum.length) {
          const remaining = subjectCurriculum.length - currIdx;
          warnings.push(
            `ថ្នាក់ ${cId}: កម្មវិធីសិក្សានៅសល់ ${remaining} មេរៀនមិនទាន់មានម៉ោងគ្រប់គ្រាន់ (សូមពិនិត្យកាលវិភាគ ឬម៉ោងបង្រៀនសង)!`
          );
        }
      }
    }

    const finalScheduled = [...preservedSessions, ...newScheduledLessons].sort((a, b) => {
      const diff = a.date.localeCompare(b.date);
      if (diff !== 0) return diff;
      return a.periodNumber - b.periodNumber;
    });

    // Save scheduled lessons
    await storageService.bulkSaveScheduledLessons(finalScheduled);

    // Save newly generated lesson plans
    for (const plan of newLessonPlans) {
      await storageService.saveLessonPlan(plan);
    }

    const lastScheduled = finalScheduled[finalScheduled.length - 1];

    return {
      totalGenerated: finalScheduled.length,
      preservedCount: preservedSessions.length,
      newCount: newScheduledLessons.length,
      expectedCompletionDate: lastScheduled ? lastScheduled.date : undefined,
      remainingCurriculumCount: warnings.length,
      warnings,
      scheduledLessons: finalScheduled
    };
  }
}

export const schedulerEngine = new SchedulerEngine();

