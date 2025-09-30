/**
 * Audio utilities for piano application
 */

// 12平均律の音名とセミトーン数のマッピング
const NOTE_SEMITONES: Record<string, number> = {
  'C': 0,
  'C#': 1,
  'D': 2,
  'D#': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'G': 7,
  'G#': 8,
  'A': 9,
  'A#': 10,
  'B': 11,
};

// A4 = 440Hz を基準とした周波数計算
const A4_FREQUENCY = 440;
const A4_OCTAVE = 4;
const A4_SEMITONE = 9;

/**
 * 音名とオクターブから周波数を計算
 */
const calculateFrequency = (noteName: string, octave: number): number => {
  const semitone = NOTE_SEMITONES[noteName];
  if (semitone === undefined) {
    throw new Error(`Unknown note: ${noteName}`);
  }

  // A4からの半音数を計算
  const semitonesFromA4 = (octave - A4_OCTAVE) * 12 + (semitone - A4_SEMITONE);

  // 12平均律による周波数計算: f = 440 * 2^(n/12)
  return A4_FREQUENCY * Math.pow(2, semitonesFromA4 / 12);
};

/**
 * 指定された範囲のノートを生成
 */
const generateNotes = (startOctave: number, endOctave: number): string[] => {
  const notes: string[] = [];
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  for (let octave = startOctave; octave <= endOctave; octave++) {
    for (const noteName of noteNames) {
      // C6まで（C6は含む）
      if (octave === endOctave && noteName !== 'C') {
        break;
      }
      notes.push(`${noteName}${octave.toString()}`);
    }
  }

  return notes;
};

// C3からC6までの3オクターブ + C6
const ALL_NOTES = generateNotes(3, 6);

// 動的に周波数マップを生成
const NOTE_FREQUENCIES: Record<string, number> = {};
ALL_NOTES.forEach(note => {
  const match = /^([A-G]#?)(\d+)$/.exec(note);
  if (match?.[1] && match[2]) {
    const noteName = match[1];
    const octaveStr = match[2];
    const octave = parseInt(octaveStr, 10);
    NOTE_FREQUENCIES[note] = calculateFrequency(noteName, octave);
  }
});


export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeOscillators = new Map<string, { oscillator: OscillatorNode; gain: GainNode }>();
  private sustainPedal = false;
  private sustainedNotes = new Set<string>();

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
    // If sustain pedal is pressed, mark note as sustained instead of stopping
    if (this.sustainPedal) {
      this.sustainedNotes.add(note);
      return;
    }

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
    this.sustainedNotes.delete(note);
  }

  stopAllNotes(): void {
    for (const note of this.activeOscillators.keys()) {
      this.stopNote(note);
    }
  }

  setSustainPedal(pressed: boolean): void {
    this.sustainPedal = pressed;

    // If pedal is released, stop all sustained notes
    if (!pressed) {
      for (const note of this.sustainedNotes) {
        const activeNote = this.activeOscillators.get(note);
        if (activeNote && this.audioContext) {
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
      }
      this.sustainedNotes.clear();
    }
  }

  getSustainPedal(): boolean {
    return this.sustainPedal;
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
