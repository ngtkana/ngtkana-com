'use client';

import { useEffect, useRef, useCallback } from 'react';
import { AudioEngine, KEY_MAPPINGS, getAllNotes } from '../utils/audioUtils';
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

    // Keyboard event handlers
    useEffect(() => {
        const handleKeyDown = async (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            const note = KEY_MAPPINGS[key];

            if (note && !event.repeat) {
                event.preventDefault();
                await playNote(note);
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            const note = KEY_MAPPINGS[key];

            if (note) {
                event.preventDefault();
                stopNote(note);
            }
        };

        // Handle window blur to stop all notes
        const handleBlur = () => {
            if (audioEngineRef.current) {
                audioEngineRef.current.stopAllNotes();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleBlur);
        };
    }, [playNote, stopNote]);

    const notes = getAllNotes();
    const whiteKeys = notes.filter(note => !note.includes('#'));
    const blackKeys = notes.filter(note => note.includes('#'));

    // Get keyboard key for a note
    const getKeyboardKey = (note: string): string | undefined => {
        return Object.keys(KEY_MAPPINGS).find(key => KEY_MAPPINGS[key] === note);
    };

    // Calculate black key positions
    const getBlackKeyPosition = (note: string): number => {
        const blackKeyPositions: Record<string, number> = {
            'C#4': 0.5, // Between C and D
            'D#4': 1.5, // Between D and E
            'F#4': 3.5, // Between F and G
            'G#4': 4.5, // Between G and A
            'A#4': 5.5, // Between A and B
        };
        return blackKeyPositions[note] || 0;
    };

    return (
        <div className="flex flex-col items-center gap-8 p-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ピアノ
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    鍵盤をクリックするか、キーボードで演奏してください
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                    キーボード: A W S E D F T G Y H U J
                </div>
            </div>

            <div className="relative bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl shadow-2xl">
                {/* Piano container */}
                <div className="relative flex">
                    {/* White keys */}
                    {whiteKeys.map((note) => (
                        <Key
                            key={note}
                            note={note}
                            onPlay={playNote}
                            onStop={stopNote}
                            keyboardKey={getKeyboardKey(note)}
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
                                    left: `${position * 48}px`, // 48px is the width of white keys (w-12 = 48px)
                                    top: 0,
                                }}
                            >
                                <Key
                                    note={note}
                                    onPlay={playNote}
                                    onStop={stopNote}
                                    keyboardKey={getKeyboardKey(note)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400 max-w-md">
                <p>
                    Web Audio APIを使用してリアルタイムで音を生成しています。
                    初回クリック時にオーディオコンテキストが有効化されます。
                </p>
            </div>
        </div>
    );
}
