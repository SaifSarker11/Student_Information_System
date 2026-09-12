import React, { useState, useRef } from 'react';
import { flowStages, TOTAL_VIDEO_DURATION, studentData } from '../data/flowData';
import { soundEngine } from '../utils/audioSynthesizer';
import { Download, X, Film, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface VideoExporterProps {
  isOpen: boolean;
  onClose: () => void;
  customAvatarUrl?: string;
}

export const VideoExporter: React.FC<VideoExporterProps> = ({
  isOpen,
  onClose
}) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [totalFrames, setTotalFrames] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [resolution, setResolution] = useState<'1080p' | '720p'>('1080p');
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  if (!isOpen) return null;

  const startExport = async () => {
    setIsExporting(true);
    setProgress(0);
    setVideoUrl(null);
    recordedChunksRef.current = [];

    // Resolution dimensions
    const width = orientation === 'landscape' ? (resolution === '1080p' ? 1920 : 1280) : (resolution === '1080p' ? 1080 : 720);
    const height = orientation === 'landscape' ? (resolution === '1080p' ? 1080 : 720) : (resolution === '1080p' ? 1920 : 1280);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      alert('Canvas 2D context not supported');
      setIsExporting(false);
      return;
    }

    // Set up MediaRecorder from Canvas stream
    const fps = 30;
    const stream = canvas.captureStream(fps);
    let mimeType = 'video/webm;codecs=vp9';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'video/webm';
    }

    try {
      const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: resolution === '1080p' ? 8000000 : 4000000
      });

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setIsExporting(false);
        soundEngine.playChime();
      };

      recorder.start();

      // Render frames sequentially
      // For fast and smooth generation, we render a 24-second compressed sequence (720 frames)
      const exportDuration = 24; // seconds
      const framesCount = exportDuration * fps;
      setTotalFrames(framesCount);

      for (let f = 0; f < framesCount; f++) {
        const timeSec = (f / framesCount) * TOTAL_VIDEO_DURATION;
        renderVideoFrame(ctx, width, height, timeSec, f, framesCount);
        setCurrentFrame(f + 1);
        setProgress(Math.round(((f + 1) / framesCount) * 100));

        // Yield to allow browser repaint
        if (f % 6 === 0) {
          await new Promise((r) => setTimeout(r, 10));
        }
      }

      recorder.stop();
    } catch (err) {
      console.error('Error generating video:', err);
      setIsExporting(false);
      alert('Video recording error. Please check browser codec support.');
    }
  };

  // Canvas drawing routine for each frame
  const renderVideoFrame = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    time: number,
    frame: number,
    total: number
  ) => {
    // Current stage
    const stage =
      flowStages.find(
        (s) => time >= s.startTime && time < s.startTime + s.duration
      ) || flowStages[flowStages.length - 1];

    // Background: Cardinal dark vignette
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, Math.max(w, h));
    bgGrad.addColorStop(0, '#2E2D29');
    bgGrad.addColorStop(1, '#1A1918');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle background grid
    ctx.strokeStyle = 'rgba(140, 21, 21, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Top Header Banner
    ctx.fillStyle = '#8C1515';
    ctx.fillRect(0, 0, w, 80);

    // Header Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px Georgia, serif';
    ctx.fillText('Stanford | Axess Student Portal', 40, 50);

    ctx.fillStyle = '#8FF6D0';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`● Cardinal Key Active • ${studentData.name} CS '27`, w - 340, 50);

    // Stage Title
    ctx.fillStyle = '#E9AB17';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(`${stage.stageNumber}: ${stage.title.toUpperCase()}`, 40, 130);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '22px Georgia, serif';
    ctx.fillText(stage.subtitle, 40, 165);

    // Main Content Card / Mockup Representation
    const cardW = orientation === 'landscape' ? 620 : w - 80;
    const cardH = orientation === 'landscape' ? h - 340 : h - 380;
    const cardX = (w - cardW) / 2;
    const cardY = 200;

    // Draw Mockup Screen Container
    ctx.fillStyle = '#FAF6EE';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 24);
    ctx.fill();
    ctx.strokeStyle = '#8C1515';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inside phone header
    ctx.fillStyle = '#8C1515';
    ctx.beginPath();
    ctx.roundRect(cardX + 4, cardY + 4, cardW - 8, 50, [20, 20, 0, 0]);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px Georgia, serif';
    ctx.fillText('Stanford Axess Mobile', cardX + 24, cardY + 36);

    // Render Stage-specific graphics
    if (stage.id === 'intro') {
      ctx.fillStyle = '#8C1515';
      ctx.font = 'bold 44px Georgia, serif';
      ctx.fillText('Stanford University', cardX + 60, cardY + 160);
      ctx.fillStyle = '#2E2D29';
      ctx.font = '24px sans-serif';
      ctx.fillText('Core Academic Navigation Flow', cardX + 60, cardY + 210);
      ctx.fillStyle = '#555555';
      ctx.font = '18px sans-serif';
      ctx.fillText(`Student: ${studentData.name} (B.S. Computer Science '27)`, cardX + 60, cardY + 260);
      ctx.fillText('Autumn Quarter 2024–25 • 15.0 Enrolled Units', cardX + 60, cardY + 295);
    } else if (stage.id === 'hub') {
      ctx.fillStyle = '#620000';
      ctx.beginPath();
      ctx.roundRect(cardX + 20, cardY + 70, cardW - 40, 60, 12);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(`Welcome, ${studentData.name} • Sophomore B.S. CS`, cardX + 40, cardY + 105);

      // Navigate Enrollment Button
      ctx.fillStyle = '#E9AB17';
      ctx.beginPath();
      ctx.roundRect(cardX + 20, cardY + 150, cardW - 40, 70, 14);
      ctx.fill();
      ctx.fillStyle = '#1A1918';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('📑 Navigate Enrollment', cardX + 40, cardY + 192);

      // Pulsing Tap Ring
      const pulse = Math.sin(frame * 0.2) * 8 + 24;
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cardX + cardW - 70, cardY + 185, pulse, 0, Math.PI * 2);
      ctx.stroke();

      // Stats
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(cardX + 20, cardY + 240, cardW - 40, 90, 12);
      ctx.fill();
      ctx.fillStyle = '#8C1515';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('3.88 GPA', cardX + 40, cardY + 295);
      ctx.fillStyle = '#008566';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('Honors Eligible • 48 / 180 Units', cardX + 240, cardY + 295);
    } else if (stage.id === 'courses') {
      ctx.fillStyle = '#2E2D29';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('Study List: 15.0 Units Confirmed', cardX + 30, cardY + 95);

      const courses = ['CS 107 (5.0u) • Packard EE 101', 'CS 109 (5.0u) • Gates CS B02', 'CS 111 (5.0u) • Hewlett 200'];
      courses.forEach((c, idx) => {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.roundRect(cardX + 20, cardY + 120 + idx * 75, cardW - 40, 60, 10);
        ctx.fill();
        ctx.fillStyle = '#8C1515';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(c, cardX + 40, cardY + 158 + idx * 75);
      });
    } else if (stage.id === 'schedule') {
      ctx.fillStyle = '#8C1515';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('Wednesday, October 23 — Autumn Week 6', cardX + 30, cardY + 95);

      ctx.fillStyle = '#008566';
      ctx.beginPath();
      ctx.roundRect(cardX + 20, cardY + 120, cardW - 40, 70, 12);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('● LIVE: CS 107 (10:00 - 11:30 AM)', cardX + 40, cardY + 155);
      ctx.font = '16px sans-serif';
      ctx.fillText('Packard EE 101 • Row C, Seat 12', cardX + 40, cardY + 178);

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(cardX + 20, cardY + 210, cardW - 40, 80, 12);
      ctx.fill();
      ctx.fillStyle = '#2E2D29';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('Campus Wayfinding: Gates CS & Packard EE', cardX + 40, cardY + 245);
      ctx.fillStyle = '#008566';
      ctx.font = '16px sans-serif';
      ctx.fillText('GPS Active • 3 min walk across Science Quad', cardX + 40, cardY + 275);
    } else if (stage.id === 'grades') {
      ctx.fillStyle = '#2E2D29';
      ctx.font = 'bold 22px Georgia, serif';
      ctx.fillText('Academic Standing & Transcript Record', cardX + 30, cardY + 95);

      ctx.fillStyle = '#8C1515';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText('3.92 Cum. GPA', cardX + 40, cardY + 160);

      ctx.fillStyle = '#E9AB17';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('Top 2% Cohort Rank • Dean\'s Honors', cardX + 40, cardY + 205);

      ctx.fillStyle = '#8C1515';
      ctx.beginPath();
      ctx.roundRect(cardX + 20, cardY + 230, cardW - 40, 65, 12);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('📥 Download Official eTranscript (SHA-256 Valid)', cardX + 40, cardY + 270);
    } else if (stage.id === 'profile') {
      ctx.fillStyle = '#8C1515';
      ctx.beginPath();
      ctx.roundRect(cardX + 20, cardY + 75, cardW - 40, 150, 16);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px Georgia, serif';
      ctx.fillText('STANFORD CARD ID • NFC ACTIVE', cardX + 40, cardY + 115);
      ctx.font = '20px sans-serif';
      ctx.fillText(`${studentData.name} • Undergraduate CS Pass`, cardX + 40, cardY + 150);
      ctx.font = '16px monospace';
      ctx.fillText('BARCODE: 9823 0042 1178 001', cardX + 40, cardY + 185);

      ctx.fillStyle = '#008566';
      ctx.beginPath();
      ctx.roundRect(cardX + 20, cardY + 245, cardW - 40, 65, 12);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('Stanford ePay: $0.00 Balance Due (Paid in Full)', cardX + 40, cardY + 285);
    } else {
      ctx.fillStyle = '#008566';
      ctx.font = 'bold 36px Georgia, serif';
      ctx.fillText('Architecture Flow Completed', cardX + 40, cardY + 160);
      ctx.fillStyle = '#2E2D29';
      ctx.font = '20px sans-serif';
      ctx.fillText('All 5 Stages Synchronized with Stanford Registrar', cardX + 40, cardY + 210);
    }

    // Subtitle Narration Bar at Bottom
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, h - 110, w, 110);

    ctx.fillStyle = '#E9AB17';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`${stage.stageNumber} • ${stage.stepName}`, 40, h - 75);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '19px sans-serif';
    ctx.fillText(stage.narration, 40, h - 45);

    // Progress bar line at bottom
    ctx.fillStyle = '#8C1515';
    ctx.fillRect(0, h - 6, (frame / total) * w, 6);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-xl p-6 shadow-2xl text-white space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8C1515] flex items-center justify-center text-white">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                Export Flow Walkthrough Video
              </h3>
              <p className="text-xs text-stone-400">
                Render and download high-resolution video (.webm / .mp4 compatible)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isExporting}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Options */}
        {!isExporting && !videoUrl && (
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Aspect Ratio & Orientation
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrientation('landscape')}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                    orientation === 'landscape'
                      ? 'border-[#8C1515] bg-red-950/40 text-white'
                      : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:bg-stone-800'
                  }`}
                >
                  <span className="font-bold text-xs">16:9 Landscape Widescreen</span>
                  <span className="text-[11px] text-stone-400">
                    Perfect for presentations, desktop & YouTube
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrientation('portrait')}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                    orientation === 'portrait'
                      ? 'border-[#8C1515] bg-red-950/40 text-white'
                      : 'border-stone-800 bg-stone-800/60 text-stone-400 hover:bg-stone-800'
                  }`}
                >
                  <span className="font-bold text-xs">9:16 Vertical Mobile Reel</span>
                  <span className="text-[11px] text-stone-400">
                    Ideal for TikTok, Instagram Reels & Shorts
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Resolution Quality
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setResolution('1080p')}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs ${
                    resolution === '1080p'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                      : 'border-stone-800 bg-stone-800/60 text-stone-400'
                  }`}
                >
                  1080p Full HD (60 FPS)
                </button>
                <button
                  type="button"
                  onClick={() => setResolution('720p')}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs ${
                    resolution === '720p'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                      : 'border-stone-800 bg-stone-800/60 text-stone-400'
                  }`}
                >
                  720p Standard HD (Fast render)
                </button>
              </div>
            </div>

            <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700/60 text-xs text-stone-300 space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Includes all 5 Stanford Axess stages:
              </div>
              <p className="text-[11px] text-stone-400 pl-5">
                Hub & Enrollment ➔ Courses & Prerequisites ➔ Weekly Timetable ➔
                Academic Standing ➔ Profile ID Pass.
              </p>
            </div>
          </div>
        )}

        {/* Live Rendering Progress State */}
        {isExporting && (
          <div className="py-6 space-y-4 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-950/80 border-2 border-[#8C1515] flex items-center justify-center animate-spin">
              <Loader2 className="w-7 h-7 text-[#8C1515]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Generating Video Frames... {progress}%
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Rendering Frame {currentFrame} of {totalFrames} (HTML5 Canvas +
                MediaStream Recorder)
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-stone-800 rounded-full h-3 overflow-hidden p-0.5 border border-stone-700">
              <div
                className="bg-gradient-to-r from-[#8C1515] to-amber-500 h-full rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Video Rendered / Download State */}
        {videoUrl && (
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-stone-700 bg-black aspect-video max-h-56">
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              ></video>
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl flex items-center gap-3 text-xs text-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Video generated successfully! You can preview it above or save it
                directly to your computer.
              </span>
            </div>

            <a
              href={videoUrl}
              download={`stanford-axess-flow-${orientation}-${resolution}.webm`}
              className="w-full bg-[#8C1515] hover:bg-[#620000] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Stanford Axess Video (.webm)</span>
            </a>
          </div>
        )}

        {/* Footer Actions */}
        {!isExporting && !videoUrl && (
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={startExport}
              className="bg-[#8C1515] hover:bg-[#620000] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Film className="w-4 h-4" />
              <span>Start Video Generation</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
