import React, { useState, useEffect, useRef } from 'react';
import { PhoneMockup } from './PhoneMockup';
import { StanfordLogo } from './StanfordLogo';
import { flowStages, TOTAL_VIDEO_DURATION, studentData } from '../data/flowData';
import { AspectRatio, FlowStage } from '../types';
import { soundEngine } from '../utils/audioSynthesizer';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Download,
  Film,
  Sparkles,
  Subtitles,
  Smartphone,
  Tv,
  HelpCircle,
  Clock,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface VideoPlayerProps {
  onOpenExporter: () => void;
  customAvatarUrl?: string;
  customCampusUrl?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  onOpenExporter,
  customAvatarUrl,
  customCampusUrl
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const lastStageSpokenRef = useRef<number>(-1);

  // Compute current stage from currentTime
  const currentStage: FlowStage =
    flowStages.find(
      (s) => currentTime >= s.startTime && currentTime < s.startTime + s.duration
    ) || flowStages[flowStages.length - 1];

  const currentStageIndex = flowStages.findIndex((s) => s.id === currentStage.id);

  // When stage changes, trigger sound effect & speech
  useEffect(() => {
    if (currentStageIndex !== activeStageIndex) {
      setActiveStageIndex(currentStageIndex);
      soundEngine.playTransition();

      if (speechEnabled && isPlaying && lastStageSpokenRef.current !== currentStageIndex) {
        lastStageSpokenRef.current = currentStageIndex;
        soundEngine.speak(currentStage.narration);
      }
    }
  }, [currentStageIndex, activeStageIndex, speechEnabled, isPlaying, currentStage]);

  // Main animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      soundEngine.stopSpeech();
      return;
    }

    lastTimeRef.current = performance.now();

    const loop = (now: number) => {
      const deltaSec = ((now - lastTimeRef.current) / 1000) * playbackSpeed;
      lastTimeRef.current = now;

      setCurrentTime((prev) => {
        const next = prev + deltaSec;
        if (next >= TOTAL_VIDEO_DURATION) {
          setIsPlaying(false);
          soundEngine.playChime();
          return TOTAL_VIDEO_DURATION;
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const togglePlay = () => {
    if (currentTime >= TOTAL_VIDEO_DURATION) {
      setCurrentTime(0);
      lastStageSpokenRef.current = -1;
    }
    const nextPlay = !isPlaying;
    setIsPlaying(nextPlay);
    soundEngine.playTap();

    if (nextPlay && speechEnabled) {
      soundEngine.speak(currentStage.narration);
    } else {
      soundEngine.stopSpeech();
    }
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
    soundEngine.playTap();
    lastStageSpokenRef.current = -1;
    if (isPlaying && speechEnabled) {
      const targetStage =
        flowStages.find(
          (s) => newTime >= s.startTime && newTime < s.startTime + s.duration
        ) || flowStages[flowStages.length - 1];
      soundEngine.speak(targetStage.narration);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    soundEngine.playTap();
  };

  const jumpToStage = (stage: FlowStage) => {
    handleSeek(stage.startTime);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Compute camera animation zoom & pan based on current stage
  const stageElapsed = currentTime - currentStage.startTime;
  const stageProgress = Math.min(1, Math.max(0, stageElapsed / currentStage.duration));
  const isTransitioning = stageProgress < 0.15 || stageProgress > 0.9;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[1280px] mx-auto bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col select-none"
    >
      {/* Video Studio Header */}
      <div className="bg-stone-900/90 backdrop-blur-md px-6 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#8C1515] flex items-center justify-center text-white font-bold text-sm shadow-xs">
            ▶
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm">
                Axess Flow Showcase
              </span>
              <span className="bg-[#8C1515] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Full HD 60FPS
              </span>
            </div>
            <span className="text-stone-400 text-xs">
              {currentStage.stageNumber}: {currentStage.title}
            </span>
          </div>
        </div>

        {/* View Controls: Aspect Ratio & Export Button */}
        <div className="flex items-center gap-2.5">
          {/* Aspect Ratio Switcher */}
          <div className="bg-stone-800 p-1 rounded-xl flex items-center gap-1 text-xs">
            <button
              onClick={() => {
                setAspectRatio('16:9');
                soundEngine.playTap();
              }}
              className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-colors ${
                aspectRatio === '16:9'
                  ? 'bg-[#8C1515] text-white'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="16:9 Widescreen Desktop / TV"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>16:9</span>
            </button>
            <button
              onClick={() => {
                setAspectRatio('9:16');
                soundEngine.playTap();
              }}
              className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-colors ${
                aspectRatio === '9:16'
                  ? 'bg-[#8C1515] text-white'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="9:16 Mobile Vertical Reel / Story"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16</span>
            </button>
          </div>

          {/* Direct Video Exporter Modal Button */}
          <button
            onClick={onOpenExporter}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate & Export Video</span>
          </button>
        </div>
      </div>

      {/* Main Video Viewport Canvas */}
      <div
        className={`relative w-full bg-[#121110] flex items-center justify-center overflow-hidden transition-all duration-300 ${
          aspectRatio === '16:9'
            ? 'aspect-[16/9] max-h-[640px]'
            : aspectRatio === '9:16'
            ? 'aspect-[9/16] max-h-[700px]'
            : 'aspect-[4/3] max-h-[600px]'
        }`}
      >
        {/* Subtle Ambient Background Backdrop */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,#8C1515_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-stone-950/60 pointer-events-none"></div>

        {/* Cinematic Watermark & Stanford Masthead Top Left */}
        <div className="absolute top-5 left-6 z-20 flex items-center gap-3 pointer-events-none">
          <StanfordLogo variant="white" size="sm" />
          <span className="text-stone-400 text-xs font-mono hidden sm:inline">
            // Stanford Axess Mobile • {studentData.name} CS '27
          </span>
        </div>

        {/* Live Status Badge Top Right */}
        <div className="absolute top-5 right-6 z-20 flex items-center gap-2 pointer-events-none">
          <div className="bg-stone-900/80 backdrop-blur-md border border-stone-700 text-stone-200 px-3 py-1 rounded-full text-xs font-mono flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying ? 'bg-red-500 animate-pulse' : 'bg-stone-500'
              }`}
            ></span>
            <span>{isPlaying ? 'REC ● PLAYING' : 'PAUSED'}</span>
          </div>
        </div>

        {/* PROLOGUE SCENE (Time 0 to 6s) */}
        {currentStage.id === 'intro' ? (
          <div className="text-center z-10 p-6 max-w-xl space-y-4 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-[#8C1515] p-3 shadow-2xl flex items-center justify-center border-2 border-red-400">
              <StanfordLogo variant="white" size="md" />
            </div>
            <div className="space-y-1">
              <span className="text-amber-400 font-bold tracking-widest text-xs uppercase">
                UX Flow & Architecture Video
              </span>
              <h1
                className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight"
                style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
              >
                Stanford Axess Student Portal
              </h1>
              <p className="text-stone-300 text-sm">
                Core Academic Navigation Flow for{' '}
                <strong className="text-white">{studentData.name} (B.S. CS '27)</strong>
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-stone-900/80 border border-stone-700 px-4 py-2 rounded-full text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cardinal Key SSO Authentication Verified</span>
            </div>
          </div>
        ) : currentStage.id === 'outro' ? (
          /* OUTRO / EPILOGUE SCENE */
          <div className="text-center z-10 p-6 max-w-xl space-y-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-600/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">
                Journey Completed
              </span>
              <h2
                className="text-3xl font-serif font-bold text-white"
                style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
              >
                Full Architectural Synchronization
              </h2>
              <p className="text-stone-300 text-sm">
                Hub status, study list verification, live classroom wayfinding,
                and digital Stanford Card pass fully aligned.
              </p>
            </div>
            <button
              onClick={() => {
                handleSeek(0);
                setIsPlaying(true);
              }}
              className="bg-[#8C1515] hover:bg-[#620000] text-white px-5 py-2.5 rounded-full font-bold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Video Flow</span>
            </button>
          </div>
        ) : (
          /* ACTIVE STAGE PHONE DISPLAY WITH CAMERA PAN & ZOOM */
          <div
            className="z-10 transition-all duration-700 ease-out flex items-center justify-center"
            style={{
              transform: `scale(${
                aspectRatio === '9:16' ? 1.05 : currentStage.cameraFocus.zoom
              }) translate(${currentStage.cameraFocus.x}px, ${
                currentStage.cameraFocus.y
              }px)`
            }}
          >
            <PhoneMockup
              activeTab={currentStage.tabKey}
              showTapRing={true}
              tapRingPosition={
                currentStage.id === 'hub'
                  ? 'enrollment'
                  : currentStage.id === 'courses'
                  ? 'course107'
                  : currentStage.id === 'schedule'
                  ? 'wayfinding'
                  : currentStage.id === 'grades'
                  ? 'transcript'
                  : 'none'
              }
              customAvatarUrl={customAvatarUrl}
              customCampusUrl={customCampusUrl}
              isInteractive={false}
              scale={aspectRatio === '9:16' ? 0.95 : 0.88}
            />
          </div>
        )}

        {/* On-Screen Stage Card Overlay (Bottom Left) */}
        {currentStage.id !== 'intro' && currentStage.id !== 'outro' && (
          <div className="absolute bottom-6 left-6 z-20 max-w-sm bg-stone-950/85 backdrop-blur-md border border-stone-800 p-3.5 rounded-2xl text-left pointer-events-none hidden sm:block">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C1515] bg-red-950/80 px-2 py-0.5 rounded-full inline-block mb-1 border border-red-900/50">
              {currentStage.stageNumber} • {currentStage.stepName}
            </span>
            <h4 className="text-white font-bold text-sm leading-tight">
              {currentStage.title}
            </h4>
            <p className="text-stone-300 text-xs mt-1">
              {currentStage.stepDescription}
            </p>
            <div className="mt-2 text-[10px] text-amber-400 font-mono font-semibold">
              👉 {currentStage.actionCallout}
            </div>
          </div>
        )}

        {/* Dynamic Subtitles / Closed Caption Bar (Bottom Center) */}
        {showSubtitles && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-2xl px-5 py-2.5 bg-black/85 backdrop-blur-md rounded-2xl border border-stone-700/60 text-center pointer-events-none shadow-lg">
            <span className="text-xs sm:text-sm text-stone-100 font-medium tracking-wide">
              {currentStage.narration}
            </span>
          </div>
        )}
      </div>

      {/* Timeline Scrubber & Chapter Markers */}
      <div className="bg-stone-900 px-6 pt-3 pb-2 border-t border-stone-800 flex flex-col gap-2">
        {/* Scrubber Bar */}
        <div className="relative group cursor-pointer">
          <input
            type="range"
            min={0}
            max={TOTAL_VIDEO_DURATION}
            step={0.1}
            value={currentTime}
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
            className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#8C1515]"
          />

          {/* Chapter Tick Indicators */}
          <div className="absolute top-0 left-0 right-0 h-2 pointer-events-none flex justify-between px-0.5">
            {flowStages.map((stage) => {
              const leftPercent = (stage.startTime / TOTAL_VIDEO_DURATION) * 100;
              return (
                <div
                  key={stage.id}
                  style={{ left: `${leftPercent}%` }}
                  className="absolute top-0 w-1 h-2 bg-stone-500/80 rounded-full"
                  title={`${stage.stageNumber}: ${stage.title}`}
                ></div>
              );
            })}
          </div>
        </div>

        {/* Chapter Quick Jump Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px]">
          {flowStages.map((stage, idx) => {
            const isActive = currentStage.id === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => jumpToStage(stage)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#8C1515] text-white font-bold shadow-xs'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-700'
                }`}
              >
                {stage.stageNumber}: {stage.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Playback Control Bar */}
      <div className="bg-stone-900 px-6 py-3 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Play/Pause, Replay, Timecode */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-[#8C1515] hover:bg-[#620000] text-white flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={() => handleSeek(0)}
            className="p-2 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Restart from beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="text-stone-300 font-mono text-xs tracking-wider">
            <span>{formatTime(currentTime)}</span>
            <span className="text-stone-500"> / </span>
            <span className="text-stone-500">
              {formatTime(TOTAL_VIDEO_DURATION)}
            </span>
          </div>
        </div>

        {/* Center: Stage Indicator */}
        <div className="hidden md:flex items-center gap-2 bg-stone-800/80 px-3.5 py-1.5 rounded-full border border-stone-700/60 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-stone-400">Current Scene:</span>
          <strong className="text-white">
            {currentStage.stageNumber} — {currentStage.title}
          </strong>
        </div>

        {/* Right: Audio narration, Subtitles, Speed, Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Subtitles toggle */}
          <button
            onClick={() => {
              setShowSubtitles(!showSubtitles);
              soundEngine.playTap();
            }}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              showSubtitles
                ? 'text-amber-400 bg-amber-400/10'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Toggle Subtitles / Captions"
          >
            <Subtitles className="w-4 h-4" />
          </button>

          {/* Voice Speech Narration toggle */}
          <button
            onClick={() => {
              const next = !speechEnabled;
              setSpeechEnabled(next);
              if (!next) soundEngine.stopSpeech();
              soundEngine.playTap();
            }}
            className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              speechEnabled
                ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-500/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Toggle AI Speech Narration"
          >
            <span>🎙 Voiceover</span>
          </button>

          {/* Mute button */}
          <button
            onClick={toggleMute}
            className="p-2 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Speed Selector */}
          <div className="relative">
            <select
              value={playbackSpeed}
              onChange={(e) => {
                setPlaybackSpeed(parseFloat(e.target.value));
                soundEngine.playTap();
              }}
              className="bg-stone-800 text-stone-200 text-xs font-semibold rounded-lg px-2 py-1 border border-stone-700 cursor-pointer focus:outline-none"
            >
              <option value="0.75">0.75x</option>
              <option value="1">1.0x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2.0x</option>
            </select>
          </div>

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
