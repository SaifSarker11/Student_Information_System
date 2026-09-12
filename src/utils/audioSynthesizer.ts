// Web Audio API and Speech Synthesis helper for cinematic presentation

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private speechSynth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
      if ('speechSynthesis' in window) {
        this.speechSynth = window.speechSynthesis;
      }
    }
  }

  private initContext() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.speechSynth) {
      this.speechSynth.cancel();
    }
  }

  // Play subtle high-quality tap chime
  public playTap() {
    if (this.isMuted || !this.audioCtx) return;
    this.initContext();

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(680, now);
    osc.frequency.exponentialRampToValueAtTime(1020, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Play transition sweep
  public playTransition() {
    if (this.isMuted || !this.audioCtx) return;
    this.initContext();

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.25);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Play dignified Stanford harmonic chime for milestone
  public playChime() {
    if (this.isMuted || !this.audioCtx) return;
    this.initContext();

    const now = this.audioCtx.currentTime;
    const chord = [440, 554.37, 659.25, 880]; // A Major academic chime

    chord.forEach((freq, idx) => {
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.04, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8 + idx * 0.1);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + 0.9 + idx * 0.1);
    });
  }

  // Speak narration using Web Speech API
  public speak(text: string, onEnd?: () => void) {
    if (this.isMuted || !this.speechSynth) return;

    try {
      this.speechSynth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 0.9;

      const voices = this.speechSynth.getVoices();
      // Try to find a crisp natural English voice
      const preferredVoice = voices.find(
        v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Aaron'))
      ) || voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      if (onEnd) {
        utterance.onend = onEnd;
      }

      this.currentUtterance = utterance;
      this.speechSynth.speak(utterance);
    } catch {
      // Ignore speech synth error if browser restricts autoplay
    }
  }

  public stopSpeech() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
    }
  }
}

export const soundEngine = new SoundEngine();
