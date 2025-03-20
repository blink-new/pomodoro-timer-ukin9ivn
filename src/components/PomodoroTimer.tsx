import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Settings, SkipForward, Play, Pause, RefreshCw } from 'lucide-react';
import { TimerPhase, TimerSettings, TimerStats, Task } from '../types/timer';

const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: true,
  autoStartPomodoros: true,
  longBreakInterval: 4,
  soundEnabled: true,
};

export const PomodoroTimer: React.FC = () => {
  const [phase, setPhase] = useState<TimerPhase>('work');
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [settings, setSettings] = useState<TimerSettings>(() => {
    const saved = localStorage.getItem('pomodoroSettings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  const [stats, setStats] = useState<TimerStats>(() => {
    const saved = localStorage.getItem('pomodoroStats');
    return saved ? JSON.parse(saved) : {
      completedPomodoros: 0,
      completedToday: 0,
      currentStreak: 0,
      bestStreak: 0,
      totalMinutesFocused: 0,
    };
  });
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Calculate progress percentage
  const progress = useCallback(() => {
    const total = phase === 'work' 
      ? settings.workDuration * 60
      : phase === 'shortBreak' 
        ? settings.shortBreakDuration * 60
        : settings.longBreakDuration * 60;
    return ((total - timeLeft) / total) * 100;
  }, [phase, timeLeft, settings]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handlePhaseComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Save settings and stats to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    localStorage.setItem('pomodoroStats', JSON.stringify(stats));
  }, [settings, stats]);

  const handlePhaseComplete = () => {
    const audio = new Audio('/notification.mp3');
    if (settings.soundEnabled) {
      audio.play();
    }

    if (phase === 'work') {
      setStats(prev => ({
        ...prev,
        completedPomodoros: prev.completedPomodoros + 1,
        completedToday: prev.completedToday + 1,
        totalMinutesFocused: prev.totalMinutesFocused + settings.workDuration,
      }));

      if (stats.completedPomodoros % settings.longBreakInterval === 0) {
        setPhase('longBreak');
        setTimeLeft(settings.longBreakDuration * 60);
      } else {
        setPhase('shortBreak');
        setTimeLeft(settings.shortBreakDuration * 60);
      }
    } else {
      setPhase('work');
      setTimeLeft(settings.workDuration * 60);
    }

    setIsRunning(settings.autoStartPomodoros);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'work': return 'rgb(248 113 113)';
      case 'shortBreak': return 'rgb(74 222 128)';
      case 'longBreak': return 'rgb(96 165 250)';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Timer Display */}
          <div className="relative aspect-square mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-200 dark:text-gray-700"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke={getPhaseColor()}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress()) / 100}
                initial={false}
                animate={{ strokeDashoffset: 283 - (283 * progress()) / 100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                className="text-6xl font-bold text-gray-900 dark:text-white"
                key={timeLeft}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {formatTime(timeLeft)}
              </motion.span>
              <motion.span 
                className="text-lg text-gray-600 dark:text-gray-300 capitalize mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {phase.replace(/([A-Z])/g, ' $1').trim()}
              </motion.span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={() => {
                setTimeLeft(phase === 'work' 
                  ? settings.workDuration * 60 
                  : phase === 'shortBreak' 
                    ? settings.shortBreakDuration * 60 
                    : settings.longBreakDuration * 60
                );
                setIsRunning(false);
              }}
            >
              <RefreshCw size={24} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={() => handlePhaseComplete()}
            >
              <SkipForward size={24} />
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Today</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.completedToday}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Streak</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.currentStreak}
              </div>
            </div>
          </div>

          {/* Task Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="What are you working on?"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentTask?.title || ''}
              onChange={(e) => setCurrentTask(prev => ({
                id: prev?.id || Date.now().toString(),
                title: e.target.value,
                completedPomodoros: prev?.completedPomodoros || 0,
                createdAt: prev?.createdAt || new Date(),
              }))}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};