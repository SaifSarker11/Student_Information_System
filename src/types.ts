export interface FlowStage {
  id: string;
  stageNumber: string;
  title: string;
  subtitle: string;
  tabKey: 'hub' | 'courses' | 'schedule' | 'grades' | 'profile';
  startTime: number; // in seconds
  duration: number; // in seconds
  narration: string;
  actionCallout: string;
  stepName: string;
  stepDescription: string;
  cameraFocus: {
    x: number; // percentage pan -50 to 50
    y: number;
    zoom: number; // 1 to 2.5
  };
}

export interface Course {
  code: string;
  title: string;
  units: number;
  instructor: string;
  time: string;
  location: string;
  attendance: string;
  status: 'Enrolled' | 'Planned' | 'Completed';
  grade?: string;
  estGrade?: string;
  midterm?: string;
  labs?: string;
  finalDate?: string;
  description?: string;
}

export interface TimetableItem {
  time: string;
  code: string;
  title: string;
  location: string;
  instructor?: string;
  seat?: string;
  status: 'Completed' | 'Live' | 'Upcoming' | 'Break';
  action?: string;
  unit?: string;
}

export interface StudentProfile {
  name: string;
  suid: string;
  sunetId: string;
  degree: string;
  school: string;
  classYear: string;
  advisor: string;
  advisorBuilding: string;
  cumGpa: string;
  gpaGrowth: string;
  completedUnits: number;
  totalUnits: number;
  currentQuarterUnits: number;
  cardinalKeyActive: boolean;
  avatarUrl?: string;
  campusPhotoUrl?: string;
}

export type AspectRatio = '16:9' | '9:16' | '4:3';
export type ViewMode = 'video' | 'flow' | 'interactive';
