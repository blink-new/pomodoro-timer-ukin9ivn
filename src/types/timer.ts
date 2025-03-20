export type TimerPhase = 'work' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
  soundEnabled: boolean;
}

export interface TimerStats {
  completedPomodoros: number;
  completedToday: number;
  currentStreak: number;
  bestStreak: number;
  totalMinutesFocused: number;
}

export interface Task {
  id: string;
  title: string;
  completedPomodoros: number;
  createdAt: Date;
}