'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { AudioEngine, getAllNotes } from '../utils/audioUtils';
import Key from './Key';

export default function Piano() {
  const audioEngineRef = useRef<AudioEngine | null>(null);
  const isInitializedRef = useRef(false);
  const [sustainPedal, setSustainPedal] = useState(false);

  // Initialize audio engine
  useEffect(() => {
    if (!isInitializedRef.current) {
      audioEngineRef.current = new AudioEngine();
      isInitializedRef.current = true;
    }

    return () => {
      if (audioEngineRef.current) {
        audioEngineRef.current.destroy();
        audioEngineRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, []);

  // Handle sustain pedal (Space key)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !event.repeat) {
        event.preventDefault();
        setSustainPedal(true);
        if (audioEngineRef.current) {
          audioEngineRef.current.setSustainPedal(true);
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setSustainPedal(false);
        if (audioEngineRef.current) {
          audioEngineRef.current.setSustainPedal(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const playNote = useCallback(async (note: string) => {
    if (audioEngineRef.current) {
      await audioEngineRef.current.resumeAudioContext();
      audioEngineRef.current.playNote(note);
    }
  }, []);

  const stopNote = useCallback((note: string) => {
    if (audioEngineRef.current) {
      audioEngineRef.current.stopNote(note);
    }
  }, []);

  const notes = getAllNotes();
  const whiteKeys = notes.filter(note => !note.includes('#'));
  const blackKeys = notes.filter(note => note.includes('#'));

  // Calculate black key positions
  const getBlackKeyPosition = (note: string): number => {
    const blackKeyPositions: Record<string, number> = {
      'C#4': 1,
      'D#4': 2,
      'F#4': 4,
      'G#4': 5,
      'A#4': 6,
    };
    return blackKeyPositions[note] ?? 0;
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ピアノ
        </h1>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Sustainペダル (Space):</span>
          <div className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${sustainPedal
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}>
            {sustainPedal ? 'ON' : 'OFF'}
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl shadow-2xl">
        {/* Piano container */}
        <div className="relative flex" data-piano-container>
          {/* White keys */}
          {whiteKeys.map((note) => (
            <Key
              key={note}
              isBlackKey={false}
              label={note}
              onPlayAction={() => playNote(note)}
              onStopAction={() => { stopNote(note) }}
            />
          ))}

          {/* Black keys - positioned absolutely */}
          {blackKeys.map((note) => {
            const position = getBlackKeyPosition(note);
            return (
              <div
                key={note}
                className="absolute"
                style={{
                  left: `${String(position * 48)}px`,
                  top: 0,
                }}
              >
                <Key
                  key={note}
                  isBlackKey
                  label={note}
                  onPlayAction={() => playNote(note)}
                  onStopAction={() => { stopNote(note); }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
