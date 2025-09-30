/**
 * Audio utilities for piano application
 */

// Piano note frequencies (12-tone equal temperament)
// A4 = 440Hz as reference
const NOTE_FREQUENCIES: Record<string, number> = {
  'C4': 261.63,
  'C#4': 277.18,
  'D4': 293.66,
  'D#4': 311.13,
  'E4': 329.63,
  'F4': 349.23,
  'F#4': 369.99,
  'G4': 392.00,
  'G#4': 415.30,
  'A4': 440.00,
  'A#4': 466.16,
  'B4': 493.88,
};

// Key mappings for keyboard input
export const KEY_MAPPINGS: Record<string, string> = {
  'a': 'C4',
  'w': 'C#4',
  's': 'D4',
  'e': 'D#4',
  'd': 'E4',
  'f': 'F4',
  't': 'F#4',
  'g': 'G4',
  'y': 'G#4',
  'h': 'A4',
  'u': 'A#4',
  'j': 'B4',
};

export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeOscillators = new Map<string, { oscillator: OscillatorNode; gain: GainNode }>();

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio(): void {
    try {
      // Use AudioContext (modern browsers support this)
      this.audioContext = new AudioContext();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      this.masterGain.connect(this.audioContext.destination);
    } catch (error) {
      // Fallback for older browsers
      try {
        const webkitAudioContext = (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioContext = new webkitAudioContext();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        this.masterGain.connect(this.audioContext.destination);
      } catch (fallbackError) {
        console.error('Failed to initialize audio context:', error, fallbackError);
      }
    }
  }

  async resumeAudioContext(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  playNote(note: string): void {
    if (!this.audioContext || !this.masterGain) {
      console.warn('Audio context not initialized');
      return;
    }

    const frequency = NOTE_FREQUENCIES[note];
    if (!frequency) {
      console.warn(`Unknown note: ${note}`);
      return;
    }

    // Stop existing note if playing
    this.stopNote(note);

    // Create oscillator and gain nodes
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    // Configure oscillator
    oscillator.type = 'triangle'; // Triangle wave for a softer piano-like sound
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    // Configure ADSR envelope
    const now = this.audioContext.currentTime;
    const attackTime = 0.01;
    const decayTime = 0.1;
    const sustainLevel = 0.7;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + attackTime);
    gainNode.gain.exponentialRampToValueAtTime(sustainLevel, now + attackTime + decayTime);

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Start oscillator
    oscillator.start(now);

    // Store active oscillator
    this.activeOscillators.set(note, { oscillator, gain: gainNode });
  }

  stopNote(note: string): void {
    const activeNote = this.activeOscillators.get(note);
    if (!activeNote || !this.audioContext) return;

    const { oscillator, gain } = activeNote;
    const now = this.audioContext.currentTime;
    const releaseTime = 0.3;

    // Apply release envelope
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + releaseTime);

    // Stop oscillator after release
    oscillator.stop(now + releaseTime);

    // Clean up
    this.activeOscillators.delete(note);
  }

  stopAllNotes(): void {
    for (const note of this.activeOscillators.keys()) {
      this.stopNote(note);
    }
  }

  setMasterVolume(volume: number): void {
    if (this.masterGain && this.audioContext) {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      this.masterGain.gain.setValueAtTime(clampedVolume, this.audioContext.currentTime);
    }
  }

  destroy(): void {
    this.stopAllNotes();
    if (this.audioContext) {
      void this.audioContext.close();
      this.audioContext = null;
    }
  }
}

export const getNoteFrequency = (note: string): number => {
  return NOTE_FREQUENCIES[note] ?? 0;
};

export const getAllNotes = (): string[] => {
  return Object.keys(NOTE_FREQUENCIES);
};
