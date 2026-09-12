import React from 'react';
import { AxessHeaderBadge } from './StanfordLogo';
import {
  studentData,
  enrolledCourses,
  prereqCourses,
  wednesdaySchedule
} from '../data/flowData';
import {
  Sparkles,
  ChevronRight,
  Download,
  Calendar,
  BookOpen,
  Award,
  User,
  LayoutGrid,
  CheckCircle2,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck,
  FileText,
  CreditCard,
  Camera
} from 'lucide-react';

interface PhoneMockupProps {
  activeTab: 'hub' | 'courses' | 'schedule' | 'grades' | 'profile';
  onTabChange?: (tab: 'hub' | 'courses' | 'schedule' | 'grades' | 'profile') => void;
  showTapRing?: boolean;
  tapRingPosition?: 'enrollment' | 'course107' | 'wayfinding' | 'transcript' | 'none';
  customAvatarUrl?: string;
  customCampusUrl?: string;
  scale?: number;
  className?: string;
  isInteractive?: boolean;
  onOpenPhotoModal?: () => void;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  activeTab,
  onTabChange,
  showTapRing = false,
  tapRingPosition = 'none',
  customAvatarUrl,
  customCampusUrl,
  scale = 1,
  className = '',
  isInteractive = true,
  onOpenPhotoModal
}) => {
  const avatar = customAvatarUrl || studentData.avatarUrl;
  const campusPhoto = customCampusUrl || studentData.campusPhotoUrl;

  const handleTabClick = (tab: 'hub' | 'courses' | 'schedule' | 'grades' | 'profile') => {
    if (onTabChange && isInteractive) {
      onTabChange(tab);
    }
  };

  return (
    <div
      className={`relative select-none transition-transform duration-300 ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
    >
      {/* Phone outer hardware bezel */}
      <div className="w-[300px] h-[640px] bg-stone-900 rounded-[44px] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1)] border-[4px] border-stone-800 flex flex-col relative overflow-hidden">
        {/* Dynamic Island / Camera Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800"></div>
          <div className="w-10 h-1 rounded-full bg-stone-900"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-ping"></div>
        </div>

        {/* Screen Bezel Container */}
        <div className="w-full h-full bg-[#FAF6EE] rounded-[36px] overflow-hidden flex flex-col relative">
          {/* Status Bar */}
          <div className="pt-2 px-6 pb-1 flex justify-between items-center text-[10px] font-bold text-stone-700 bg-[#8C1515] text-white">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px]">5G</span>
              <div className="w-4 h-2 border border-white rounded-[2px] p-[1px] flex items-center">
                <div className="w-full h-full bg-white rounded-[1px]"></div>
              </div>
            </div>
          </div>

          {/* Stanford Axess Header */}
          <AxessHeaderBadge activeTab={activeTab} />

          {/* Screen Content Scrollable Area */}
          <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 font-sans text-xs scrollbar-none">
            {/* TAB 1: HUB / HOMEPAGE */}
            {activeTab === 'hub' && (
              <div className="space-y-3">
                {/* Student Identity Tag */}
                <div className="bg-[#620000] text-white p-2 rounded-xl flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={avatar}
                      alt={studentData.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-amber-400 shadow-xs"
                    />
                    <div>
                      <div className="font-bold text-[11px] leading-tight text-white">
                        {studentData.name}
                      </div>
                      <div className="text-[8px] text-stone-300 font-mono">
                        SUID: {studentData.suid} • CS '27
                      </div>
                    </div>
                  </div>
                  <span className="text-[8px] bg-[#8C1515] text-stone-100 font-semibold px-2 py-0.5 rounded-full">
                    Autumn 2024-25
                  </span>
                </div>

                {/* Hoover Tower Welcome Banner */}
                <div className="relative rounded-xl overflow-hidden shadow-xs border border-stone-300">
                  <img
                    src={campusPhoto}
                    alt="Stanford Hoover Tower Campus"
                    referrerPolicy="no-referrer"
                    className="w-full h-24 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="absolute inset-0 p-3 flex flex-col justify-end text-white">
                    <span className="text-[8px] tracking-wider uppercase font-bold text-amber-300">
                      STUDENT PORTAL
                    </span>
                    <h3 className="font-serif text-base font-bold leading-tight">
                      Welcome, {studentData.name}
                    </h3>
                    <div className="mt-1 flex items-center justify-between text-[9px] text-stone-200">
                      <span>Sophomore • B.S. CS</span>
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Cardinal Key
                      </span>
                    </div>
                  </div>
                </div>

                {/* ESSENTIAL SERVICES: Navigate Enrollment (Interactive Target) */}
                <div className="relative">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-stone-900 rounded-xl p-3 shadow-xs border border-amber-500 cursor-pointer active:scale-[0.98] transition-transform">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-600/20 flex items-center justify-center font-bold text-amber-900">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-[11px] leading-tight">
                            Navigate Enrollment
                          </div>
                          <div className="text-[9px] text-amber-950 font-medium">
                            Class Enrollment, Study List & Cart
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-amber-950" />
                    </div>
                  </div>

                  {/* Pulsing Touch Ring if on this screen */}
                  {(showTapRing || tapRingPosition === 'enrollment') && (
                    <div className="absolute -right-1 -bottom-2 pointer-events-none z-30">
                      <div className="w-9 h-9 rounded-full bg-purple-500/30 border-2 border-purple-600 animate-ping absolute inset-0"></div>
                      <div className="w-9 h-9 rounded-full bg-purple-600/50 border-2 border-purple-700 flex items-center justify-center text-xs shadow-md">
                        👆
                      </div>
                    </div>
                  )}
                </div>

                {/* Secondary Essential Link: Pay Bill */}
                <div className="bg-white rounded-xl p-2.5 border border-stone-200 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#8C1515]" />
                    <div>
                      <div className="font-bold text-[10px] text-stone-900">
                        Pay Bill / Stanford ePay
                      </div>
                      <div className="text-[8px] text-stone-500">
                        Tuition account & parent access
                      </div>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[9px] px-2 py-0.5 rounded-full">
                    $0.00 Due
                  </span>
                </div>

                {/* Academic Standing Cards */}
                <div className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-xs">
                  <div className="flex justify-between items-center text-[10px] mb-1.5">
                    <span className="font-bold text-stone-800">
                      Academic Standing
                    </span>
                    <span className="text-[#008566] font-bold text-[9px] flex items-center gap-1">
                      ● Honors Eligible
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                      <span className="text-[8px] text-stone-500 uppercase font-semibold block">
                        Cumulative GPA
                      </span>
                      <span className="text-lg font-bold text-[#8C1515]">
                        3.88
                      </span>
                      <span className="text-[9px] text-stone-500"> / 4.00</span>
                      <span className="block text-[8px] text-emerald-700 font-semibold mt-0.5">
                        Top 3% School of Eng
                      </span>
                    </div>
                    <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                      <span className="text-[8px] text-stone-500 uppercase font-semibold block">
                        Degree Units
                      </span>
                      <span className="text-lg font-bold text-stone-900">
                        48{' '}
                        <span className="text-[10px] text-stone-400 font-normal">
                          / 180
                        </span>
                      </span>
                      <div className="w-full bg-stone-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-[#8C1515] h-full w-[27%]"></div>
                      </div>
                      <span className="block text-[8px] text-stone-600 mt-0.5">
                        Autumn: 15.0 Units
                      </span>
                    </div>
                  </div>
                </div>

                {/* Today's Lectures */}
                <div className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-xs">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-stone-800 text-[10px]">
                      Today's Lectures
                    </span>
                    <span className="bg-stone-100 px-1.5 py-0.5 rounded text-[8px] font-semibold text-stone-600">
                      Tuesday
                    </span>
                  </div>

                  <div className="bg-red-50/80 border border-red-200 rounded-lg p-2 mb-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#8C1515] text-[11px]">
                        CS 107
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[8px] font-bold px-1.5 py-0.2 rounded">
                        In Session
                      </span>
                    </div>
                    <div className="text-[9px] font-medium text-stone-800">
                      Computer Organization & Systems
                    </div>
                    <div className="text-[8px] text-stone-500 mt-0.5 flex items-center gap-2">
                      <span>🕒 10:00 – 11:30 AM</span>
                      <span>📍 Packard EE 101</span>
                    </div>
                  </div>

                  <div className="bg-stone-50 border border-stone-100 rounded-lg p-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-stone-900 text-[10px]">
                        CS 109
                      </span>
                      <span className="text-[8px] text-stone-500">5.0 Units</span>
                    </div>
                    <div className="text-[9px] text-stone-600">
                      Intro to Probability for Computer Scientists
                    </div>
                    <div className="text-[8px] text-stone-400 mt-0.5">
                      01:00 PM • Gates CS B02
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COURSES & STUDY LIST */}
            {activeTab === 'courses' && (
              <div className="space-y-3">
                {/* Metrics Banner */}
                <div className="bg-stone-900 text-white rounded-xl p-2.5 shadow-xs">
                  <div className="flex justify-between items-center text-[9px] text-stone-300">
                    <span>
                      Enrolled Units:{' '}
                      <strong className="text-white text-xs font-bold">
                        15.0
                      </strong>
                    </span>
                    <span>
                      Max Allowed: <strong className="text-white">20.0</strong>
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[8px]">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      ● Study List Confirmed by Registrar
                    </span>
                    <span className="bg-stone-800 px-1.5 py-0.5 rounded text-stone-300">
                      Aut 24-25
                    </span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-[#8C1515] text-white py-1.5 rounded-lg text-[9px] font-semibold text-center shadow-xs">
                    🔍 ExploreCourses
                  </button>
                  <button className="bg-amber-400 text-stone-900 py-1.5 rounded-lg text-[9px] font-bold text-center shadow-xs">
                    ➕ Add (SimpleEnrol)
                  </button>
                </div>

                {/* Section: Core CS Requirements */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] font-bold text-stone-600 uppercase tracking-wider">
                    <span>Core CS Requirements</span>
                    <span className="text-stone-400 font-normal">
                      Enrolled / In-Progress
                    </span>
                  </div>

                  {/* Course 1: CS 107 (Interactive Tap Highlight) */}
                  <div className="relative">
                    <div className="bg-white rounded-xl p-2.5 border-2 border-[#8C1515] shadow-xs">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#8C1515] text-xs">
                            CS 107
                          </span>
                          <span className="bg-emerald-100 text-emerald-800 text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                            Enrolled • 5.0 Units
                          </span>
                        </div>
                        <span className="text-stone-400 text-xs">▼</span>
                      </div>
                      <div className="font-bold text-stone-900 text-[11px] mt-1">
                        Computer Organization & Systems
                      </div>
                      <div className="text-[9px] text-stone-600 mt-1 flex flex-col gap-0.5">
                        <span>🕒 Mon, Wed, Fri 10:00 AM • Packard EE 101</span>
                        <span>
                          👤 Prof. Jerry Cain •{' '}
                          <strong className="text-emerald-700">
                            98% Attendance
                          </strong>
                        </span>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[8px] text-[#8C1515] font-semibold">
                        <span>📖 Canvas Syllabus</span>
                        <span>🖥 myth Machines</span>
                        <span>💬 Office Hours</span>
                      </div>
                    </div>

                    {/* Touch Ring */}
                    {(showTapRing || tapRingPosition === 'course107') && (
                      <div className="absolute -right-1 -bottom-2 pointer-events-none z-30">
                        <div className="w-9 h-9 rounded-full bg-purple-500/30 border-2 border-purple-600 animate-ping absolute inset-0"></div>
                        <div className="w-9 h-9 rounded-full bg-purple-600/50 border-2 border-purple-700 flex items-center justify-center text-xs shadow-md">
                          👆
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Course 2: CS 109 */}
                  <div className="bg-white rounded-xl p-2.5 border border-stone-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-stone-900 text-[11px]">
                        CS 109{' '}
                        <span className="text-[8px] font-normal text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded ml-1">
                          5.0 Units
                        </span>
                      </span>
                      <span className="text-stone-400 text-xs">▼</span>
                    </div>
                    <div className="text-[10px] font-medium text-stone-800 mt-0.5">
                      Intro to Probability for Computer Scientists
                    </div>
                    <div className="text-[8px] text-stone-500 mt-1">
                      Mon, Wed 1:00 PM • Gates CS B02 • Prof. Chris Piech
                    </div>
                  </div>

                  {/* Course 3: CS 111 */}
                  <div className="bg-white rounded-xl p-2.5 border border-stone-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-stone-900 text-[11px]">
                        CS 111{' '}
                        <span className="text-[8px] font-normal text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded ml-1">
                          5.0 Units
                        </span>
                      </span>
                      <span className="text-stone-400 text-xs">▼</span>
                    </div>
                    <div className="text-[10px] font-medium text-stone-800 mt-0.5">
                      Operating Systems Principles
                    </div>
                    <div className="text-[8px] text-stone-500 mt-1">
                      Tue, Thu 3:30 PM • Hewlett 200 • Prof. John Ousterhout
                    </div>
                  </div>
                </div>

                {/* Stanford Motto Banner */}
                <div className="bg-[#FAF9F6] border border-amber-200/80 rounded-xl p-2 text-center text-[9px]">
                  <span className="font-serif italic font-semibold text-[#8C1515]">
                    "Die Luft der Freiheit weht"
                  </span>
                  <span className="block text-[8px] text-stone-500">
                    The wind of freedom blows • Stanford Academic Creed
                  </span>
                </div>

                {/* Completed CS Prerequisites */}
                <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-200">
                  <span className="text-[9px] font-bold text-stone-600 uppercase block mb-1.5">
                    Completed Prerequisites
                  </span>
                  <div className="space-y-1.5">
                    {prereqCourses.slice(0, 3).map((item) => (
                      <div
                        key={item.code}
                        className="bg-white p-1.5 rounded-lg border border-stone-200 flex justify-between items-center text-[9px]"
                      >
                        <div>
                          <strong className="text-stone-900">{item.code}</strong>
                          <span className="text-stone-500 block text-[8px]">
                            {item.title}
                          </span>
                        </div>
                        <span className="bg-[#008566] text-white font-bold text-[9px] px-1.5 py-0.5 rounded">
                          {item.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TIMETABLE & SCHEDULE */}
            {activeTab === 'schedule' && (
              <div className="space-y-3">
                {/* Quarter Header Progress */}
                <div className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-xs">
                  <div className="flex justify-between items-center text-[9px] mb-1">
                    <span className="font-bold text-[#8C1515]">
                      Autumn Quarter 2024–25
                    </span>
                    <span className="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded font-semibold text-[8px]">
                      Week 6 of 10
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden mb-1">
                    <div className="bg-[#8C1515] h-full w-[56%]"></div>
                  </div>
                  <div className="flex justify-between text-[8px] text-stone-500">
                    <span>Day 28 of 50 (56% Complete)</span>
                    <span>Finals: Dec 9–13</span>
                  </div>
                </div>

                {/* WEEKLY SCRUBBER (Mon 21 - Fri 25) */}
                <div className="bg-white rounded-xl p-2 border border-stone-200 shadow-xs">
                  <div className="flex justify-between text-[8px] text-stone-500 font-semibold mb-1">
                    <span>WEEKLY SCRUBBER</span>
                    <span className="text-[#8C1515] font-bold">Oct 21 – Oct 25</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 text-center">
                    {[
                      { day: 'MON', num: '21', active: false },
                      { day: 'TUE', num: '22', active: false },
                      { day: 'WED', num: '23', active: true },
                      { day: 'THU', num: '24', active: false },
                      { day: 'FRI', num: '25', active: false }
                    ].map((item) => (
                      <div
                        key={item.day}
                        className={`p-1 rounded-lg ${
                          item.active
                            ? 'bg-[#8C1515] text-white shadow-xs font-bold'
                            : 'bg-stone-50 text-stone-700'
                        }`}
                      >
                        <span
                          className={`block text-[7px] ${
                            item.active ? 'text-red-200' : 'text-stone-400'
                          }`}
                        >
                          {item.day}
                        </span>
                        <span className="text-xs">{item.num}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Day Header */}
                <div className="flex justify-between items-center px-0.5">
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">
                      Wednesday, October 23
                    </h4>
                    <span className="text-[8px] text-stone-500">
                      Autumn Quarter • Computer Science Core
                    </span>
                  </div>
                  <span className="bg-stone-100 text-stone-700 text-[8px] font-semibold px-2 py-0.5 rounded-full border border-stone-200">
                    Axess Verified
                  </span>
                </div>

                {/* Schedule Items Stack */}
                <div className="space-y-2">
                  {/* Lab completed */}
                  <div className="bg-stone-50 rounded-lg p-2 border border-stone-200 text-[9px]">
                    <div className="flex justify-between text-[8px] text-stone-500">
                      <span>09:00 – 10:00 AM</span>
                      <span className="text-emerald-700 font-bold">
                        ✓ Attended
                      </span>
                    </div>
                    <div className="font-bold text-stone-800 text-[10px]">
                      ENGR 40M Lab: Making Stuff
                    </div>
                    <div className="text-[8px] text-stone-500">
                      Packard Lab 108
                    </div>
                  </div>

                  {/* LIVE IN SESSION: CS 107 */}
                  <div className="bg-white rounded-xl border-2 border-red-500 overflow-hidden shadow-xs">
                    <div className="bg-[#8C1515] text-white px-2.5 py-1 text-[8px] font-bold flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        LIVE IN SESSION
                      </span>
                      <span>Packard EE 101</span>
                    </div>
                    <div className="p-2 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#8C1515] text-xs">
                          CS 107
                        </span>
                        <span className="text-[9px] font-semibold text-stone-600">
                          10:00 – 11:30 AM
                        </span>
                      </div>
                      <div className="text-[10px] font-medium text-stone-800">
                        Computer Organization & Systems
                      </div>
                      <div className="text-[8px] text-stone-500">
                        Prof. Jerry Cain • Row C, Seat 12
                      </div>
                      <button className="w-full mt-1 bg-[#620000] text-white rounded-lg py-1 text-[8px] font-semibold flex items-center justify-center gap-1">
                        <span>Open Live Slides (Generics & Assembly)</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>

                  {/* Midday break */}
                  <div className="bg-stone-50 rounded-lg p-1.5 text-[8px] text-stone-600 flex justify-between items-center border border-stone-200">
                    <span>☕ 11:30 AM – 01:00 PM Break</span>
                    <span className="text-stone-400">Green Library / Coupa</span>
                  </div>

                  {/* Upcoming: CS 109 */}
                  <div className="bg-white rounded-lg p-2 border border-stone-200 text-[9px]">
                    <div className="flex justify-between text-[8px]">
                      <span className="font-bold text-stone-900">CS 109</span>
                      <span className="text-emerald-700 bg-emerald-50 px-1 rounded font-semibold">
                        Starts in 1h 30m
                      </span>
                    </div>
                    <div className="text-[9px] text-stone-700">
                      Intro to Probability • Gates CS B02
                    </div>
                  </div>
                </div>

                {/* Campus Wayfinding & GPS */}
                <div className="relative">
                  <div className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-xs">
                    <div className="flex justify-between items-center text-[9px] mb-1.5">
                      <span className="font-bold text-stone-800 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#8C1515]" /> Campus
                        Wayfinding
                      </span>
                      <span className="text-emerald-700 font-semibold text-[8px]">
                        ● Live GPS Active
                      </span>
                    </div>
                    <div className="h-14 bg-stone-200 rounded-lg overflow-hidden relative flex items-center justify-center border border-stone-300">
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#8C1515_1px,transparent_1px)] [background-size:8px_8px]"></div>
                      <div className="z-10 text-center px-2">
                        <span className="text-[9px] font-bold text-stone-900 block">
                          Target: Gates CS & Packard EE
                        </span>
                        <span className="text-[8px] text-stone-600">
                          Science & Eng Quad • 3 min walk
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Touch Ring */}
                  {(showTapRing || tapRingPosition === 'wayfinding') && (
                    <div className="absolute -right-1 -bottom-2 pointer-events-none z-30">
                      <div className="w-9 h-9 rounded-full bg-purple-500/30 border-2 border-purple-600 animate-ping absolute inset-0"></div>
                      <div className="w-9 h-9 rounded-full bg-purple-600/50 border-2 border-purple-700 flex items-center justify-center text-xs shadow-md">
                        👆
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: GRADES & TRANSCRIPT */}
            {activeTab === 'grades' && (
              <div className="space-y-3">
                {/* Official Standing Card */}
                <div className="bg-white rounded-xl p-2.5 border border-stone-200 shadow-xs">
                  <div className="flex justify-between items-center text-[9px] mb-2">
                    <span className="text-[8px] font-bold text-stone-500 uppercase tracking-wider">
                      OFFICIAL REGISTRAR RECORD
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded text-[8px]">
                      Good Standing
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    <div className="bg-stone-50 p-1.5 rounded-lg border border-stone-200">
                      <span className="text-[7px] text-stone-500 block uppercase">
                        Cum. GPA
                      </span>
                      <span className="text-base font-bold text-[#8C1515]">
                        3.92
                      </span>
                      <span className="text-[7px] text-emerald-700 block font-semibold">
                        +0.07 Career
                      </span>
                    </div>
                    <div className="bg-stone-50 p-1.5 rounded-lg border border-stone-200">
                      <span className="text-[7px] text-stone-500 block uppercase">
                        Degree Units
                      </span>
                      <span className="text-base font-bold text-stone-900">
                        58.0
                      </span>
                      <span className="text-[7px] text-stone-500 block">
                        32% Complete
                      </span>
                    </div>
                    <div className="bg-stone-50 p-1.5 rounded-lg border border-stone-200">
                      <span className="text-[7px] text-stone-500 block uppercase">
                        Cohort
                      </span>
                      <span className="text-base font-bold text-amber-600">
                        Top 2%
                      </span>
                      <span className="text-[7px] text-stone-500 block">
                        Rank 3/142
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dean's Honors Notice */}
                <div className="bg-amber-50 border-l-2 border-amber-500 p-2 rounded-r-lg text-[9px]">
                  <div className="font-bold text-amber-950 flex items-center gap-1">
                    <span>⭐</span> Dean's Honors Commendation
                  </div>
                  <div className="text-[8px] text-amber-900 mt-0.5">
                    Autumn 2024 recognition for sustained scholastic distinction in
                    Engineering.
                  </div>
                </div>

                {/* GPA Growth Vector Trajectory Card */}
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-xs">
                  <div className="flex justify-between items-center text-[9px] mb-1.5">
                    <span className="font-bold text-stone-800">
                      GPA Growth Over Time
                    </span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[8px]">
                      ↑ +1.8%
                    </span>
                  </div>

                  {/* SVG Line Curve */}
                  <svg className="w-full h-12" viewBox="0 0 200 50">
                    <defs>
                      <linearGradient id="gpaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8C1515" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#8C1515" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 10,42 Q 60,34 100,26 T 190,10 L 190,50 L 10,50 Z"
                      fill="url(#gpaGrad)"
                    />
                    <path
                      d="M 10,42 Q 60,34 100,26 T 190,10"
                      fill="none"
                      stroke="#8C1515"
                      strokeWidth="2.5"
                    />
                    <circle cx="10" cy="42" fill="#8C1515" r="3" />
                    <circle cx="70" cy="32" fill="#8C1515" r="3" />
                    <circle cx="130" cy="22" fill="#8C1515" r="3" />
                    <circle cx="190" cy="10" fill="#8C1515" r="4" />
                  </svg>

                  <div className="flex justify-between text-[7px] text-stone-500 mt-1">
                    <span>Aut '23 (3.85)</span>
                    <span>Win '24 (3.88)</span>
                    <span>Spr '24 (3.90)</span>
                    <span className="text-[#8C1515] font-bold">
                      Aut '24 (3.92)
                    </span>
                  </div>
                </div>

                {/* Autumn 2024 Grade Records */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-stone-600 uppercase block">
                    Autumn 2024 Grade Records
                  </span>

                  {enrolledCourses.slice(0, 3).map((course) => (
                    <div
                      key={course.code}
                      className="bg-white p-2 rounded-lg border border-stone-200 flex justify-between items-center text-[9px]"
                    >
                      <div>
                        <div className="font-bold text-stone-900">
                          {course.code}{' '}
                          <span className="text-[8px] font-normal text-stone-500">
                            {course.units} Units
                          </span>
                        </div>
                        <span className="text-[8px] text-stone-500 block">
                          Midterm: {course.midterm} • Labs: {course.labs}
                        </span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                        {course.estGrade}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Download eTranscript Action (Tap Target) */}
                <div className="relative">
                  <button className="w-full bg-[#8C1515] text-white py-2 rounded-lg font-bold text-[9px] flex items-center justify-center gap-1.5 shadow-xs">
                    <Download className="w-3 h-3" />
                    <span>Download Official eTranscript (PDF)</span>
                  </button>

                  {/* Touch Ring */}
                  {(showTapRing || tapRingPosition === 'transcript') && (
                    <div className="absolute -right-1 -bottom-2 pointer-events-none z-30">
                      <div className="w-9 h-9 rounded-full bg-purple-500/30 border-2 border-purple-600 animate-ping absolute inset-0"></div>
                      <div className="w-9 h-9 rounded-full bg-purple-600/50 border-2 border-purple-700 flex items-center justify-center text-xs shadow-md">
                        👆
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: PROFILE & DEGREE AUDIT */}
            {activeTab === 'profile' && (
              <div className="space-y-3">
                {/* Student Profile Card */}
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-xs flex items-center gap-2.5">
                  <img
                    src={avatar}
                    alt={studentData.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border-2 border-amber-400 shrink-0 shadow-xs"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-stone-900 text-xs truncate">
                        {studentData.name}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[8px] font-bold px-1 rounded">
                        Active
                      </span>
                      <span className="bg-stone-100 text-stone-600 text-[8px] px-1 rounded">
                        Sophomore
                      </span>
                    </div>
                    <div className="text-[9px] text-stone-600">
                      {studentData.degree} • Class of 2027
                    </div>
                    <div className="text-[8px] font-mono text-stone-400">
                      SUNet ID: {studentData.sunetId} ({studentData.suid})
                    </div>
                  </div>
                </div>

                {/* Advisor Pill */}
                <div className="bg-stone-50 border border-stone-200 rounded-lg p-1.5 flex justify-between items-center text-[8px]">
                  <div>
                    <span className="text-stone-500 block uppercase font-semibold">
                      Academic Advisor
                    </span>
                    <strong className="text-stone-900">
                      {studentData.advisor}
                    </strong>
                    <span className="text-stone-500 block">
                      {studentData.advisorBuilding}
                    </span>
                  </div>
                  <button className="bg-[#8C1515] text-white px-2 py-0.5 rounded text-[8px] font-semibold">
                    Contact
                  </button>
                </div>

                {/* STANFORD CARD ID (NFC Digital Pass & Barcode) */}
                <div className="bg-gradient-to-br from-[#8C1515] to-[#5F0D0D] text-white rounded-xl p-3 shadow-md space-y-2.5">
                  <div className="flex justify-between items-center text-[8px]">
                    <span className="font-serif tracking-wider font-bold text-[9px]">
                      STANFORD CARD ID
                    </span>
                    <span className="bg-white/20 text-white text-[7px] px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
                      NFC Active
                    </span>
                  </div>

                  {/* ID Photo & Student Info */}
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <div
                      onClick={onOpenPhotoModal}
                      className="relative group cursor-pointer shrink-0"
                      title="Click to upload/change photo"
                    >
                      <img
                        src={avatar}
                        alt={studentData.name}
                        referrerPolicy="no-referrer"
                        className="w-11 h-13 rounded-lg object-cover border-2 border-white/80 shadow-xs group-hover:brightness-90 transition-all"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-[#8C1515] text-white p-0.5 rounded-full border border-white shadow-xs">
                        <Camera className="w-2.5 h-2.5" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold tracking-wide truncate text-white">
                        {studentData.name}
                      </div>
                      <div className="text-[9px] text-red-100 font-medium">
                        Undergraduate Student
                      </div>
                      <div className="text-[8px] text-red-200 font-mono mt-0.5">
                        SUID: {studentData.suid}
                      </div>
                      <div className="text-[7.5px] text-red-200">
                        Valid Thru: 06 / 2027
                      </div>
                    </div>
                  </div>

                  {/* Barcode Mockup */}
                  <div className="bg-white p-2 rounded-lg text-stone-900 text-center">
                    <div className="flex justify-center items-center gap-[2px] h-6 px-1">
                      {[
                        2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1,
                        3, 2, 1, 3
                      ].map((width, i) => (
                        <span
                          key={i}
                          className="h-full bg-black"
                          style={{ width: `${width}px` }}
                        ></span>
                      ))}
                    </div>
                    <span className="text-[7px] font-mono tracking-widest text-stone-600 block mt-1">
                      9823 0042 1178 001
                    </span>
                  </div>

                  <div className="flex justify-between text-[7px] text-red-200 pt-0.5">
                    <span>✓ Green Library</span>
                    <span>✓ Arrillaga Gym</span>
                    <span>✓ Dining Plan</span>
                  </div>
                </div>

                {/* Degree Progress Audit */}
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-xs space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-stone-800">
                      Degree Progress Audit
                    </span>
                    <span className="font-bold text-[#8C1515]">
                      58{' '}
                      <span className="text-stone-400 font-normal">
                        / 180 Units
                      </span>
                    </span>
                  </div>

                  {/* Prereq Bar */}
                  <div>
                    <div className="flex justify-between text-[8px] text-stone-600 mb-0.5">
                      <span>Prerequisites & Intro</span>
                      <span className="font-bold text-emerald-700">
                        10/10 (100%)
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-500 h-full w-full"></div>
                    </div>
                  </div>

                  {/* Core Bar */}
                  <div>
                    <div className="flex justify-between text-[8px] text-stone-600 mb-0.5">
                      <span>Core CS Requirements</span>
                      <span className="font-bold text-[#8C1515]">
                        3 of 6 (50%)
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#8C1515] h-full w-1/2"></div>
                    </div>
                  </div>

                  {/* Math & Sci Bar */}
                  <div>
                    <div className="flex justify-between text-[8px] text-stone-600 mb-0.5">
                      <span>Math & Science</span>
                      <span className="font-bold text-stone-700">
                        22 of 37 (59%)
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-stone-600 h-full w-[59%]"></div>
                    </div>
                  </div>
                </div>

                {/* Billing / ePay Zero Balance */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 flex justify-between items-center">
                  <div>
                    <div className="text-[8px] text-emerald-800 font-bold uppercase">
                      Stanford ePay Balance
                    </div>
                    <div className="text-xs font-bold text-emerald-950">
                      $0.00 Due
                    </div>
                    <span className="text-[7px] text-emerald-700">
                      Paid in Full on Oct 15, 2024
                    </span>
                  </div>
                  <span className="bg-emerald-600 text-white text-[7px] font-bold px-2 py-0.5 rounded-full">
                    Zero Balance
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation Tab Bar (Active state based on activeTab) */}
          <nav
            aria-label="Mobile Bottom Nav"
            className="h-12 bg-white border-t border-stone-200 grid grid-cols-5 items-center px-1 text-center shrink-0 z-10"
          >
            {[
              { key: 'hub', label: 'Hub', icon: LayoutGrid },
              { key: 'courses', label: 'Courses', icon: BookOpen },
              { key: 'schedule', label: 'Schedule', icon: Calendar },
              { key: 'grades', label: 'Grades', icon: Award },
              { key: 'profile', label: 'Profile', icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() =>
                    handleTabClick(
                      tab.key as 'hub' | 'courses' | 'schedule' | 'grades' | 'profile'
                    )
                  }
                  className={`flex flex-col items-center justify-center transition-colors ${
                    isActive
                      ? 'text-[#8C1515] font-bold'
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 mb-0.5" />
                  <span className="text-[8px]">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
