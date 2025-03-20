import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { TimerPhase } from '../lib/types';

interface TimerProps {
  phase: TimerPhase;
  timeLeft: number;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function Timer({ phase, timeLeft, isRunning, onToggle, onReset, onSkip }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = 1 - (timeLeft / (phase === 'work' ? 25 * 60 : phase === 'shortBreak' ? 5 * 60 : 15 * 60));
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      <div className="relative w-64 h-64">
        {/* Progress Ring */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-slate-200 dark:text-slate-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="120"
            cx="128"
            cy="128"
          />
          <circle
            className={cn(
              "transition-all duration-1000 ease-in-out",
              phase === 'work' ? 'text-rose-500' : 'text-green-500'
            )}
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - progress)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="120"
            cx="128"
            cy="128"
          />
        </svg>
        
        {/* Timer Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold tabular-nums">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
          <div className="mt-2 text-lg font-medium capitalize">
            {phase === 'shortBreak' ? 'Short Break' : phase === 'longBreak' ? 'Long Break' : 'Focus Time'}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={onReset}
          className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        
        <button
          onClick={onToggle}
          className={cn(
            "px-8 py-3 rounded-full font-medium transition-all transform active:scale-95",
            isRunning
              ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
              : "bg-rose-500 text-white hover:bg-rose-600"
          )}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>

        <button
          onClick={onSkip}
          className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}