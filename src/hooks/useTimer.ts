import { useState, useEffect, useCallback } from 'react';
import { TimerPhase, TimerSettings } from '../types';

export const useTimer = (settings: TimerSettings) => {
  const [phase, setPhase] = useState<TimerPhase>('work');
  const [time, setTime] = useState(settings.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  const getInitialTime = useCallback((phase: TimerPhase) => {
    switch (phase) {
      case 'work':
        return settings.workDuration * 60;
      case 'shortBreak':
        return settings.shortBreakDuration * 60;
      case 'longBreak':
        return settings.longBreakDuration * 60;
    }
  }, [settings]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      if (phase === 'work') {
        setPomodorosCompleted((prev) => prev + 1);
        const nextPhase = pomodorosCompleted % 4 === 3 ? 'longBreak' : 'shortBreak';
        setPhase(nextPhase);
        setTime(getInitialTime(nextPhase));
        if (settings.autoStartBreaks) {
          setIsRunning(true);
        }
      } else {
        setPhase('work');
        setTime(getInitialTime('work'));
        if (settings.autoStartPomodoros) {
          setIsRunning(true);
        }
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, time, phase, settings, pomodorosCompleted, getInitialTime]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(getInitialTime(phase));
  };
  const skip = () => {
    setIsRunning(false);
    if (phase === 'work') {
      const nextPhase = pomodorosCompleted % 4 === 3 ? 'longBreak' : 'shortBreak';
      setPhase(nextPhase);
      setTime(getInitialTime(nextPhase));
    } else {
      setPhase('work');
      setTime(getInitialTime('work'));
    }
  };

  const progress = 1 - time / getInitialTime(phase);

  return {
    time,
    phase,
    isRunning,
    progress,
    start,
    pause,
    reset,
    skip,
  };
};