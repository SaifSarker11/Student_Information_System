import React, { useState } from 'react';
import { StanfordLogo } from './components/StanfordLogo';
import { UserFlowDiagram } from './components/UserFlowDiagram';
import { VideoPlayer } from './components/VideoPlayer';
import { PhoneMockup } from './components/PhoneMockup';
import { VideoExporter } from './components/VideoExporter';
import { HotlinkModal } from './components/HotlinkModal';
import { studentData, enrolledCourses, wednesdaySchedule } from './data/flowData';
import { soundEngine } from './utils/audioSynthesizer';
import {
  Play,
  Layers,
  Smartphone,
  Download,
  Link as LinkIcon,
  Sparkles,
  Info,
  Calendar,
  BookOpen,
  Award,
  CreditCard,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'flow' | 'video' | 'simulator'>('flow');
  const [isExporterOpen, setIsExporterOpen] = useState<boolean>(false);
  const [isHotlinkModalOpen, setIsHotlinkModalOpen] = useState<boolean>(false);

  // Hotlinked / uploaded image state with localStorage persistence
  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    return localStorage.getItem('stanford_axess_custom_avatar_v2') || studentData.avatarUrl || '';
  });
  const [campusUrl, setCampusUrl] = useState<string>(() => {
    return localStorage.getItem('stanford_axess_custom_campus_v2') || studentData.campusPhotoUrl || '';
  });

  const handleUpdateUrls = (newAvatar: string, newCampus: string) => {
    setAvatarUrl(newAvatar);
    setCampusUrl(newCampus);
    try {
      localStorage.setItem('stanford_axess_custom_avatar_v2', newAvatar);
      localStorage.setItem('stanford_axess_custom_campus_v2', newCampus);
    } catch {
      // ignore storage quota errors if image is very large
    }
  };

  // Simulator tab state
  const [simulatorTab, setSimulatorTab] = useState<'hub' | 'courses' | 'schedule' | 'grades' | 'profile'>('hub');

  const switchView = (view: 'flow' | 'video' | 'simulator') => {
    setCurrentView(view);
    soundEngine.playTap();
  };

  const handleStageSelectFromFlow = (stageId: string) => {
    if (stageId === 'hub' || stageId === 'courses' || stageId === 'schedule' || stageId === 'grades' || stageId === 'profile') {
      setSimulatorTab(stageId);
      setCurrentView('simulator');
      soundEngine.playTap();
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-stone-900 flex flex-col font-sans selection:bg-red-200 selection:text-red-900">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-stone-300 shadow-xs px-4 sm:px-8 py-3">
        <div className="max-w-[1780px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3.5">
            <StanfordLogo size="sm" variant="full" />
            <div className="h-6 w-[1px] bg-stone-300 hidden sm:block"></div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-bold text-stone-900 leading-tight">
                Axess Flow & Video Showcase
              </span>
              <span className="text-[10px] text-stone-500 font-mono">
                Stanford Student Portal UX Flow
              </span>
            </div>
          </div>

          {/* View Mode Switcher Pills */}
          <div className="flex items-center bg-stone-200/80 p-1 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => switchView('flow')}
              className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'flow'
                  ? 'bg-white text-[#8C1515] font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flow Architecture</span>
            </button>

            <button
              onClick={() => switchView('video')}
              className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'video'
                  ? 'bg-[#8C1515] text-white font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Cinematic Video</span>
            </button>

            <button
              onClick={() => switchView('simulator')}
              className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'simulator'
                  ? 'bg-white text-[#8C1515] font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Simulator</span>
            </button>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Student Photo & Media Button */}
            <button
              onClick={() => setIsHotlinkModalOpen(true)}
              className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 pl-1.5 pr-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              title={`Upload or update photo for ${studentData.name}`}
            >
              <img
                src={avatarUrl}
                alt={studentData.name}
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full object-cover border border-[#8C1515]"
              />
              <span className="hidden md:inline">Photo & Media</span>
            </button>

            {/* Video Exporter Button */}
            <button
              onClick={() => setIsExporterOpen(true)}
              className="bg-[#8C1515] hover:bg-[#620000] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Video</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1780px] w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* VIEW 1: FLOW ARCHITECTURE DIAGRAM */}
        {currentView === 'flow' && (
          <div className="space-y-6 animate-fadeIn">
            <UserFlowDiagram
              onSelectStage={handleStageSelectFromFlow}
              onLaunchVideo={() => switchView('video')}
              customAvatarUrl={avatarUrl}
              customCampusUrl={campusUrl}
            />
          </div>
        )}

        {/* VIEW 2: CINEMATIC VIDEO PLAYER */}
        {currentView === 'video' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <h2
                className="text-2xl sm:text-3xl font-serif font-bold text-stone-900"
                style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
              >
                Axess Flow Video Showcase
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm">
                Synchronized 60 FPS walkthrough across all 5 user stages with
                animated camera tracking, narration voiceover, and live touch
                cues.
              </p>
            </div>

            <VideoPlayer
              onOpenExporter={() => setIsExporterOpen(true)}
              customAvatarUrl={avatarUrl}
              customCampusUrl={campusUrl}
            />

            {/* Interactive Timeline Quick Stage Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4">
              {[
                {
                  stage: '01',
                  name: 'Homepage & Hub',
                  desc: 'Cardinal Key status, Hoover Tower banner & Navigate Enrollment launcher',
                  tab: 'hub'
                },
                {
                  stage: '02',
                  name: 'Study List Review',
                  desc: '15.0 Autumn unit limit, CS 107/109/111 syllabi & Canvas links',
                  tab: 'courses'
                },
                {
                  stage: '03',
                  name: 'Live Timetable',
                  desc: 'Packard EE 101 seat locator, slide sync & campus GPS wayfinding',
                  tab: 'schedule'
                },
                {
                  stage: '04',
                  name: 'Academic Standing',
                  desc: '3.92 GPA growth curve, Top 2% cohort rank & official eTranscript',
                  tab: 'grades'
                },
                {
                  stage: '05',
                  name: 'Stanford Card ID',
                  desc: 'Digital NFC pass, barcode, degree requirements & zero balance',
                  tab: 'profile'
                }
              ].map((item) => (
                <div
                  key={item.stage}
                  onClick={() => {
                    setSimulatorTab(
                      item.tab as 'hub' | 'courses' | 'schedule' | 'grades' | 'profile'
                    );
                    setCurrentView('simulator');
                  }}
                  className="bg-white p-3.5 rounded-2xl border border-stone-200 hover:border-[#8C1515] transition-all cursor-pointer shadow-xs group"
                >
                  <span className="text-[10px] font-bold text-[#8C1515] font-serif uppercase">
                    Stage {item.stage}
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 group-hover:text-[#8C1515]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                    {item.desc}
                  </p>
                  <span className="mt-2 text-[10px] text-[#8C1515] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Simulate Stage →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: INTERACTIVE MOBILE SIMULATOR */}
        {currentView === 'simulator' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Intro Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-stone-300 gap-4">
              <div>
                <h2
                  className="text-2xl font-serif font-bold text-stone-900"
                  style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
                >
                  Stanford Axess Interactive Device Simulator
                </h2>
                <p className="text-xs sm:text-sm text-stone-600">
                  Directly interact with the Stanford Axess interface for{' '}
                  <strong className="text-stone-900">
                    {studentData.name} ({studentData.degree} '27)
                  </strong>
                  . Tap tabs, inspect course details, and view verified records.
                </p>
              </div>

              {/* Quick Tab Selector Pills */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-stone-300 text-xs overflow-x-auto">
                {[
                  { key: 'hub', label: '1. Hub' },
                  { key: 'courses', label: '2. Courses' },
                  { key: 'schedule', label: '3. Schedule' },
                  { key: 'grades', label: '4. Grades' },
                  { key: 'profile', label: '5. Profile' }
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => {
                      setSimulatorTab(
                        t.key as 'hub' | 'courses' | 'schedule' | 'grades' | 'profile'
                      );
                      soundEngine.playTap();
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                      simulatorTab === t.key
                        ? 'bg-[#8C1515] text-white'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Side-by-Side: Device Mockup + Rich Metadata Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Phone Mockup */}
              <div className="lg:col-span-5 flex justify-center sticky top-24">
                <PhoneMockup
                  activeTab={simulatorTab}
                  onTabChange={(tab) => {
                    setSimulatorTab(tab);
                    soundEngine.playTap();
                  }}
                  showTapRing={true}
                  tapRingPosition={
                    simulatorTab === 'hub'
                      ? 'enrollment'
                      : simulatorTab === 'courses'
                      ? 'course107'
                      : simulatorTab === 'schedule'
                      ? 'wayfinding'
                      : simulatorTab === 'grades'
                      ? 'transcript'
                      : 'none'
                  }
                  customAvatarUrl={avatarUrl}
                  customCampusUrl={campusUrl}
                  scale={1}
                  onOpenPhotoModal={() => setIsHotlinkModalOpen(true)}
                />
              </div>

              {/* Right Column: Deep Academic State Inspector */}
              <div className="lg:col-span-7 space-y-5">
                {/* Active Screen State Summary Card */}
                <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8C1515]"></span>
                      <h3 className="font-bold text-stone-900 text-sm">
                        Active State: {simulatorTab.toUpperCase()}
                      </h3>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Cardinal Key Encrypted
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {simulatorTab === 'hub' &&
                      'The central landing experience displays essential identity credentials, Hoover Tower welcome banner, quick links to SimpleEnrol and Stanford ePay, and cumulative academic standings.'}
                    {simulatorTab === 'courses' &&
                      'Official Study List loaded for Autumn 2024-25. 15.0 Units registered across CS 107 (Computer Organization), CS 109 (Probability), and CS 111 (Operating Systems).'}
                    {simulatorTab === 'schedule' &&
                      'Live timetable synchronization featuring interactive weekly scrubber (Mon 21 - Fri 25), real-time seat locators at Packard EE 101, and GPS wayfinding.'}
                    {simulatorTab === 'grades' &&
                      'Registrar academic records indicating 3.92 Cumulative GPA, Dean’s Honors commendation, and tamper-proof SHA-256 official PDF eTranscript generation.'}
                    {simulatorTab === 'profile' &&
                      'Digital student identity featuring the Stanford Card ID pass with scannable barcode, Arrillaga Gym and Green Library privileges, and 58 / 180 degree units progress.'}
                  </p>
                </div>

                {/* Enrolled Courses Quick View */}
                <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                      Autumn 2024 Study List Breakdown
                    </h4>
                    <span className="text-[11px] font-bold text-[#8C1515]">
                      15.0 / 20.0 Units
                    </span>
                  </div>

                  <div className="space-y-2">
                    {enrolledCourses.map((c) => (
                      <div
                        key={c.code}
                        className="bg-stone-50 p-3 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-[#8C1515] font-bold">
                              {c.code}
                            </strong>
                            <span className="font-medium text-stone-900">
                              {c.title}
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-500 block mt-0.5">
                            {c.instructor} • {c.location} • {c.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-white border border-stone-200 px-2 py-0.5 rounded text-[11px] font-semibold text-stone-700">
                            {c.units} Units
                          </span>
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                            {c.estGrade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Day Timetable Timeline */}
                <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                      Wednesday Academic Timeline
                    </h4>
                    <span className="text-[11px] text-stone-500 font-mono">
                      Packard EE & Gates CS Quad
                    </span>
                  </div>

                  <div className="space-y-2">
                    {wednesdaySchedule.map((slot) => (
                      <div
                        key={slot.time}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                          slot.status === 'Live'
                            ? 'bg-red-50/80 border-red-300 font-medium'
                            : 'bg-stone-50 border-stone-200 text-stone-600'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[11px] text-stone-500">
                            {slot.time}
                          </span>
                          <div>
                            <span className="font-bold text-stone-900 block">
                              {slot.title}
                            </span>
                            <span className="text-[10px] text-stone-500">
                              {slot.location}
                            </span>
                          </div>
                        </div>

                        {slot.status === 'Live' ? (
                          <span className="bg-[#8C1515] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            Live Now
                          </span>
                        ) : slot.status === 'Break' ? (
                          <span className="text-[10px] text-stone-400">
                            Study Break
                          </span>
                        ) : slot.status === 'Completed' ? (
                          <span className="text-[10px] text-stone-400">
                            ✓ Completed
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-700 font-semibold">
                            Upcoming
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Modals */}
      <VideoExporter
        isOpen={isExporterOpen}
        onClose={() => setIsExporterOpen(false)}
        customAvatarUrl={avatarUrl}
      />

      <HotlinkModal
        isOpen={isHotlinkModalOpen}
        onClose={() => setIsHotlinkModalOpen(false)}
        avatarUrl={avatarUrl}
        campusUrl={campusUrl}
        onUpdateUrls={handleUpdateUrls}
      />
    </div>
  );
}

