// Course Types
export type CoursesType = 'kids' | 'adults' | 'taiji' | 'defense';

// Color Configuration
export interface ColorConfig {
  bg: string;
  text: string;
  border: string;
}

// Class/Course Data
export interface ClassInfo {
  name: string;
  time: string;
  type: CoursesType;
}

export interface ClassInfoWithStartTime extends ClassInfo {
  startTime: string;
}

// Schedule Data
export interface DayScheduleData {
  day: string;
  classes: ClassInfo[];
}

export interface CourseMapping {
  name: string;
  type: CoursesType;
}

// Component Props
export interface ClassCardProps {
  name: string;
  time: string;
  type: CoursesType;
}

export interface DayScheduleProps {
  day: string;
  classes: ClassInfo[];
}
