export type UserRole = 'ADMIN' | 'SCHOOL_DIRECTOR' | 'TEACHER' | 'ATTENDANCE_STAFF';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  teacherId?: string;
  avatarUrl?: string;
  phone?: string;
}

export interface TeachingPeriodConfig {
  periodNumber: number;
  periodNameKm: string; // e.g. "ម៉ោងទី ១"
  startTime: string;    // "07:00"
  endTime: string;      // "08:00"
  session: 'MORNING' | 'AFTERNOON';
  isBreak?: boolean;
}

export interface SchoolSettings {
  schoolId: string;
  schoolNameKm: string;
  schoolNameEn: string;
  sloganKm: string;
  provinceKm: string;
  districtKm: string;
  academicYearActiveId: string;
  phone: string;
  email: string;
  directorNameKm: string;
  periods: TeachingPeriodConfig[];
  workingDays: number[]; // 1 = Monday, 6 = Saturday
  firebaseConfig?: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

export interface AcademicYear {
  academicYearId: string;
  yearName: string; // "២០២៥-២០២៦"
  startDate: string; // "2025-11-01"
  endDate: string;   // "2026-08-31"
  status: 'ACTIVE' | 'ARCHIVED' | 'UPCOMING';
  description?: string;
}

export interface Teacher {
  teacherId: string;
  teacherCode: string; // "T-001"
  fullName: string;    // "កែវ សំណាង"
  gender: 'M' | 'F';
  phone: string;
  email: string;
  address?: string;
  subjects: string[]; // subject IDs
  assignedClasses: string[]; // class IDs
  employmentStatus: 'ACTIVE' | 'ON_LEAVE' | 'INACTIVE';
  userId?: string;
  weeklyWorkloadHours?: number;
}

export interface Student {
  studentId: string;
  studentCode: string; // "STU-8001"
  fullName: string;
  gender: 'M' | 'F';
  dateOfBirth: string;
  classId: string;
  guardianName: string;
  guardianPhone: string;
  address?: string;
  status: 'ACTIVE' | 'TRANSFERRED' | 'DROPPED';
}

export interface ClassRoom {
  classId: string;
  grade: number; // 7, 8, 9, 10, 11, 12
  className: string; // "8A", "8B", "8C", "8D"
  academicYearId: string;
  homeroomTeacherId: string;
  roomNumber?: string;
  capacity: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface ClassEnrollment {
  enrollmentId: string;
  studentId: string;
  classId: string;
  academicYearId: string;
  startDate: string;
  endDate?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'TRANSFERRED';
}

export interface Subject {
  subjectId: string;
  subjectCode: string; // "MATH-8"
  subjectName: string; // "គណិតវិទ្យា"
  description?: string;
  color: string; // Hex color for timetable badges
  status: 'ACTIVE' | 'INACTIVE';
}

export interface CurriculumItem {
  curriculumId: string;
  academicYearId: string;
  grade: number;
  subjectId: string;
  monthNameKm: string; // e.g. "វិច្ឆិកា"
  weekNumber: number;  // 1 to 38
  chapterNumber: number;
  chapterTitle: string;
  lessonTitle: string;
  topicTitle: string;
  lessonOrder: number; // Global sequence order 1 to 110
  requiredPeriods: number; // typically 1 or 2
  learningObjectives: string;
  studentBookPage?: string;
  teacherBookPage?: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface TimetableSlot {
  timetableId: string;
  academicYearId: string;
  teacherId: string;
  classId: string;
  subjectId: string;
  dayOfWeek: number; // 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  periodNumber: number; // 1 to 8
  startTime: string; // "07:00"
  endTime: string;   // "08:00"
  room?: string;
  effectiveStartDate: string;
  effectiveEndDate: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export type CalendarEventType =
  | 'ACADEMIC_OPENING'
  | 'ACADEMIC_CLOSING'
  | 'NATIONAL_HOLIDAY'
  | 'TRADITIONAL_FESTIVAL'
  | 'SCHOOL_HOLIDAY'
  | 'EXAMINATION'
  | 'TEACHER_MEETING'
  | 'SPECIAL_EVENT'
  | 'EMERGENCY_CLOSURE'
  | 'HALF_DAY_CLOSURE';

export interface SchoolCalendarEvent {
  eventId: string;
  academicYearId: string;
  eventTitle: string;
  eventType: CalendarEventType;
  startDate: string; // "YYYY-MM-DD"
  endDate: string;   // "YYYY-MM-DD"
  isFullDay: boolean;
  isTeachingDay: boolean;
  blockedSession?: 'ALL' | 'MORNING' | 'AFTERNOON';
  description?: string;
  createdBy?: string;
}

export type TeachingStatus = 'PLANNED' | 'PREPARED' | 'COMPLETED' | 'MISSED' | 'RESCHEDULED' | 'EXAM' | 'HOLIDAY';

export interface ScheduledLesson {
  scheduledLessonId: string;
  academicYearId: string;
  date: string; // "YYYY-MM-DD"
  dayOfWeek: number;
  periodNumber: number;
  startTime: string;
  endTime: string;
  teacherId: string;
  classId: string;
  subjectId: string;
  curriculumId?: string;
  chapterNumber?: number;
  chapterTitle?: string;
  lessonTitle?: string;
  topic?: string;
  lessonOrder?: number;
  teachingStatus: TeachingStatus;
  actualTaughtDate?: string;
  notes?: string;
  isMakeUp?: boolean;
  originalLessonId?: string;
}

export type LessonPlanStatus = 'NOT_PREPARED' | 'DRAFT' | 'PREPARED' | 'TAUGHT' | 'CANCELLED';

export interface LessonPlanProcedureStep {
  stepNumber: number;
  stepNameKm: string;      // ជំហានទី១, ជំហានទី២...
  stepSubNameKm: string;   // រដ្ឋបាលថ្នាក់, រំលឹកមេរៀនចាស់, មេរៀនថ្មី, ពង្រឹងពុទ្ធិ, បណ្តាំផ្ញើ
  teacherActivities: string;
  studentActivities: string;
  content: string;
  durationMinutes: number;
}

export interface LessonPlan {
  lessonPlanId: string;
  scheduledLessonId: string;
  academicYearId: string;
  teacherId: string;
  classId: string;
  subjectId: string;
  date: string;
  periodNumber: number;
  chapterTitle: string;
  lessonTitle: string;
  topic: string;
  durationMinutes: number;
  learningObjectivesKnowledge: string; // ចំណេះដឹង
  learningObjectivesSkills: string;    // បំណិន
  learningObjectivesAttitude: string;  // ឥរិយាបថ
  teachingMaterials: string;           // សម្ភារឧបទេស
  teachingMethods: string;             // វិធីសាស្ត្របង្រៀន
  steps: LessonPlanProcedureStep[];    // ជំហានទាំង ៥
  assessmentHomework: string;          // កិច្ចការផ្ទះ / ការវាយតម្លៃ
  notes?: string;
  status: LessonPlanStatus;
  updatedAt: string;
}

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'EXCUSED' | 'LATE' | 'LEFT_EARLY';

export interface AttendanceRecord {
  attendanceId: string;
  scheduledLessonId: string;
  studentId: string;
  classId: string;
  academicYearId: string;
  date: string;
  periodNumber: number;
  status: AttendanceStatus;
  reason?: string;
  recordedBy: string;
  updatedAt: string;
}

export interface MakeUpLesson {
  makeUpId: string;
  academicYearId: string;
  originalScheduledLessonId: string;
  missedDate: string;
  missedPeriod: number;
  missedTeacherId: string;
  substituteTeacherId?: string;
  classId: string;
  subjectId: string;
  curriculumTopic: string;
  rescheduledDate: string;
  rescheduledPeriod: number;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  reason: string;
  notes?: string;
  createdAt: string;
}

export interface AuditLog {
  logId: string;
  userId: string;
  userEmail: string;
  action: string;
  collection: string;
  recordId: string;
  details: string;
  timestamp: string;
}
