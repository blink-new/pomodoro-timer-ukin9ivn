import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { TimerPhase } from '../types';

interface TimerProps {
  time: number;
  phase: TimerPhase;
  isRunning: boolean;
  progress: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

export const Timer: React.FC<TimerProps> = ({
  time,
  phase,
  isRunning,
  progress,
  onStart,
  onPause,
  onReset,
  onSkip,
  onComplete,
}) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    if (time === 0) {
      onComplete();
    }
  }, [time, onComplete]);

  const phaseColors = {
    work: 'from-rose-500 to-purple-500',
    shortBreak: 'from-green-400 to-cyan-500',
    longBreak: 'from-blue-400 to-indigo-500',
  };

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className={`w-72 h-72 rounded-full relative flex items-center justify-center
          bg-gradient-to-br ${phaseColors[phase]} shadow-lg`}
        animate={{
          scale: isRunning ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isRunning ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="144"
            cy="144"
            r="140"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200 opacity-20"
          />
          <motion.circle
            cx="144"
            cy="144"
            r="140"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray="879.2"
            strokeDashoffset={879.2 * (1 - progress)}
            className="text-white"
            animate={{ strokeDashoffset: 879.2 * (1 - progress) }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </svg>

        <div className="relative z-10 text-center">
          <motion.div
            key={`${minutes}:${seconds}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold text-white mb-2"
          >
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </motion.div>
          <motion.div
            className="text-xl text-white opacity-90 capitalize"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {phase === 'work' ? 'Focus Time' : phase === 'shortBreak' ? 'Short Break' : 'Long Break'}
          </motion.div>
        </div>
      </motion.div>

      <div className="flex gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={isRunning ? onPause : onStart}
          className="btn-primary"
        >
          {isRunning ? <Pause /> : <Play />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onReset}
          className="btn-secondary"
        >
          <RotateCcw />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onSkip}
          className="btn-secondary"
        >
          <SkipForward />
        </motion.button>
      </div>
    </div>
  );
};