import { FlowStage, Course, TimetableItem, StudentProfile } from '../types';
import studentPhoto from '../assets/images/student_michael_hudson_1789233979193.jpg';
import campusPhoto from '../assets/images/stanford_hoover_tower_1789233487844.jpg';

export const studentData: StudentProfile = {
  name: 'Michael Hudson',
  suid: '06542198',
  sunetId: 'mhudson',
  degree: 'B.S. Computer Science',
  school: 'School of Engineering',
  classYear: "Sophomore (Class of 2027)",
  advisor: 'Prof. John Ousterhout',
  advisorBuilding: 'Gates CS Building, Rm 312',
  cumGpa: '3.92',
  gpaGrowth: '+1.8%',
  completedUnits: 58,
  totalUnits: 180,
  currentQuarterUnits: 15.0,
  cardinalKeyActive: true,
  avatarUrl: studentPhoto,
  campusPhotoUrl: campusPhoto, // Stanford Hoover Tower aerial campus view
};

export const flowStages: FlowStage[] = [
  {
    id: 'intro',
    stageNumber: 'PROLOGUE',
    title: 'Stanford Axess Mobile UX',
    subtitle: 'Core Academic Navigation Flow',
    tabKey: 'hub',
    startTime: 0,
    duration: 6,
    narration: 'Welcome to Stanford Axess Mobile. Follow sophomore computer science student Michael Hudson through his daily academic navigation journey.',
    actionCallout: 'Tap "Navigate Enrollment" to start',
    stepName: 'System Verification',
    stepDescription: 'Authenticating with hardware-backed Cardinal Key credential token on device.',
    cameraFocus: { x: 0, y: 0, zoom: 1.0 }
  },
  {
    id: 'hub',
    stageNumber: 'STAGE 01',
    title: 'Homepage & Hub',
    subtitle: 'Overview, Status & Quick Launch',
    tabKey: 'hub',
    startTime: 6,
    duration: 8,
    narration: 'Stage 1: Primary Hub. Michael checks active Cardinal Key authentication, in-session lecture status, and 15 enrolled units.',
    actionCallout: 'Action: Tap "Navigate Enrollment"',
    stepName: 'Step 1: Session Entry',
    stepDescription: 'Student views authenticated Stanford Cardinal Key status, current in-session lecture alerts, and initiates enrolment review.',
    cameraFocus: { x: 0, y: -15, zoom: 1.35 }
  },
  {
    id: 'courses',
    stageNumber: 'STAGE 02',
    title: 'Courses & Study List',
    subtitle: 'Current Enrolment & Prerequisites',
    tabKey: 'courses',
    startTime: 14,
    duration: 8,
    narration: 'Stage 2: Study List & Enrollment. A 15-unit workload is confirmed across CS 107, CS 109, and CS 111 with prerequisites cleared.',
    actionCallout: 'Action: Tap CS 107 to inspect live slot',
    stepName: 'Step 2: Study List Review',
    stepDescription: 'Core CS track loaded with confirmed attendance milestones, prerequisite checks, and direct course syllabus links.',
    cameraFocus: { x: 0, y: -5, zoom: 1.4 }
  },
  {
    id: 'schedule',
    stageNumber: 'STAGE 03',
    title: 'Weekly Timetable',
    subtitle: 'Day Schedule & Live Wayfinding',
    tabKey: 'schedule',
    startTime: 22,
    duration: 9,
    narration: 'Stage 3: Weekly Timetable. Real-time class session indicators track CS 107 in Packard EE 101 with integrated campus GPS wayfinding.',
    actionCallout: 'Action: Tap "Grades" in navigation',
    stepName: 'Step 3: Day Execution',
    stepDescription: 'Provides real-time seat locator, lecture slide synchronizer, and immediate access to academic milestones.',
    cameraFocus: { x: 0, y: 10, zoom: 1.35 }
  },
  {
    id: 'grades',
    stageNumber: 'STAGE 04',
    title: 'Academic Standing',
    subtitle: 'Grades & GPA Growth Records',
    tabKey: 'grades',
    startTime: 31,
    duration: 8,
    narration: 'Stage 4: Academic Standing. Highlighting a 3.92 cumulative GPA, top 2 percent cohort rank, and tamper-proof eTranscript download.',
    actionCallout: 'Action: Tap "Profile" for Digital Pass',
    stepName: 'Step 4: Audit & Performance',
    stepDescription: 'Validated 3.92 GPA trajectory with tamper-proof cryptographic transcript export and rank metrics.',
    cameraFocus: { x: 0, y: -10, zoom: 1.4 }
  },
  {
    id: 'profile',
    stageNumber: 'STAGE 05',
    title: 'Profile & Degree Audit',
    subtitle: 'ID Pass, Completion & Billing',
    tabKey: 'profile',
    startTime: 39,
    duration: 9,
    narration: 'Stage 5: Fulfillment. Apple Wallet NFC Stanford Card ID, 58 degree units audited, and a verified zero-dollar tuition balance.',
    actionCallout: 'State: Fully Synchronized',
    stepName: 'Step 5: Fulfilment',
    stepDescription: 'Final user terminal state featuring Stanford Card ID barcode pass, degree milestone audit, and zero-balance billing.',
    cameraFocus: { x: 0, y: 15, zoom: 1.35 }
  },
  {
    id: 'outro',
    stageNumber: 'EPILOGUE',
    title: 'Architectural Synthesis',
    subtitle: 'End-to-End System Matrix',
    tabKey: 'hub',
    startTime: 48,
    duration: 6,
    narration: 'The entire end-to-end task journey illustrates seamless synchronization across Stanford registrar ledgers and student devices.',
    actionCallout: 'Journey Complete',
    stepName: 'Flow Completed',
    stepDescription: 'FERPA Protected Academic Record compliant with Stanford University Administrative Guide 6.2.',
    cameraFocus: { x: 0, y: 0, zoom: 1.0 }
  }
];

export const TOTAL_VIDEO_DURATION = 54; // seconds

export const enrolledCourses: Course[] = [
  {
    code: 'CS 107',
    title: 'Computer Organization & Systems',
    units: 5.0,
    instructor: 'Prof. Jerry Cain',
    time: 'Mon, Wed, Fri 10:00 AM',
    location: 'Packard EE 101',
    attendance: '98% Attendance',
    status: 'Enrolled',
    estGrade: 'A (97.2%)',
    midterm: '94/100',
    labs: '98%',
    finalDate: 'Dec 11'
  },
  {
    code: 'CS 109',
    title: 'Intro to Probability for Computer Scientists',
    units: 5.0,
    instructor: 'Prof. Chris Piech',
    time: 'Mon, Wed 1:00 PM',
    location: 'Gates CS B02',
    attendance: '96% Attendance',
    status: 'Enrolled',
    estGrade: 'A (96.5%)',
    midterm: '92/100',
    labs: '99%',
    finalDate: 'Dec 12'
  },
  {
    code: 'CS 111',
    title: 'Operating Systems Principles',
    units: 5.0,
    instructor: 'Prof. John Ousterhout',
    time: 'Tue, Thu 3:30 PM',
    location: 'Hewlett 200',
    attendance: '94% Attendance',
    status: 'Enrolled',
    estGrade: 'A (95.0%)',
    midterm: '91/100',
    labs: '97%',
    finalDate: 'Dec 13'
  },
  {
    code: 'CS 161',
    title: 'Design and Analysis of Algorithms',
    units: 5.0,
    instructor: 'Staff',
    time: 'Spring 2025 Planned',
    location: 'Campus Aud',
    attendance: 'Pending',
    status: 'Planned',
    description: 'Prerequisites satisfied: CS 103 and CS 106B completed with Grade A.'
  }
];

export const prereqCourses = [
  { code: 'CS 106A', title: 'Programming Methodology (Python)', term: 'Autumn 2023', grade: 'A+', gpa: '4.3 GP' },
  { code: 'CS 106B', title: 'Programming Abstractions (C++ & Data Structures)', term: 'Winter 2024', grade: 'A', gpa: '4.0 GP' },
  { code: 'CS 103', title: 'Mathematical Foundations of Computing', term: 'Spring 2024', grade: 'A', gpa: '4.0 GP' },
  { code: 'MATH 21', title: 'Calculus III (Infinite Series & Vectors)', term: 'Autumn 2023', grade: 'A', gpa: '4.0 GP' },
  { code: 'MATH 51', title: 'Linear Algebra & Differential Calculus', term: 'Spring 2024', grade: 'A', gpa: '4.0 GP' },
  { code: 'PHYS 41', title: 'Mechanics (Kinematics & Rotational)', term: 'Winter 2024', grade: 'A', gpa: '4.0 GP' },
];

export const wednesdaySchedule: TimetableItem[] = [
  {
    time: '09:00 – 10:00 AM',
    code: 'ENGR 40M Lab',
    title: 'Making Stuff: Intro to EE',
    location: 'Packard Lab 108',
    instructor: 'Teaching Staff',
    status: 'Completed'
  },
  {
    time: '10:00 – 11:30 AM',
    code: 'CS 107',
    title: 'Computer Organization & Systems',
    location: 'Packard EE 101',
    instructor: 'Prof. Jerry Cain',
    seat: 'Row C • Seat 12',
    status: 'Live',
    action: 'Live Slide Deck: Generics & Assembly'
  },
  {
    time: '11:30 AM – 01:00 PM',
    code: 'Midday Break',
    title: 'Green Library Bing Wing / Coupa Cafe',
    location: 'Campus Center',
    status: 'Break'
  },
  {
    time: '01:00 – 02:20 PM',
    code: 'CS 109',
    title: 'Introduction to Probability for Computer Scientists',
    location: 'Gates CS B02',
    instructor: 'Prof. Chris Piech',
    unit: '5 Units',
    status: 'Upcoming'
  },
  {
    time: '03:30 – 05:00 PM',
    code: 'CS 111',
    title: 'Operating Systems Principles',
    location: 'Hewlett Teaching Ctr 200',
    instructor: 'Prof. John Ousterhout',
    unit: '5 Units',
    status: 'Upcoming'
  }
];
