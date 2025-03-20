import { useState, useEffect } from 'react';
import { Statistics, TimerPhase } from '../types';

const defaultStats: Statistics = {
  totalFocusTime: 0,
  totalBreakTime: 0,
  completedPomodoros: 0,
  dailyStreak: 0,
  bestStreak: 0,
  tasksByCategory: {},
};

export const useStatistics = () => {
  const [statistics, setStatistics] = useState<Statistics>(() => {
    const saved = localStorage.getItem('statistics');
    return saved ? JSON.parse(saved) : defaultStats;
  });

  useEffect(() => {
    localStorage.setItem('statistics', JSON.stringify(statistics));
  }, [statistics]);

  const updateStatistics = (phase: TimerPhase) => {
    setStatistics(prev => ({
      ...prev,
      totalFocusTime: phase === 'work' ? prev.totalFocusTime + 25 : prev.totalFocusTime,
      totalBreakTime: phase !== 'work' ? prev.totalBreakTime + (phase === 'shortBreak' ? 5 : 15) : prev.totalBreakTime,
      completedPomodoros: phase === 'work' ? prev.completedPomodoros + 1 : prev.completedPomodoros,
    }));
  };

  return { statistics, updateStatistics };
};