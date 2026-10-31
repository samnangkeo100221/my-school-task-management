import {
  SchoolSettings,
  AcademicYear,
  Teacher,
  Student,
  ClassRoom,
  Subject,
  CurriculumItem,
  TimetableSlot,
  SchoolCalendarEvent,
  TeachingPeriodConfig,
  LessonPlan
} from '../types';

export const initialPeriods: TeachingPeriodConfig[] = [
  { periodNumber: 1, periodNameKm: 'ម៉ោងទី ១', startTime: '07:00', endTime: '08:00', session: 'MORNING' },
  { periodNumber: 2, periodNameKm: 'ម៉ោងទី ២', startTime: '08:00', endTime: '09:00', session: 'MORNING' },
  { periodNumber: 3, periodNameKm: 'ម៉ោងទី ៣', startTime: '09:00', endTime: '10:00', session: 'MORNING' },
  { periodNumber: 4, periodNameKm: 'ម៉ោងទី ៤', startTime: '10:00', endTime: '11:00', session: 'MORNING' },
  { periodNumber: 5, periodNameKm: 'ម៉ោងទី ៥', startTime: '13:00', endTime: '14:00', session: 'AFTERNOON' },
  { periodNumber: 6, periodNameKm: 'ម៉ោងទី ៦', startTime: '14:00', endTime: '15:00', session: 'AFTERNOON' },
  { periodNumber: 7, periodNameKm: 'ម៉ោងទី ៧', startTime: '15:00', endTime: '16:00', session: 'AFTERNOON' },
  { periodNumber: 8, periodNameKm: 'ម៉ោងទី ៨', startTime: '16:00', endTime: '17:00', session: 'AFTERNOON' },
];

export const initialSchoolSettings: SchoolSettings = {
  schoolId: 'HS-BATDOENG',
  schoolNameKm: 'វិទ្យាល័យ ហ៊ុន សែន បាត់ដឹង',
  schoolNameEn: 'Hun Sen Batdoeng High School',
  sloganKm: 'គុណភាព សីលធម៌ សមត្ថភាព និងការអភិវឌ្ឍ',
  provinceKm: 'កំពង់ស្ពឺ',
  districtKm: 'ឧដុង្គ',
  academicYearActiveId: 'AY-2025-2026',
  phone: '012 889 456',
  email: 'samnang.keo@school.edu.kh',
  directorNameKm: 'គង់ វឌ្ឍនា',
  periods: initialPeriods,
  workingDays: [1, 2, 3, 4, 5, 6],
};

export const initialAcademicYears: AcademicYear[] = [
  {
    academicYearId: 'AY-2025-2026',
    yearName: '២០២៥-២០២៦',
    startDate: '2025-11-01',
    endDate: '2026-08-31',
    status: 'ACTIVE',
    description: 'ឆ្នាំសិក្សាគោលសម្រាប់កម្មវិធីសិក្សាលម្អិតថ្នាក់ទី ៨ (គណិតវិទ្យា)'
  },
  {
    academicYearId: 'AY-2024-2025',
    yearName: '២០២៤-២០២៥',
    startDate: '2024-11-01',
    endDate: '2025-08-31',
    status: 'ARCHIVED',
    description: 'ឆ្នាំសិក្សាកន្លងទៅ'
  }
];

// Single subject: គណិតវិទ្យា
export const initialSubjects: Subject[] = [
  {
    subjectId: 'SUB-MATH-8',
    subjectCode: 'MATH-8',
    subjectName: 'គណិតវិទ្យា',
    description: 'គណិតវិទ្យាថ្នាក់ទី ៨ (ពីជគណិត និងធរណីមាត្រ - វិទ្យាល័យហ៊ុនសែន បាត់ដឹង)',
    color: '#2563eb',
    status: 'ACTIVE'
  }
];

// Single teacher: លោកគ្រូ កែវ សំណាង
export const initialTeachers: Teacher[] = [
  {
    teacherId: 'T-001',
    teacherCode: 'T-KS01',
    fullName: 'កែវ សំណាង',
    gender: 'M',
    phone: '012 889 456',
    email: 'samnang.keo@school.edu.kh',
    address: 'ភូមិបាត់ដឹង ឃុំក្សេមក្សាន្ត ស្រុកឧដុង្គ ខេត្តកំពង់ស្ពឺ',
    subjects: ['SUB-MATH-8'],
    assignedClasses: ['CLS-8A', 'CLS-8B', 'CLS-8C', 'CLS-8D'],
    employmentStatus: 'ACTIVE',
    weeklyWorkloadHours: 20
  }
];

// 4 Grade 8 Classes taught by Keo Samnang
export const initialClasses: ClassRoom[] = [
  { classId: 'CLS-8A', grade: 8, className: '៨ក (8A)', academicYearId: 'AY-2025-2026', homeroomTeacherId: 'T-001', roomNumber: 'B1-01', capacity: 45, status: 'ACTIVE' },
  { classId: 'CLS-8B', grade: 8, className: '៨ខ (8B)', academicYearId: 'AY-2025-2026', homeroomTeacherId: 'T-001', roomNumber: 'B1-02', capacity: 45, status: 'ACTIVE' },
  { classId: 'CLS-8C', grade: 8, className: '៨គ (8C)', academicYearId: 'AY-2025-2026', homeroomTeacherId: 'T-001', roomNumber: 'B1-03', capacity: 42, status: 'ACTIVE' },
  { classId: 'CLS-8D', grade: 8, className: '៨ឃ (8D)', academicYearId: 'AY-2025-2026', homeroomTeacherId: 'T-001', roomNumber: 'B1-04', capacity: 44, status: 'ACTIVE' },
];

export const initialStudents: Student[] = [
  { studentId: 'STU-801', studentCode: 'BD-801', fullName: 'សុខ មករា', gender: 'M', dateOfBirth: '2011-01-15', classId: 'CLS-8A', guardianName: 'សុខ គឹមហួរ', guardianPhone: '012 334 455', status: 'ACTIVE' },
  { studentId: 'STU-802', studentCode: 'BD-802', fullName: 'ចាន់ ធារី', gender: 'F', dateOfBirth: '2011-03-22', classId: 'CLS-8A', guardianName: 'ចាន់ ផល្លា', guardianPhone: '097 555 441', status: 'ACTIVE' },
  { studentId: 'STU-803', studentCode: 'BD-803', fullName: 'លី វិចិត្រ', gender: 'M', dateOfBirth: '2011-05-10', classId: 'CLS-8A', guardianName: 'លី វណ្ណៈ', guardianPhone: '070 889 911', status: 'ACTIVE' },
  { studentId: 'STU-804', studentCode: 'BD-804', fullName: 'ហេង មុន្នីរ័ត្ន', gender: 'F', dateOfBirth: '2011-07-08', classId: 'CLS-8A', guardianName: 'ហេង សុផល', guardianPhone: '088 777 223', status: 'ACTIVE' },
  { studentId: 'STU-805', studentCode: 'BD-805', fullName: 'ខៀវ សុវណ្ណារ៉ា', gender: 'M', dateOfBirth: '2011-09-18', classId: 'CLS-8A', guardianName: 'ខៀវ ចរិយា', guardianPhone: '092 112 233', status: 'ACTIVE' },
  { studentId: 'STU-806', studentCode: 'BD-806', fullName: 'អ៊ុំ ស្រីនិច', gender: 'F', dateOfBirth: '2011-11-25', classId: 'CLS-8A', guardianName: 'អ៊ុំ ពិទូ', guardianPhone: '016 445 566', status: 'ACTIVE' },
  { studentId: 'STU-807', studentCode: 'BD-807', fullName: 'នួន រតនៈ', gender: 'M', dateOfBirth: '2011-02-14', classId: 'CLS-8B', guardianName: 'នួន សារឿន', guardianPhone: '011 223 344', status: 'ACTIVE' },
  { studentId: 'STU-808', studentCode: 'BD-808', fullName: 'សេង ម៉ារីណា', gender: 'F', dateOfBirth: '2011-06-30', classId: 'CLS-8B', guardianName: 'សេង តុលា', guardianPhone: '089 998 877', status: 'ACTIVE' },
  { studentId: 'STU-809', studentCode: 'BD-809', fullName: 'ប៉ែន វីរៈ', gender: 'M', dateOfBirth: '2011-08-12', classId: 'CLS-8C', guardianName: 'ប៉ែន សម្បត្តិ', guardianPhone: '096 332 211', status: 'ACTIVE' },
  { studentId: 'STU-810', studentCode: 'BD-810', fullName: 'កែវ សុគន្ធា', gender: 'F', dateOfBirth: '2011-10-05', classId: 'CLS-8D', guardianName: 'កែវ សារិន', guardianPhone: '078 667 788', status: 'ACTIVE' },
];

export const initialCalendarEvents: SchoolCalendarEvent[] = [
  { eventId: 'EV-01', academicYearId: 'AY-2025-2026', eventTitle: 'បើកបវេសនកាលឆ្នាំសិក្សាថ្មី ២០២៥-២០២៦', eventType: 'ACADEMIC_OPENING', startDate: '2025-11-01', endDate: '2025-11-01', isFullDay: true, isTeachingDay: true, description: 'ទិវាបើកបវេសនកាលទូទាំងប្រទេស' },
  { eventId: 'EV-02', academicYearId: 'AY-2025-2026', eventTitle: 'ទិវាបុណ្យឯករាជ្យជាតិ (៩ វិច្ឆិកា)', eventType: 'NATIONAL_HOLIDAY', startDate: '2025-11-09', endDate: '2025-11-09', isFullDay: true, isTeachingDay: false, description: 'ទិវាបុណ្យឯករាជ្យជាតិលើកទី ៧២' },
  { eventId: 'EV-03', academicYearId: 'AY-2025-2026', eventTitle: 'ព្រះរាជពិធីបុណ្យអុំទូក បណ្តែតប្រទីប និងសំពះព្រះខែ', eventType: 'TRADITIONAL_FESTIVAL', startDate: '2025-11-14', endDate: '2025-11-16', isFullDay: true, isTeachingDay: false, description: 'ឈប់សម្រាកបុណ្យអុំទូក ៣ ថ្ងៃ' },
  { eventId: 'EV-04', academicYearId: 'AY-2025-2026', eventTitle: 'ទិវាចូលឆ្នាំសកល (International New Year)', eventType: 'NATIONAL_HOLIDAY', startDate: '2026-01-01', endDate: '2026-01-01', isFullDay: true, isTeachingDay: false, description: 'ទិវាចូលឆ្នាំសកល' },
  { eventId: 'EV-05', academicYearId: 'AY-2025-2026', eventTitle: 'ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍ (៧ មករា)', eventType: 'NATIONAL_HOLIDAY', startDate: '2026-01-07', endDate: '2026-01-07', isFullDay: true, isTeachingDay: false, description: 'ទិវាជ័យជម្នះ ៧ មករា' },
  { eventId: 'EV-06', academicYearId: 'AY-2025-2026', eventTitle: 'ទិវាសិទ្ធិនារីអន្តរជាតិ (៨ មីនា)', eventType: 'NATIONAL_HOLIDAY', startDate: '2026-03-08', endDate: '2026-03-08', isFullDay: true, isTeachingDay: false, description: 'ទិវាសិទ្ធិនារីអន្តរជាតិ' },
  { eventId: 'EV-07', academicYearId: 'AY-2025-2026', eventTitle: 'ការប្រឡងឆមាសលើកទី ១', eventType: 'EXAMINATION', startDate: '2026-03-24', endDate: '2026-03-26', isFullDay: true, isTeachingDay: true, description: 'ប្រឡងឆមាសទី១ សិស្សថ្នាក់ទី ៧ ដល់ ទី ៩' },
  { eventId: 'EV-08', academicYearId: 'AY-2025-2026', eventTitle: 'វិស្សមកាលតូច និងពិធីបុណ្យចូលឆ្នាំខ្មែរ', eventType: 'TRADITIONAL_FESTIVAL', startDate: '2026-04-12', endDate: '2026-04-19', isFullDay: true, isTeachingDay: false, description: 'ឈប់សម្រាកវិស្សមកាលតូច និងចូលឆ្នាំថ្មីប្រពៃណីជាតិ' },
  { eventId: 'EV-09', academicYearId: 'AY-2025-2026', eventTitle: 'ទិវាពលកម្មអន្តរជាតិ (១ ឧសភា)', eventType: 'NATIONAL_HOLIDAY', startDate: '2026-05-01', endDate: '2026-05-01', isFullDay: true, isTeachingDay: false, description: 'ទិវាពលកម្មអន្តរជាតិ' },
  { eventId: 'EV-10', academicYearId: 'AY-2025-2026', eventTitle: 'ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល', eventType: 'TRADITIONAL_FESTIVAL', startDate: '2026-05-05', endDate: '2026-05-05', isFullDay: true, isTeachingDay: false, description: 'ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល' },
  { eventId: 'EV-11', academicYearId: 'AY-2025-2026', eventTitle: 'ការប្រឡងឆមាសលើកទី ២', eventType: 'EXAMINATION', startDate: '2026-08-10', endDate: '2026-08-13', isFullDay: true, isTeachingDay: true, description: 'ការប្រឡងបញ្ចប់ឆ្នាំសិក្សា' },
  { eventId: 'EV-12', academicYearId: 'AY-2025-2026', eventTitle: 'បិទបញ្ចប់ឆ្នាំសិក្សា ២០២៥-២០២៦', eventType: 'ACADEMIC_CLOSING', startDate: '2026-08-31', endDate: '2026-08-31', isFullDay: true, isTeachingDay: true, description: 'ទិវាបិទបញ្ចប់ឆ្នាំសិក្សា និងចែករង្វាន់' },
];

// Timetable for Keo Samnang (Grade 8 Math - 20 periods/week across 8A, 8B, 8C, 8D)
export const initialTimetable: TimetableSlot[] = [
  // Monday: 8A (P1, P2), 8B (P3, P4)
  { timetableId: 'TT-01', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8A', subjectId: 'SUB-MATH-8', dayOfWeek: 1, periodNumber: 1, startTime: '07:00', endTime: '08:00', room: 'B1-01', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-02', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8A', subjectId: 'SUB-MATH-8', dayOfWeek: 1, periodNumber: 2, startTime: '08:00', endTime: '09:00', room: 'B1-01', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-03', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8B', subjectId: 'SUB-MATH-8', dayOfWeek: 1, periodNumber: 3, startTime: '09:00', endTime: '10:00', room: 'B1-02', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-04', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8B', subjectId: 'SUB-MATH-8', dayOfWeek: 1, periodNumber: 4, startTime: '10:00', endTime: '11:00', room: 'B1-02', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },

  // Tuesday: 8C (P1, P2), 8D (P3, P4)
  { timetableId: 'TT-05', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8C', subjectId: 'SUB-MATH-8', dayOfWeek: 2, periodNumber: 1, startTime: '07:00', endTime: '08:00', room: 'B1-03', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-06', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8C', subjectId: 'SUB-MATH-8', dayOfWeek: 2, periodNumber: 2, startTime: '08:00', endTime: '09:00', room: 'B1-03', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-07', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8D', subjectId: 'SUB-MATH-8', dayOfWeek: 2, periodNumber: 3, startTime: '09:00', endTime: '10:00', room: 'B1-04', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-08', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8D', subjectId: 'SUB-MATH-8', dayOfWeek: 2, periodNumber: 4, startTime: '10:00', endTime: '11:00', room: 'B1-04', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },

  // Wednesday: 8A (P1, P2), 8B (P3, P4)
  { timetableId: 'TT-09', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8A', subjectId: 'SUB-MATH-8', dayOfWeek: 3, periodNumber: 1, startTime: '07:00', endTime: '08:00', room: 'B1-01', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-10', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8A', subjectId: 'SUB-MATH-8', dayOfWeek: 3, periodNumber: 2, startTime: '08:00', endTime: '09:00', room: 'B1-01', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-11', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8B', subjectId: 'SUB-MATH-8', dayOfWeek: 3, periodNumber: 3, startTime: '09:00', endTime: '10:00', room: 'B1-02', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-12', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8B', subjectId: 'SUB-MATH-8', dayOfWeek: 3, periodNumber: 4, startTime: '10:00', endTime: '11:00', room: 'B1-02', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },

  // Thursday: 8C (P1), 8D (P2)
  { timetableId: 'TT-13', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8C', subjectId: 'SUB-MATH-8', dayOfWeek: 4, periodNumber: 1, startTime: '07:00', endTime: '08:00', room: 'B1-03', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-14', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8D', subjectId: 'SUB-MATH-8', dayOfWeek: 4, periodNumber: 2, startTime: '08:00', endTime: '09:00', room: 'B1-04', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },

  // Friday: 8A (P1), 8B (P2)
  { timetableId: 'TT-15', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8A', subjectId: 'SUB-MATH-8', dayOfWeek: 5, periodNumber: 1, startTime: '07:00', endTime: '08:00', room: 'B1-01', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-16', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8B', subjectId: 'SUB-MATH-8', dayOfWeek: 5, periodNumber: 2, startTime: '08:00', endTime: '09:00', room: 'B1-02', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },

  // Saturday: 8C (P1, P2), 8D (P3, P4)
  { timetableId: 'TT-17', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8C', subjectId: 'SUB-MATH-8', dayOfWeek: 6, periodNumber: 1, startTime: '07:00', endTime: '08:00', room: 'B1-03', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-18', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8C', subjectId: 'SUB-MATH-8', dayOfWeek: 6, periodNumber: 2, startTime: '08:00', endTime: '09:00', room: 'B1-03', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-19', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8D', subjectId: 'SUB-MATH-8', dayOfWeek: 6, periodNumber: 3, startTime: '09:00', endTime: '10:00', room: 'B1-04', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
  { timetableId: 'TT-20', academicYearId: 'AY-2025-2026', teacherId: 'T-001', classId: 'CLS-8D', subjectId: 'SUB-MATH-8', dayOfWeek: 6, periodNumber: 4, startTime: '10:00', endTime: '11:00', room: 'B1-04', effectiveStartDate: '2025-11-01', effectiveEndDate: '2026-08-31', status: 'ACTIVE' },
];

// Complete Curriculum: Grade 8 Mathematics (38 Weeks / 18 Chapters / 110 Periods)
export const initialCurriculum: CurriculumItem[] = [
  // Semester 1: Chapters 1 to 9
  { curriculumId: 'CUR-01', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'វិច្ឆិកា', weekNumber: 1, chapterNumber: 1, chapterTitle: 'ចំនួនសនិទាន', lessonTitle: 'មេរៀនទី១៖ ចំនួនសនិទាន', topicTitle: '១. សញ្ញាណចំនួនសនិទាន', lessonOrder: 1, requiredPeriods: 2, learningObjectives: 'កំណត់និយមន័យចំនួនសនិទានតាមរយៈឧទាហរណ៍ជាក់ស្តែងបានត្រឹមត្រូវ', studentBookPage: '1-2', teacherBookPage: '1-2', status: 'PLANNED' },
  { curriculumId: 'CUR-02', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'វិច្ឆិកា', weekNumber: 2, chapterNumber: 1, chapterTitle: 'ចំនួនសនិទាន', lessonTitle: 'មេរៀនទី១៖ ចំនួនសនិទាន (ត)', topicTitle: '២.១. ការប្រៀបធៀបចំនួនសនិទាន និង ២.២. ការរៀបលំដាប់', lessonOrder: 2, requiredPeriods: 2, learningObjectives: 'ប្រៀបធៀប និងរៀបលំដាប់ចំនួនសនិទានលើបន្ទាត់ចំនួនបានត្រឹមត្រូវ', studentBookPage: '2-4', teacherBookPage: '3-4', status: 'PLANNED' },
  { curriculumId: 'CUR-03', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'វិច្ឆិកា', weekNumber: 3, chapterNumber: 1, chapterTitle: 'ចំនួនសនិទាន', lessonTitle: 'មេរៀនទី១៖ ចំនួនសនិទាន (ត)', topicTitle: '៣.១. ប្រមាណវិធីបូក និង ៣.២. ប្រមាណវិធីដកចំនួនសនិទាន', lessonOrder: 3, requiredPeriods: 2, learningObjectives: 'អនុវត្តប្រមាណវិធីបូកនិងដកលើចំនួនសនិទានបានត្រឹមត្រូវ', studentBookPage: '5-8', teacherBookPage: '5-8', status: 'PLANNED' },
  { curriculumId: 'CUR-04', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'វិច្ឆិកា', weekNumber: 4, chapterNumber: 1, chapterTitle: 'ចំនួនសនិទាន', lessonTitle: 'មេរៀនទី១៖ ចំនួនសនិទាន (ត)', topicTitle: '៤. ប្រមាណវិធីគុណនៃចំនួនសនិទាន', lessonOrder: 4, requiredPeriods: 2, learningObjectives: 'ធ្វើប្រមាណវិធីគុណលើចំនួនសនិទានតាមក្បួនគុណភាគយកនិងភាគបែង', studentBookPage: '8-9', teacherBookPage: '9-10', status: 'PLANNED' },
  { curriculumId: 'CUR-05', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'ធ្នូ', weekNumber: 5, chapterNumber: 1, chapterTitle: 'ចំនួនសនិទាន', lessonTitle: 'មេរៀនទី១៖ ចំនួនសនិទាន (បញ្ចប់)', topicTitle: '៥. ប្រមាណវិធីចែកនៃចំនួនសនិទាន និង ៦. ចំណោទ', lessonOrder: 5, requiredPeriods: 2, learningObjectives: 'ធ្វើប្រមាណវិធីចែកនិងដោះស្រាយចំណោទចំនួនសនិទានបានត្រឹមត្រូវ', studentBookPage: '10-11', teacherBookPage: '11-12', status: 'PLANNED' },

  { curriculumId: 'CUR-06', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'ធ្នូ', weekNumber: 6, chapterNumber: 2, chapterTitle: 'ស្វ័យគុណ', lessonTitle: 'មេរៀនទី២៖ ស្វ័យគុណ', topicTitle: '១. សញ្ញាណស្វ័យគុណ និង ២. វិធីគុណស្វ័យគុណ', lessonOrder: 6, requiredPeriods: 2, learningObjectives: 'កំណត់សញ្ញាណ និងនិយមន័យស្វ័យគុណ a^n និងវិធីគុណគោលដូចគ្នា', studentBookPage: '13-15', teacherBookPage: '13-15', status: 'PLANNED' },
  { curriculumId: 'CUR-07', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'ធ្នូ', weekNumber: 7, chapterNumber: 2, chapterTitle: 'ស្វ័យគុណ', lessonTitle: 'មេរៀនទី២៖ ស្វ័យគុណ (ត)', topicTitle: '៣. វិធីចែកស្វ័យគុណ និង ៤. លក្ខណៈស្វ័យគុណ', lessonOrder: 7, requiredPeriods: 2, learningObjectives: 'ចេះអនុវត្តវិធីចែកស្វ័យគុណ និងទាញលក្ខណៈស្វ័យគុណនៃស្វ័យគុណ', studentBookPage: '16-18', teacherBookPage: '16-18', status: 'PLANNED' },
  { curriculumId: 'CUR-08', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'ធ្នូ', weekNumber: 8, chapterNumber: 2, chapterTitle: 'ស្វ័យគុណ', lessonTitle: 'មេរៀនទី២៖ ស្វ័យគុណ (ត)', topicTitle: '៤.៤. ស្វ័យគុណនៃ១០ និង ៤.៥. ទម្រង់ស្តង់ដានៃស្វ័យគុណ', lessonOrder: 8, requiredPeriods: 2, learningObjectives: 'កំណត់ទម្រង់ស្តង់ដា A x 10^n ដែល 1 <= A < 10', studentBookPage: '19-22', teacherBookPage: '19-22', status: 'PLANNED' },
  { curriculumId: 'CUR-09', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'ធ្នូ', weekNumber: 9, chapterNumber: 2, chapterTitle: 'ស្វ័យគុណ', lessonTitle: 'មេរៀនទី២៖ ស្វ័យគុណ (បញ្ចប់)', topicTitle: '៤.៦. ឫសការេ និងឫសគូបនៃចំនួនគត់រ៉ឺឡាទីប', lessonOrder: 9, requiredPeriods: 2, learningObjectives: 'គណនាឫសការេ និងឫសគូប និងការប្រើប្រាស់ម៉ាស៊ីនគិតលេខ', studentBookPage: '22-24', teacherBookPage: '23-24', status: 'PLANNED' },

  { curriculumId: 'CUR-10', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'មករា', weekNumber: 10, chapterNumber: 3, chapterTitle: 'ទំហំសមាមាត្រ និង ភាគរយ', lessonTitle: 'មេរៀនទី៣៖ ទំហំសមាមាត្រ និង ភាគរយ', topicTitle: '១.១. ទំហំសមាមាត្រស្រប និង ១.២. លក្ខណៈ', lessonOrder: 10, requiredPeriods: 2, learningObjectives: 'កំណត់ទំហំសមាមាត្រស្រប និងរូបមន្ត y = ax តាមរយៈឧទាហរណ៍', studentBookPage: '27-29', teacherBookPage: '27-29', status: 'PLANNED' },
  { curriculumId: 'CUR-11', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'មករា', weekNumber: 11, chapterNumber: 3, chapterTitle: 'ទំហំសមាមាត្រ និង ភាគរយ', lessonTitle: 'មេរៀនទី៣៖ ទំហំសមាមាត្រ និង ភាគរយ (ត)', topicTitle: '១.៣. ទំហំសមាមាត្រច្រាស និងចំណោទ', lessonOrder: 11, requiredPeriods: 2, learningObjectives: 'ដោះស្រាយចំណោទទាក់ទងនឹងសមាមាត្រច្រាស y = a/x', studentBookPage: '30-31', teacherBookPage: '30-31', status: 'PLANNED' },
  { curriculumId: 'CUR-12', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'មករា', weekNumber: 12, chapterNumber: 3, chapterTitle: 'ទំហំសមាមាត្រ និង ភាគរយ', lessonTitle: 'មេរៀនទី៣៖ ទំហំសមាមាត្រ និង ភាគរយ (ត)', topicTitle: '២. ភាគរយ (ប្រាក់ចំណេញ ប្រាក់ខាត និងការបញ្ចុះតម្លៃ)', lessonOrder: 12, requiredPeriods: 2, learningObjectives: 'គណនាភាគរយប្រាក់ចំណេញ ប្រាក់ខាត និងការបញ្ចុះតម្លៃក្នុងជំនួញ', studentBookPage: '32-35', teacherBookPage: '32-35', status: 'PLANNED' },
  { curriculumId: 'CUR-13', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'មករា', weekNumber: 13, chapterNumber: 3, chapterTitle: 'ទំហំសមាមាត្រ និង ភាគរយ', lessonTitle: 'មេរៀនទី៣៖ ទំហំសមាមាត្រ និង ភាគរយ (បញ្ចប់)', topicTitle: '២.៥. ការប្រាក់សាមញ្ញ និង ២.៦. ការប្រាក់សមាស', lessonOrder: 13, requiredPeriods: 2, learningObjectives: 'ស្គាល់រូបមន្តការប្រាក់ I = PRT/100 និងការប្រាក់សមាសក្នុងជីវភាពរស់នៅ', studentBookPage: '35-40', teacherBookPage: '35-40', status: 'PLANNED' },

  { curriculumId: 'CUR-14', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'កុម្ភៈ', weekNumber: 14, chapterNumber: 4, chapterTitle: 'រង្វាស់រង្វាល់', lessonTitle: 'មេរៀនទី៤៖ រង្វាស់រង្វាល់', topicTitle: '១. ផ្ទៃក្រឡា និងមាឌ ២. ម៉ាសធៀបនឹងផ្ទៃក្រឡា', lessonOrder: 14, requiredPeriods: 2, learningObjectives: 'គណនាផ្ទៃក្រឡានិងមាឌ ម៉ាសធៀបផ្ទៃក្រឡា g/m^2', studentBookPage: '43-46', teacherBookPage: '43-46', status: 'PLANNED' },
  { curriculumId: 'CUR-15', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'កុម្ភៈ', weekNumber: 15, chapterNumber: 4, chapterTitle: 'រង្វាស់រង្វាល់', lessonTitle: 'មេរៀនទី៤៖ រង្វាស់រង្វាល់ (បញ្ចប់)', topicTitle: '៣. ម៉ាសធៀបនឹងមាឌ និង ៤. ល្បឿនមធ្យម', lessonOrder: 15, requiredPeriods: 2, learningObjectives: 'គណនាម៉ាសមាឌ និងល្បឿនមធ្យម v = d/t', studentBookPage: '46-49', teacherBookPage: '46-49', status: 'PLANNED' },

  { curriculumId: 'CUR-16', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'កុម្ភៈ', weekNumber: 16, chapterNumber: 5, chapterTitle: 'កន្សោមពីជគណិត', lessonTitle: 'មេរៀនទី៥៖ កន្សោមពីជគណិត', topicTitle: '១. ឯកធា (សញ្ញាណ ឯកធាដូចគ្នា ដឺក្រេ និងប្រមាណវិធី)', lessonOrder: 16, requiredPeriods: 2, learningObjectives: 'កំណត់អថេរ មេគុណ ដឺក្រេ និងធ្វើប្រមាណវិធីលើឯកធា', studentBookPage: '51-56', teacherBookPage: '51-56', status: 'PLANNED' },
  { curriculumId: 'CUR-17', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'កុម្ភៈ', weekNumber: 17, chapterNumber: 5, chapterTitle: 'កន្សោមពីជគណិត', lessonTitle: 'មេរៀនទី៥៖ កន្សោមពីជគណិត (ត)', topicTitle: '២. ពហុធា (សញ្ញាណ ដឺក្រេ វិធីបូក ដក គុណ ចែក)', lessonOrder: 17, requiredPeriods: 2, learningObjectives: 'ធ្វើប្រមាណវិធីទាំងបួនលើពហុធាបានត្រឹមត្រូវ', studentBookPage: '56-62', teacherBookPage: '56-62', status: 'PLANNED' },
  { curriculumId: 'CUR-18', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'មីនា', weekNumber: 18, chapterNumber: 5, chapterTitle: 'កន្សោមពីជគណិត', lessonTitle: 'មេរៀនទី៥៖ កន្សោមពីជគណិត (បញ្ចប់)', topicTitle: '៣. សមភាពសំខាន់ៗ (a+b)^2, (a-b)^2, a^2-b^2', lessonOrder: 18, requiredPeriods: 2, learningObjectives: 'ប្រើប្រាស់រូបមន្តសមភាពសំខាន់ៗក្នុងការគណនានិងពង្រាយ', studentBookPage: '63-72', teacherBookPage: '63-72', status: 'PLANNED' },

  { curriculumId: 'CUR-19', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'មីនា', weekNumber: 19, chapterNumber: 6, chapterTitle: 'ផលធៀបត្រីកោណមាត្រ', lessonTitle: 'មេរៀនទី៦៖ ផលធៀបត្រីកោណមាត្រ', topicTitle: '១. សញ្ញាណស៊ីនុស កូស៊ីនុស តង់សង់ ក្នុងត្រីកោណកែង', lessonOrder: 19, requiredPeriods: 2, learningObjectives: 'កំណត់ sin, cos, tan ក្នុងត្រីកោណកែង និងដោះស្រាយលំហាត់', studentBookPage: '75-86', teacherBookPage: '75-86', status: 'PLANNED' },

  { curriculumId: 'CUR-20', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'មីនា', weekNumber: 20, chapterNumber: 7, chapterTitle: 'សមីការដឺក្រេទី១ មានមួយអញាត', lessonTitle: 'មេរៀនទី៧៖ សមីការដឺក្រេទី១', topicTitle: '១. សញ្ញាណសមីការ និងការដោះស្រាយសមីការ ax+b=0', lessonOrder: 20, requiredPeriods: 2, learningObjectives: 'ដោះស្រាយសមីការដឺក្រេទី១មានមួយអញ្ញាតតាមវិធានផ្លាស់ប្តូរអងគ', studentBookPage: '89-94', teacherBookPage: '89-94', status: 'PLANNED' },
  { curriculumId: 'CUR-21', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'មីនា', weekNumber: 21, chapterNumber: 7, chapterTitle: 'សមីការដឺក្រេទី១ មានមួយអញាត', lessonTitle: 'មេរៀនទី៧៖ សមីការដឺក្រេទី១ (បញ្ចប់)', topicTitle: '២. ចំណោទសមីការដឺក្រេទី១ មានមួយអញ្ញាត', lessonOrder: 21, requiredPeriods: 2, learningObjectives: 'អនុវត្តជំហានទាំង៤ក្នុងការដោះស្រាយចំណោទគណិតវិទ្យា', studentBookPage: '97-100', teacherBookPage: '97-100', status: 'PLANNED' },

  { curriculumId: 'CUR-22', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'មេសា', weekNumber: 22, chapterNumber: 8, chapterTitle: 'វិសមីការដឺក្រេទី១ មានមួយអញាត', lessonTitle: 'មេរៀនទី៨៖ វិសមីការដឺក្រេទី១', topicTitle: '១. សញ្ញាណវិសមីការ និងដំណោះស្រាយលើអ័ក្សចំនួន', lessonOrder: 22, requiredPeriods: 2, learningObjectives: 'ដោះស្រាយវិសមីការ និងតាងសំនុំចម្លើយលើបន្ទាត់ចំនួន', studentBookPage: '103-112', teacherBookPage: '103-112', status: 'PLANNED' },
  { curriculumId: 'CUR-23', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'មេសា', weekNumber: 23, chapterNumber: 9, chapterTitle: 'ប្លង់កូអរដោណេ និងក្រាប', lessonTitle: 'មេរៀនទី៩៖ ប្លង់កូអរដោណេ និងក្រាប', topicTitle: "១. សញ្ញាណប្លង់កូអរដោណេ (x'x, y'y) និងការសង់ក្រាប y=ax+b", lessonOrder: 23, requiredPeriods: 2, learningObjectives: 'ចេះកំណត់ចំណុចក្នុងប្លង់កូអរដោណេ និងសង់ក្រាបបន្ទាត់', studentBookPage: '115-121', teacherBookPage: '115-121', status: 'PLANNED' },

  // Semester 2: Chapters 10 to 18
  { curriculumId: 'CUR-24', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'ឧសភា', weekNumber: 24, chapterNumber: 10, chapterTitle: 'ស្ថិតិ', lessonTitle: 'មេរៀនទី១០៖ ស្ថិតិ', topicTitle: '១. តារាងបែងចែកប្រេកង់ និងដ្យាក្រាម', lessonOrder: 24, requiredPeriods: 2, learningObjectives: 'សង់តារាងប្រេកង់ និងគូរដ្យាក្រាមសសរ ឬដ្យាក្រាមរង្វង់', studentBookPage: '123-129', teacherBookPage: '123-129', status: 'PLANNED' },
  { curriculumId: 'CUR-25', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'ឧសភា', weekNumber: 25, chapterNumber: 10, chapterTitle: 'ស្ថិតិ', lessonTitle: 'មេរៀនទី១០៖ ស្ថិតិ (បញ្ចប់)', topicTitle: '២. ការគណនាមធ្យមនព្វន្ធ មេដ្យាន និង ម៉ូត', lessonOrder: 25, requiredPeriods: 2, learningObjectives: 'គណនាមធ្យម មេដ្យាន និងម៉ូតនៃទិន្នន័យស្ថិតិបានត្រឹមត្រូវ', studentBookPage: '130-136', teacherBookPage: '130-136', status: 'PLANNED' },

  { curriculumId: 'CUR-26', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'ឧសភា', weekNumber: 26, chapterNumber: 11, chapterTitle: 'ប្រូបាប', lessonTitle: 'មេរៀនទី១១៖ ប្រូបាប', topicTitle: '១. សញ្ញាណប្រូបាប ព្រឹត្តិការណ៍ និងរូបមន្ត P(A) = ករណីស្រប/ករណីអាច', lessonOrder: 26, requiredPeriods: 2, learningObjectives: 'គណនាប្រូបាបនៃព្រឹត្តិការណ៍ក្នុងការបោះកាក់ និងគ្រាប់ឡុកឡាក់', studentBookPage: '141-145', teacherBookPage: '141-145', status: 'PLANNED' },

  { curriculumId: 'CUR-27', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'មិថុនា', weekNumber: 27, chapterNumber: 12, chapterTitle: 'ការប្រៀបធៀបត្រីកោណ', lessonTitle: 'មេរៀនទី១២៖ ការប្រៀបធៀបត្រីកោណ', topicTitle: '១. លក្ខខណ្ឌត្រីកោណប៉ុនគ្នា (ម.ជ.ម និង ជ.ម.ជ)', lessonOrder: 27, requiredPeriods: 2, learningObjectives: 'ស្រាយបំភ្លឺត្រីកោណពីរប៉ុនគ្នាតាមលក្ខខណ្ឌ ម.ជ.ម និង ជ.ម.ជ', studentBookPage: '147-150', teacherBookPage: '147-150', status: 'PLANNED' },
  { curriculumId: 'CUR-28', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'មិថុនា', weekNumber: 28, chapterNumber: 12, chapterTitle: 'ការប្រៀបធៀបត្រីកោណ', lessonTitle: 'មេរៀនទី១២៖ ការប្រៀបធៀបត្រីកោណ (បញ្ចប់)', topicTitle: '២. លក្ខខណ្ឌ ជ.ជ.ជ និង ត្រីកោណកែងប៉ុនគ្នា', lessonOrder: 28, requiredPeriods: 2, learningObjectives: 'ស្រាយបញ្ជាក់ត្រីកោណប៉ុនគ្នាតាម ជ.ជ.ជ និងករណីត្រីកោណកែង', studentBookPage: '151-156', teacherBookPage: '151-156', status: 'PLANNED' },

  { curriculumId: 'CUR-29', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'មិថុនា', weekNumber: 29, chapterNumber: 13, chapterTitle: 'ចតុកោណ', lessonTitle: 'មេរៀនទី១៣៖ ចតុកោណ', topicTitle: '១. លក្ខណៈប្រលេឡូក្រាម និង ចតុកោណកែង', lessonOrder: 29, requiredPeriods: 2, learningObjectives: 'ស្គាល់លក្ខណៈសម្គាល់ និងស្រាយបញ្ជាក់ប្រលេឡូក្រាម និងចតុកោណកែង', studentBookPage: '169-176', teacherBookPage: '169-176', status: 'PLANNED' },
  { curriculumId: 'CUR-30', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'កក្កដា', weekNumber: 30, chapterNumber: 13, chapterTitle: 'ចតុកោណ', lessonTitle: 'មេរៀនទី១៣៖ ចតុកោណ (បញ្ចប់)', topicTitle: '២. ចតុកោណស្មើ និង ចតុកោណព្នាយ', lessonOrder: 30, requiredPeriods: 2, learningObjectives: 'ស្រាយបញ្ជាក់លក្ខណៈចតុកោណស្មើ និងចតុកោណព្នាយសមបាត', studentBookPage: '177-184', teacherBookPage: '177-184', status: 'PLANNED' },

  { curriculumId: 'CUR-31', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'កក្កដា', weekNumber: 31, chapterNumber: 14, chapterTitle: 'ផ្ទៃក្រឡាពហុកោណ', lessonTitle: 'មេរៀនទី១៤៖ ផ្ទៃក្រឡាពហុកោណ', topicTitle: '១. ផ្ទៃក្រឡាប្រលេឡូក្រាម ចតុកោណស្មើ និងចតុកោណព្នាយ', lessonOrder: 31, requiredPeriods: 2, learningObjectives: "គណនាផ្ទៃក្រឡាពហុកោណតាមរូបមន្ត S=bh, S=1/2(d1*d2), S=1/2(b+b')h", studentBookPage: '187-193', teacherBookPage: '187-193', status: 'PLANNED' },
  { curriculumId: 'CUR-32', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'កក្កដា', weekNumber: 32, chapterNumber: 14, chapterTitle: 'ផ្ទៃក្រឡាពហុកោណ', lessonTitle: 'មេរៀនទី១៤៖ ផ្ទៃក្រឡាពហុកោណ (បញ្ចប់)', topicTitle: '២. ផ្ទៃក្រឡាពហុកោណស្មើ និងចំណោទជាក់ស្តែង', lessonOrder: 32, requiredPeriods: 2, learningObjectives: 'ដោះស្រាយចំណោទគណនាផ្ទៃក្រឡាដី និងសំណង់ជាក់ស្តែង', studentBookPage: '193-195', teacherBookPage: '193-195', status: 'PLANNED' },

  { curriculumId: 'CUR-33', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'កក្កដា', weekNumber: 33, chapterNumber: 15, chapterTitle: 'រង្វង់', lessonTitle: 'មេរៀនទី១៥៖ រង្វង់', topicTitle: '១. និយមន័យ មុំផ្ចិត ធ្នូ អង្កត់ធ្នូ និងលក្ខណៈឆ្លុះ', lessonOrder: 33, requiredPeriods: 2, learningObjectives: 'គណនាប្រវែងធ្នូ បរិមាត្ររង្វង់ C = 2*pi*r និងទំនាក់ទំនងមុំផ្ចិត', studentBookPage: '197-201', teacherBookPage: '197-201', status: 'PLANNED' },
  { curriculumId: 'CUR-34', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'សីហា', weekNumber: 34, chapterNumber: 15, chapterTitle: 'រង្វង់', lessonTitle: 'មេរៀនទី១៥៖ រង្វង់ (បញ្ចប់)', topicTitle: '២. បន្ទាត់ប៉ះរង្វង់ និងអង្កត់ធ្នូកែងនឹងអង្កត់ផ្ចិត', lessonOrder: 34, requiredPeriods: 2, learningObjectives: 'ស្គាល់លក្ខណៈបន្ទាត់ប៉ះកែងនឹងកាំ និងទ្រឹស្តីបទអង្កត់ធ្នូ', studentBookPage: '202-204', teacherBookPage: '202-204', status: 'PLANNED' },

  { curriculumId: 'CUR-35', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'សីហា', weekNumber: 35, chapterNumber: 16, chapterTitle: 'បន្ទាត់ និងអង្កត់ពិសេសក្នុងត្រីកោណ', lessonTitle: 'មេរៀនទី១៦៖ បន្ទាត់ និងអង្កត់ពិសេស', topicTitle: '១. មេដ្យាន មេដ្យាទ័រ កម្ពស់ និងកន្លះបន្ទាត់ពុះមុំ', lessonOrder: 35, requiredPeriods: 2, learningObjectives: 'ស្គាល់ទីប្រជុំទម្ងន់ អរតូសង់ និងផ្ចិតរង្វង់ចារឹកក្នុង/ក្រៅត្រីកោណ', studentBookPage: '205-212', teacherBookPage: '205-212', status: 'PLANNED' },

  { curriculumId: 'CUR-36', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'សីហា', weekNumber: 36, chapterNumber: 17, chapterTitle: 'រូបធរណីមាត្រដែលមានវិមាត្របី', lessonTitle: 'មេរៀនទី១៧៖ រូបធរណីមាត្រវិមាត្របី', topicTitle: '១. ផ្ទៃក្រឡា និងមាឌព្រីស ពីរ៉ាមីត កោន ស៊ីឡាំង ស៊្វែ', lessonOrder: 36, requiredPeriods: 2, learningObjectives: 'គណនាផ្ទៃខាង ផ្ទៃសរុប និងមាឌនៃរូបធរណីមាត្រវិមាត្របី', studentBookPage: '215-226', teacherBookPage: '215-226', status: 'PLANNED' },

  { curriculumId: 'CUR-37', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'សីហា', weekNumber: 37, chapterNumber: 18, chapterTitle: 'មាត្រដ្ឋាន', lessonTitle: 'មេរៀនទី១៨៖ មាត្រដ្ឋាន', topicTitle: '១. មាត្រដ្ឋានផែនទី និងរូបភាពពង្រីក-បង្រួម', lessonOrder: 37, requiredPeriods: 2, learningObjectives: 'គណនាចម្ងាយពិតប្រាកដលើដីធៀបនឹងចម្ងាយលើប្លង់ផែនទី', studentBookPage: '229-235', teacherBookPage: '229-235', status: 'PLANNED' },

  { curriculumId: 'CUR-38', academicYearId: 'AY-2025-2026', grade: 8, subjectId: 'SUB-MATH-8', monthNameKm: 'សីហា', weekNumber: 38, chapterNumber: 18, chapterTitle: 'រំលឹក និងការប្រឡងឆមាសលើកទី ២', lessonTitle: 'រំលឹកមេរៀន និងប្រឡងឆមាសទី២', topicTitle: 'ការប្រឡងបញ្ចប់ឆ្នាំសិក្សា ២០២៥-២០២៦', lessonOrder: 38, requiredPeriods: 2, learningObjectives: 'វាស់ស្ទង់សមត្ថភាពសិស្សប្រចាំឆមាសទី២ និងពេញមួយឆ្នាំសិក្សា', studentBookPage: '1-235', teacherBookPage: '1-235', status: 'PLANNED' },
];

export const sampleLessonPlanGrade8Math: LessonPlan = {
  lessonPlanId: 'LP-SAMPLE-001',
  scheduledLessonId: 'SCH-CLS-8A-2025-11-03-P1',
  academicYearId: 'AY-2025-2026',
  teacherId: 'T-001',
  classId: 'CLS-8A',
  subjectId: 'SUB-MATH-8',
  date: '2025-11-03',
  periodNumber: 1,
  chapterTitle: 'ចំនួនសនិទាន',
  lessonTitle: 'មេរៀនទី ១៖ ចំនួនសនិទាន',
  topic: '១. សញ្ញាណចំនួនសនិទាន (ទំព័រ ១-២)',
  durationMinutes: 50,
  learningObjectivesKnowledge: 'កំណត់និយមន័យចំនួនសនិទានតាមរយៈឧទាហរណ៍ជាក់ស្តែងបានត្រឹមត្រូវ។',
  learningObjectivesSkills: 'ចេះបំប្លែងប្រភាគទៅជាចំនួនទសភាគ និងកំណត់ទម្រង់ a/b ដែល b ≠ 0 បានរហ័ស។',
  learningObjectivesAttitude: 'មានស្មារតីប្រុងប្រយ័ត្នក្នុងការដោះស្រាយលំហាត់ និងមានទំនួលខុសត្រូវខ្ពស់ក្នុងការសិក្សា។',
  teachingMaterials: 'សៀវភៅសិក្សាគោលគណិតវិទ្យាថ្នាក់ទី ៨ (ទំព័រ ១-២), បន្ទាត់, ក្តារខៀន, ដីសពណ៌។',
  teachingMethods: 'វិធីសាស្ត្របង្រៀនតាមបែបសិស្សមជ្ឈមណ្ឌល (ការពិភាក្សាជាដៃគូ និងការលើកឧទាហរណ៍ជាក់ស្តែង)។',
  steps: [
    {
      stepNumber: 1,
      stepNameKm: 'ជំហានទី ១',
      stepSubNameKm: 'រដ្ឋបាលថ្នាក់ (Class Administration)',
      teacherActivities: 'ពិនិត្យអវត្តមានសិស្ស អនាម័យ សណ្តាប់ធ្នាប់ ឯកសណ្ឋាន និងវិន័យទូទៅក្នុងថ្នាក់។',
      studentActivities: 'ប្រធានថ្នាក់ ឬអនុប្រធានថ្នាក់ក្រោកឈររាយការណ៍អំពីចំនួនសិស្សវត្តមាន និងអវត្តមាន។',
      content: 'ពិនិត្យវត្តមាន និងរៀបចំឥរិយាបថសិស្សមុនពេលចាប់ផ្តើមរៀន។',
      durationMinutes: 3
    },
    {
      stepNumber: 2,
      stepNameKm: 'ជំហានទី ២',
      stepSubNameKm: 'រំលឹកមេរៀនចាស់ (Review Previous Lesson)',
      teacherActivities: 'សួរសំណួរ៖ តើចំនួនគត់រ៉ឺឡាទីបជាអ្វី? ចូរលើកឧទាហរណ៍ចំនួនគត់ធម្មជាតិ និងចំនួនអវិជ្ជមាន។',
      studentActivities: 'សិស្សឆ្លើយ៖ ចំនួនគត់ធម្មជាតិ N = {1, 2, 3...}, ចំនួនគត់រ៉ឺឡាទីប Z = {...-2, -1, 0, 1, 2...}។',
      content: 'រំលឹកពីចំនួនគត់ និងប្រភាគដែលបានរៀននៅថ្នាក់ទី ៧។',
      durationMinutes: 5
    },
    {
      stepNumber: 3,
      stepNameKm: 'ជំហានទី ៣',
      stepSubNameKm: 'មេរៀនថ្មី (New Lesson)',
      teacherActivities: 'សរសេរចំណងជើងមេរៀនលើក្តារខៀន៖ មេរៀនទី១ ចំនួនសនិទាន។ លើកឧទាហរណ៍ 6/3=2, ប៉ុន្តែ 3/6=0.5។ ពន្យល់និយមន័យ៖ ចំនួនសនិទានជាចំនួនដែលអាចសរសេរជាទម្រង់ a/b ដែល a និង b ជាចំនួនគត់រ៉ឺឡាទីប ហើយ b ≠ 0។',
      studentActivities: 'សិស្សសង្កេត ស្វែងយល់ ចូលរួមឆ្លើយសំណួរ កត់ត្រាឧទាហរណ៍ និងទាញនិយមន័យដាក់ក្នុងសៀវភៅ។',
      content: 'និយមន័យ៖ ចំនួនសនិទាន a/b (b ≠ 0)។ ចំណាំ៖ ចំនួនគត់ ចំនួនទសភាគ សុទ្ធតែអាចសរសេរជាចំនួនសនិទាន។',
      durationMinutes: 25
    },
    {
      stepNumber: 4,
      stepNameKm: 'ជំហានទី ៤',
      stepSubNameKm: 'ពង្រឹងពុទ្ធិ (Reinforcement)',
      teacherActivities: 'ដាក់លំហាត់អនុវត្តន៍៖ តើចំនួនខាងក្រោមជាចំនួនសនិទានដែរឬទេ? ក. 5, ខ. -3/4, គ. 0.25, ឃ. 0? ហៅសិស្ស ២ នាក់ឡើងដោះស្រាយ។',
      studentActivities: 'សិស្សពិភាក្សាជាដៃគូ ដោះស្រាយលំហាត់ និងកែតម្រូវចម្លើយលើក្តារខៀន។',
      content: 'ពង្រឹងការយល់ដឹងលើការសម្គាល់ចំនួនសនិទានគ្រប់ប្រភេទ។',
      durationMinutes: 12
    },
    {
      stepNumber: 5,
      stepNameKm: 'ជំហានទី ៥',
      stepSubNameKm: 'បណ្តាំផ្ញើ និងកិច្ចការផ្ទះ (Homework & Closing)',
      teacherActivities: 'ដាក់កិច្ចការផ្ទះលំហាត់លេខ ១ និងលេខ ២ ទំព័រទី ១១ នៃសៀវភៅពុម្ព។ ណែនាំសិស្សឱ្យមើលមេរៀនបន្ត។',
      studentActivities: 'សិស្សកត់ត្រាកិច្ចការផ្ទះចូលក្នុងសៀវភៅ និងត្រៀមរៀបចំខ្លួនសម្រាប់ម៉ោងបន្ទាប់។',
      content: 'កិច្ចការផ្ទះលំហាត់ទំព័រ ១១ លេខ ១, ២។',
      durationMinutes: 5
    }
  ],
  assessmentHomework: 'លំហាត់លេខ ១ និងលេខ ២ ទំព័រ ១១ ក្នុងសៀវភៅពុម្ពសិស្ស។',
  status: 'PREPARED',
  updatedAt: new Date().toISOString()
};
