'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { AudioEngine } from '../utils/audioUtils';
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

  // 各鍵盤の位置情報を定義
  interface KeyPosition {
    note: string;
    position: number; // 絶対座標（px）
    width: number; // 幅（px）
    height: number; // 高さ（px）
    isBlack: boolean;
  }

  // 鍵盤のサイズ定数
  const WHITE_KEY_WIDTH = 48;
  const WHITE_KEY_HEIGHT = 168; // h-42 = 168px
  const BLACK_KEY_WIDTH = 32;
  const BLACK_KEY_HEIGHT = 120; // h-30 = 120px

  // 3オクターブ分の鍵盤位置を生成
  const generateKeyPositions = (): KeyPosition[] => {
    const positions: KeyPosition[] = [];
    let whiteKeyIndex = 0;

    for (let octave = 3; octave <= 6; octave++) {
      const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      for (const noteName of noteNames) {
        // C6で終了
        if (octave === 6 && noteName !== 'C') {
          break;
        }

        const note = `${noteName}${String(octave)}`;
        const isBlack = noteName.includes('#');

        if (isBlack) {
          positions.push({
            note,
            position: (whiteKeyIndex - 0.5) * WHITE_KEY_WIDTH + (WHITE_KEY_WIDTH - BLACK_KEY_WIDTH) / 2,
            width: BLACK_KEY_WIDTH,
            height: BLACK_KEY_HEIGHT,
            isBlack: true,
          });
        } else {
          positions.push({
            note,
            position: whiteKeyIndex * WHITE_KEY_WIDTH,
            width: WHITE_KEY_WIDTH,
            height: WHITE_KEY_HEIGHT,
            isBlack: false,
          });
          whiteKeyIndex++;
        }
      }
    }
    console.log(positions);

    return positions;
  };

  const keyPositions = generateKeyPositions();

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
        <div
          className="relative"
          data-piano-container
          style={{
            width: `${String(keyPositions.filter(k => !k.isBlack).length * WHITE_KEY_WIDTH)}px`,
            height: `${String(WHITE_KEY_HEIGHT)}px`,
          }}
        >
          {/* All keys - positioned absolutely */}
          {keyPositions.map((keyPos) => (
            <Key
              key={keyPos.note}
              isBlackKey={keyPos.isBlack}
              label={keyPos.note}
              position={keyPos.position}
              width={keyPos.width}
              height={keyPos.height}
              onPlayAction={() => playNote(keyPos.note)}
              onStopAction={() => { stopNote(keyPos.note) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
