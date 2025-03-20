export type TimerPhase = 'work' | 'shortBreak' | 'longBreak';
export type Theme = 'light' | 'dark' | 'aurora' | 'sunset' | 'ocean';

export interface TimerSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  theme: Theme;
}

export interface Task {
  id: string;
  title: string;
  category: string;
  notes?: string;
  completed: boolean;
  pomodorosCompleted: number;
  createdAt: string;
}

export interface Statistics {
  totalFocusTime: number;
  totalBreakTime: number;
  completedPomodoros: number;
  dailyStreak: number;
  bestStreak: number;
  tasksByCategory: Record<string, number>;
}