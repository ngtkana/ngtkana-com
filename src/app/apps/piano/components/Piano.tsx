'use client';

import { useEffect, useRef, useCallback } from 'react';
import { AudioEngine, getAllNotes } from '../utils/audioUtils';
import Key from './Key';

export default function Piano() {
  const audioEngineRef = useRef<AudioEngine | null>(null);
  const isInitializedRef = useRef(false);

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
      </div>

      <div className="relative bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl shadow-2xl">
        {/* Piano container */}
        <div className="relative flex" data-piano-container>
          {/* White keys */}
          {whiteKeys.map((note) => (
            <Key
              key={note}
              note={note}
              onPlay={playNote}
              onStop={stopNote}
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
                  left: `${position * 48}px`,
                  top: 0,
                }}
              >
                <Key
                  note={note}
                  onPlay={playNote}
                  onStop={stopNote}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
