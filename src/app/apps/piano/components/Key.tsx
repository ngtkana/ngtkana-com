'use client';

import { useState, useCallback, useEffect } from 'react';

interface KeyProps {
  key: string; // key for react
  isBlackKey: boolean;
  label?: string;
  onPlayAction: () => void;
  onStopAction: () => void;
}

export default function Key({
  isBlackKey,
  label,
  onPlayAction,
  onStopAction,
}: KeyProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isGlobalMouseDown, setIsGlobalMouseDown] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsMouseDown(true);
    if (isHovering) {
      setIsPressed(true);
      onPlayAction();
    }
  }, [isHovering, onPlayAction]);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    if (isPressed) {
      setIsPressed(false);
      onStopAction();
    }
  }, [isPressed, onStopAction]);

  // グローバルなマウス状態を監視（キーの外からドラッグインする場合に対応）
  useEffect(() => {
    const handleGlobalMouseDown = () => {
      setIsGlobalMouseDown(true);
    };

    const handleGlobalMouseUp = () => {
      setIsGlobalMouseDown(false);
      setIsMouseDown(false);
      if (isPressed) {
        setIsPressed(false);
        onStopAction();
      }
    };

    document.addEventListener('mousedown', handleGlobalMouseDown);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleGlobalMouseDown);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isPressed, onStopAction]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    // キーの外からドラッグインした場合も音を鳴らす
    if ((isMouseDown || isGlobalMouseDown) && !isPressed) {
      setIsPressed(true);
      onPlayAction();
    }
  }, [isMouseDown, isGlobalMouseDown, isPressed, onPlayAction]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (isPressed) {
      setIsPressed(false);
      onStopAction();
    }
  }, [isPressed, onStopAction]);

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
        w-12 h-42 rounded-b-lg
    `;

  const blackKeyClasses = `
        ${baseClasses}
        bg-gray-900 dark:bg-black text-white
        hover:bg-gray-800 dark:hover:bg-gray-900
        shadow-lg hover:shadow-xl
        ${isPressed ? 'bg-gray-700 dark:bg-gray-800 shadow-inner' : ''}
        w-8 h-30 rounded-b-md
        absolute z-10 transform -translate-x-1/2
    `;

  return (
    <button
      className={isBlackKey ? blackKeyClasses : whiteKeyClasses}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu}
      style={isBlackKey ? { left: '50%' } : undefined}
    >
      <div className="flex flex-col items-center gap-1">
        <span className={`text-xs ${isBlackKey ? 'text-gray-300' : 'text-gray-500'}`}>
          {label}
        </span>
      </div>
    </button>
  );
}
