'use client';

import { useState, useCallback } from 'react';
import { isBlackKey } from '../utils/audioUtils';

interface KeyProps {
    note: string;
    onPlay: (note: string) => void;
    onStop: (note: string) => void;
    keyboardKey?: string;
}

export default function Key({ note, onPlay, onStop, keyboardKey }: KeyProps) {
    const [isPressed, setIsPressed] = useState(false);
    const isBlack = isBlackKey(note);

    const handleMouseDown = useCallback(() => {
        if (isPressed) return;
        setIsPressed(true);
        onPlay(note);
    }, [isPressed, note, onPlay]);

    const handleMouseUp = useCallback(() => {
        if (!isPressed) return;
        setIsPressed(false);
        onStop(note);
    }, [isPressed, note, onStop]);

    const handleMouseLeave = useCallback(() => {
        if (isPressed) {
            setIsPressed(false);
            onStop(note);
        }
    }, [isPressed, note, onStop]);

    // Prevent context menu on right click
    const handleContextMenu = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
    }, []);

    const baseClasses = `
        select-none cursor-pointer transition-all duration-75 ease-out
        border border-gray-300 dark:border-gray-600
        flex items-end justify-center pb-4
        font-mono text-sm font-medium
        active:scale-95
    `;

    const whiteKeyClasses = `
        ${baseClasses}
        bg-white dark:bg-gray-100 text-gray-700 dark:text-gray-800
        hover:bg-gray-50 dark:hover:bg-gray-200
        shadow-md hover:shadow-lg
        ${isPressed ? 'bg-gray-200 dark:bg-gray-300 shadow-inner' : ''}
        w-12 h-32 rounded-b-lg
    `;

    const blackKeyClasses = `
        ${baseClasses}
        bg-gray-900 dark:bg-black text-white
        hover:bg-gray-800 dark:hover:bg-gray-900
        shadow-lg hover:shadow-xl
        ${isPressed ? 'bg-gray-700 dark:bg-gray-800 shadow-inner' : ''}
        w-8 h-20 rounded-b-md
        absolute z-10 transform -translate-x-1/2
    `;

    return (
        <button
            className={isBlack ? blackKeyClasses : whiteKeyClasses}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onContextMenu={handleContextMenu}
            aria-label={`Piano key ${note}${keyboardKey ? ` (${keyboardKey.toUpperCase()})` : ''}`}
            style={isBlack ? { left: '50%' } : undefined}
        >
            <div className="flex flex-col items-center gap-1">
                <span className={`text-xs ${isBlack ? 'text-gray-300' : 'text-gray-500'}`}>
                    {note}
                </span>
                {keyboardKey && (
                    <span className={`text-xs font-bold ${isBlack ? 'text-gray-400' : 'text-gray-600'}`}>
                        {keyboardKey.toUpperCase()}
                    </span>
                )}
            </div>
        </button>
    );
}
