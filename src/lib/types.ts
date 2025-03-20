export type TimerPhase = 'work' | 'shortBreak' | 'longBreak';

export type TimerPreset = {
  work: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
};

export type Task = {
  id: string;
  title: string;
  notes?: string;
  completed: boolean;
  createdAt: number;
};

export type TimerStats = {
  completedSessions: number;
  totalFocusTime: number;
  dailyStreak: number;
  lastCompleted: number;
};