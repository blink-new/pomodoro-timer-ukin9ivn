import { useState, useEffect, useCallback } from 'react';
import { TimerPhase, TimerPreset, TimerStats } from '../lib/types';
import { DEFAULT_PRESET, STORAGE_KEYS } from '../lib/constants';

export function useTimer() {
  const [phase, setPhase] = useState<TimerPhase>('work');
  const [timeLeft, setTimeLeft] = useState(DEFAULT_PRESET.work);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState<TimerStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : {
      completedSessions: 0,
      totalFocusTime: 0,
      dailyStreak: 0,
      lastCompleted: Date.now(),
    };
  });

  const [preset] = useState<TimerPreset>(DEFAULT_PRESET);
  const [sessionCount, setSessionCount] = useState(0);

  const reset = useCallback(() => {
    setTimeLeft(preset[phase]);
    setIsRunning(false);
  }, [phase, preset]);

  const toggle = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const skipPhase = useCallback(() => {
    if (phase === 'work') {
      setPhase(sessionCount + 1 >= preset.longBreakInterval ? 'longBreak' : 'shortBreak');
    } else {
      setPhase('work');
      if (phase === 'longBreak') {
        setSessionCount(0);
      }
    }
  }, [phase, sessionCount, preset.longBreakInterval]);

  useEffect(() => {
    let interval: number;
    
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (phase === 'work') {
        setStats(prev => ({
          ...prev,
          completedSessions: prev.completedSessions + 1,
          totalFocusTime: prev.totalFocusTime + preset.work,
        }));
        setSessionCount(prev => prev + 1);
      }
      skipPhase();
      new Audio('/notification.mp3').play().catch(() => {});
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Timer Complete!', {
          body: `${phase === 'work' ? 'Take a break!' : 'Back to work!'}`,
        });
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, phase, skipPhase, preset.work]);

  useEffect(() => {
    setTimeLeft(preset[phase]);
  }, [phase, preset]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }, [stats]);

  return {
    phase,
    timeLeft,
    isRunning,
    stats,
    sessionCount,
    actions: {
      toggle,
      reset,
      skipPhase,
    },
  };
}