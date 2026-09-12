import React from 'react';
import { PhoneMockup } from './PhoneMockup';
import { StanfordLogo } from './StanfordLogo';
import { studentData } from '../data/flowData';
import { Play, Sparkles, CheckCircle2 } from 'lucide-react';

interface UserFlowDiagramProps {
  onSelectStage?: (stageId: string) => void;
  onLaunchVideo?: () => void;
  customAvatarUrl?: string;
  customCampusUrl?: string;
}

export const UserFlowDiagram: React.FC<UserFlowDiagramProps> = ({
  onSelectStage,
  onLaunchVideo,
  customAvatarUrl,
  customCampusUrl
}) => {
  return (
    <div className="w-full max-w-[1780px] mx-auto p-4 sm:p-6 lg:p-8 bg-[#FAF6EE] border border-stone-200 rounded-3xl shadow-sm space-y-8">
      {/* Header Banner */}
      <header className="pb-6 border-b border-stone-300 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2.5">
            <StanfordLogo size="sm" variant="full" />
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#8C1515] text-white tracking-wide uppercase">
              UX Flow & Information Architecture
            </span>
            <span className="text-xs text-stone-500 font-mono">
              ID: AXESS-CORE-FLOW-2024
            </span>
          </div>

          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight"
            style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
          >
            Stanford Axess Student Portal — Core Academic Navigation Flow
          </h1>

          <p className="mt-1 text-sm sm:text-base text-stone-600 max-w-4xl">
            End-to-end task journey for{' '}
            <strong className="text-stone-900">
              {studentData.name} ({studentData.degree} '27)
            </strong>
            : from daily hub status, study list verification, and live lecture
            timetable through to verified grade auditing and academic compliance.
          </p>

          {/* Student Profile Identity Chip */}
          <div className="mt-3.5 inline-flex items-center gap-3 bg-white/90 border border-stone-200 rounded-2xl p-2.5 shadow-xs">
            <img
              src={customAvatarUrl || studentData.avatarUrl}
              alt={studentData.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover border-2 border-[#8C1515] shrink-0 shadow-xs"
            />
            <div className="text-xs">
              <div className="font-bold text-stone-900 flex items-center gap-2">
                <span>{studentData.name}</span>
                <span className="text-[10px] font-mono font-normal text-stone-500">
                  SUID: {studentData.suid}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                  Cardinal Key Verified
                </span>
              </div>
              <div className="text-[11px] text-stone-600">
                {studentData.degree} • {studentData.classYear}
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls & Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-white px-4 py-3 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#008566] animate-pulse"></span>
            <span className="font-semibold text-stone-800">
              Authenticated: Cardinal Key Active
            </span>
          </div>
          <span className="text-stone-300">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-purple-100 border border-purple-600 flex items-center justify-center text-[10px] font-bold text-purple-800">
              👆
            </span>
            <span className="font-medium text-stone-700">
              Tap / Transition Gesture
            </span>
          </div>
          <span className="text-stone-300">|</span>
          <span className="text-[#8C1515] font-bold">
            Autumn Quarter 2024–25
          </span>

          {onLaunchVideo && (
            <button
              onClick={onLaunchVideo}
              className="ml-2 inline-flex items-center gap-1.5 bg-[#8C1515] hover:bg-[#620000] text-white px-3 py-1.5 rounded-full font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play Cinematic Video</span>
            </button>
          )}
        </div>
      </header>

      {/* 5-Column Mockup Layout */}
      <div className="overflow-x-auto pb-4 scrollbar-thin">
        <div className="min-w-[1460px] px-2">
          {/* Column Stage Headers */}
          <section className="grid grid-cols-5 gap-6 lg:gap-8 mb-6 text-center">
            {[
              { num: 'Stage 01', title: 'Homepage & Hub', desc: 'Overview, Status & Quick Launch', id: 'hub' },
              { num: 'Stage 02', title: 'Courses & Study List', desc: 'Current Enrolment & Prerequisites', id: 'courses' },
              { num: 'Stage 03', title: 'Weekly Timetable', desc: 'Day Schedule & Live Wayfinding', id: 'schedule' },
              { num: 'Stage 04', title: 'Academic Standing', desc: 'Grades & GPA Growth Records', id: 'grades' },
              { num: 'Stage 05', title: 'Profile & Degree Audit', desc: 'ID Pass, Completion & Billing', id: 'profile' }
            ].map((stage) => (
              <div
                key={stage.id}
                onClick={() => onSelectStage && onSelectStage(stage.id)}
                className="cursor-pointer group flex flex-col items-center p-2 rounded-xl hover:bg-white/60 transition-colors"
              >
                <div className="text-xs font-bold tracking-wider uppercase text-[#8C1515] font-serif">
                  {stage.num}
                </div>
                <h2
                  className="text-base lg:text-lg font-bold text-stone-900 group-hover:text-[#8C1515] transition-colors"
                  style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
                >
                  {stage.title}
                </h2>
                <p className="text-[11px] text-stone-500 mt-0.5">{stage.desc}</p>
              </div>
            ))}
          </section>

          {/* Connected Mockup Row */}
          <section className="relative grid grid-cols-5 gap-6 lg:gap-8 items-start">
            {/* Connecting Horizontal Dashed Line Behind Phones */}
            <div className="absolute top-[280px] left-0 right-0 h-0 pointer-events-none hidden lg:block z-0">
              <div className="w-full grid grid-cols-4 gap-0 px-24">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="flex items-center justify-center">
                    <div className="w-full border-t-2 border-dashed border-red-300 relative flex items-center justify-end">
                      <span className="absolute -top-3 right-0 text-[#8C1515] text-base font-bold">
                        ▶
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STAGE 1: Hub Phone */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                onClick={() => onSelectStage && onSelectStage('hub')}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <PhoneMockup
                  activeTab="hub"
                  showTapRing={true}
                  tapRingPosition="enrollment"
                  customAvatarUrl={customAvatarUrl}
                  customCampusUrl={customCampusUrl}
                />
              </div>
              <div className="mt-4 w-[290px] bg-white rounded-2xl border border-stone-200 p-3.5 shadow-xs text-left">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-[#8C1515] mb-1">
                  Step 1: Session Entry
                </span>
                <h3 className="text-xs font-bold text-stone-900">
                  Primary Hub Landing
                </h3>
                <p className="text-[11px] text-stone-600 mt-1">
                  Student views authenticated Stanford Cardinal Key status,
                  current in-session lecture alerts, and initiates enrolment review.
                </p>
                <div className="mt-2 text-[10px] font-mono text-purple-700 font-semibold bg-purple-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-purple-200">
                  <span>👉</span> Action: Tap "Navigate Enrollment"
                </div>
              </div>
            </div>

            {/* STAGE 2: Courses Phone */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                onClick={() => onSelectStage && onSelectStage('courses')}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <PhoneMockup
                  activeTab="courses"
                  showTapRing={true}
                  tapRingPosition="course107"
                  customAvatarUrl={customAvatarUrl}
                  customCampusUrl={customCampusUrl}
                />
              </div>
              <div className="mt-4 w-[290px] bg-white rounded-2xl border border-stone-200 p-3.5 shadow-xs text-left">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-[#8C1515] mb-1">
                  Step 2: Study List Review
                </span>
                <h3 className="text-xs font-bold text-stone-900">
                  15.0 Unit Load Confirmed
                </h3>
                <p className="text-[11px] text-stone-600 mt-1">
                  Core CS track loaded with confirmed attendance milestones,
                  prerequisite checks, and direct course syllabus links.
                </p>
                <div className="mt-2 text-[10px] font-mono text-purple-700 font-semibold bg-purple-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-purple-200">
                  <span>👉</span> Action: Tap CS 107 to inspect live slot
                </div>
              </div>
            </div>

            {/* STAGE 3: Schedule Phone */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                onClick={() => onSelectStage && onSelectStage('schedule')}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <PhoneMockup
                  activeTab="schedule"
                  showTapRing={true}
                  tapRingPosition="wayfinding"
                  customAvatarUrl={customAvatarUrl}
                  customCampusUrl={customCampusUrl}
                />
              </div>
              <div className="mt-4 w-[290px] bg-white rounded-2xl border border-stone-200 p-3.5 shadow-xs text-left">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-[#8C1515] mb-1">
                  Step 3: Day Execution
                </span>
                <h3 className="text-xs font-bold text-stone-900">
                  Active Classroom View
                </h3>
                <p className="text-[11px] text-stone-600 mt-1">
                  Provides real-time seat locator, lecture slide synchronizer, and
                  immediate access to academic milestones.
                </p>
                <div className="mt-2 text-[10px] font-mono text-purple-700 font-semibold bg-purple-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-purple-200">
                  <span>👉</span> Action: Tap "Grades" in navigation
                </div>
              </div>
            </div>

            {/* STAGE 4: Grades Phone */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                onClick={() => onSelectStage && onSelectStage('grades')}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <PhoneMockup
                  activeTab="grades"
                  showTapRing={true}
                  tapRingPosition="transcript"
                  customAvatarUrl={customAvatarUrl}
                  customCampusUrl={customCampusUrl}
                />
              </div>
              <div className="mt-4 w-[290px] bg-white rounded-2xl border border-stone-200 p-3.5 shadow-xs text-left">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-[#8C1515] mb-1">
                  Step 4: Audit & Performance
                </span>
                <h3 className="text-xs font-bold text-stone-900">
                  Official Registrar Standing
                </h3>
                <p className="text-[11px] text-stone-600 mt-1">
                  Validated 3.92 GPA trajectory with tamper-proof cryptographic
                  transcript export and rank metrics.
                </p>
                <div className="mt-2 text-[10px] font-mono text-purple-700 font-semibold bg-purple-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-purple-200">
                  <span>👉</span> Action: Tap "Profile" for Digital Pass
                </div>
              </div>
            </div>

            {/* STAGE 5: Profile Phone */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                onClick={() => onSelectStage && onSelectStage('profile')}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <PhoneMockup
                  activeTab="profile"
                  showTapRing={false}
                  customAvatarUrl={customAvatarUrl}
                  customCampusUrl={customCampusUrl}
                />
              </div>
              <div className="mt-4 w-[290px] bg-white rounded-2xl border border-stone-200 p-3.5 shadow-xs text-left">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 mb-1">
                  Step 5: Fulfilment
                </span>
                <h3 className="text-xs font-bold text-stone-900">
                  Compliance & Digital Pass
                </h3>
                <p className="text-[11px] text-stone-600 mt-1">
                  Final user terminal state featuring Stanford Card ID barcode
                  pass, degree milestone audit, and zero-balance billing.
                </p>
                <div className="mt-2 text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-emerald-200">
                  <span>✓</span> State: Fully Synchronized
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Specifications & Architectural Matrix Footer */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
          <span className="w-3 h-3 rounded-full bg-[#8C1515]"></span>
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
            Flow Specifications & Architectural State Transition Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-stone-600">
          <div className="space-y-1.5 border-l-2 border-red-300 pl-3">
            <div className="font-bold text-stone-900">1. Authentication Guard</div>
            <p>
              Every step checks the active{' '}
              <code className="bg-stone-100 px-1 py-0.5 rounded text-[#8C1515] font-semibold">
                Cardinal Key
              </code>{' '}
              cryptographic token on device hardware, avoiding duplicate SSO
              challenges across sessions.
            </p>
          </div>

          <div className="space-y-1.5 border-l-2 border-purple-300 pl-3">
            <div className="font-bold text-stone-900">
              2. Real-Time Timetable Sync
            </div>
            <p>
              Class schedule transitions dynamically link room beacons (Packard EE
              101, Gates CS) with lecture slide links and attendance logging.
            </p>
          </div>

          <div className="space-y-1.5 border-l-2 border-amber-300 pl-3">
            <div className="font-bold text-stone-900">
              3. Registrar Ledger Integration
            </div>
            <p>
              Study list loads directly query PeopleSoft campus databases to ensure
              the 15.0-unit autumn limit and prerequisite gates (CS 106B & Math 51)
              are met.
            </p>
          </div>

          <div className="space-y-1.5 border-l-2 border-emerald-300 pl-3">
            <div className="font-bold text-stone-900">
              4. Physical Credential Bridge
            </div>
            <p>
              Apple Wallet / NFC card emulation and digital barcode pass grant
              verified perimeter access to Green Library and Arrillaga recreation
              centers.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400">
          <span>
            Stanford University Administrative Guide 6.2 • FERPA Protected Academic
            Record
          </span>
          <span className="mt-2 sm:mt-0 font-mono">
            Designed for Stanford Axess Mobile • Student Experience Research
          </span>
        </div>
      </section>
    </div>
  );
};
