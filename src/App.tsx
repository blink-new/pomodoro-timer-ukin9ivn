import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { cn, formatTime, calculateProgress } from './lib/utils';

type TimerPhase = 'work' | 'break';
type TimerStatus = 'running' | 'paused' | 'idle';

interface TimerSettings {
  workDuration: number;
  breakDuration: number;
  sound: boolean;
}

function App() {
  // Timer state
  const [settings, setSettings] = useState<TimerSettings>(() => {
    const saved = localStorage.getItem('timerSettings');
    return saved ? JSON.parse(saved) : {
      workDuration: 25 * 60,
      breakDuration: 5 * 60,
      sound: true,
    };
  });
  
  const [phase, setPhase] = useState<TimerPhase>('work');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(settings.workDuration);
  const [sessions, setSessions] = useState(0);

  // Audio setup
  const [audio] = useState(new Audio('/notification.mp3'));

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('timerSettings', JSON.stringify(settings));
  }, [settings]);

  // Timer logic
  useEffect(() => {
    let interval: number;

    if (status === 'running') {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            // Timer complete
            if (settings.sound) audio.play();
            
            if (phase === 'work') {
              setPhase('break');
              setSessions(s => s + 1);
              return settings.breakDuration;
            } else {
              setPhase('work');
              return settings.workDuration;
            }
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status, phase, settings, audio]);

  // Timer controls
  const toggleTimer = () => {
    setStatus(s => s === 'running' ? 'paused' : 'running');
  };

  const resetTimer = () => {
    setStatus('idle');
    setTimeLeft(phase === 'work' ? settings.workDuration : settings.breakDuration);
  };

  const skipPhase = () => {
    setStatus('idle');
    if (phase === 'work') {
      setPhase('break');
      setTimeLeft(settings.breakDuration);
    } else {
      setPhase('work');
      setTimeLeft(settings.workDuration);
    }
  };

  const toggleSound = () => {
    setSettings(s => ({ ...s, sound: !s.sound }));
  };

  // Calculate progress
  const progress = calculateProgress(
    timeLeft,
    phase === 'work' ? settings.workDuration : settings.breakDuration
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto space-y-8">
        {/* Timer Display */}
        <div className="relative aspect-square">
          {/* Progress Ring */}
          <svg className="w-full h-full -rotate-90 transform">
            <circle
              className="text-slate-200 dark:text-slate-800"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="45%"
              cx="50%"
              cy="50%"
            />
            <motion.circle
              className={cn(
                "stroke-current",
                phase === 'work' 
                  ? "text-indigo-500 dark:text-indigo-400"
                  : "text-emerald-500 dark:text-emerald-400"
              )}
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="45%"
              cx="50%"
              cy="50%"
              strokeDasharray="282.7433388230814"
              strokeDashoffset={282.7433388230814 * (1 - progress / 100)}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 282.7433388230814 }}
              animate={{ strokeDashoffset: 282.7433388230814 * (1 - progress / 100) }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Timer Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "text-sm font-medium mb-2",
                phase === 'work'
                  ? "text-indigo-500 dark:text-indigo-400"
                  : "text-emerald-500 dark:text-emerald-400"
              )}
            >
              {phase === 'work' ? 'FOCUS TIME' : 'BREAK TIME'}
            </motion.span>
            
            <motion.div
              key={timeLeft}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white"
            >
              {formatTime(timeLeft)}
            </motion.div>

            <span className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Session {sessions}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={resetTimer}
            className="p-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <RotateCcw size={24} />
          </button>

          <button
            onClick={toggleTimer}
            className={cn(
              "p-6 rounded-full transition-colors",
              status === 'running'
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            )}
          >
            {status === 'running' ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            onClick={skipPhase}
            className="p-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <SkipForward size={24} />
          </button>
        </div>

        {/* Settings */}
        <div className="flex justify-center">
          <button
            onClick={toggleSound}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          >
            {settings.sound ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;