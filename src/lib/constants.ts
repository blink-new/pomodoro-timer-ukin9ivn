export const DEFAULT_PRESET: TimerPreset = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  longBreakInterval: 4,
};

export const STORAGE_KEYS = {
  STATS: 'pomodoro-stats',
  TASKS: 'pomodoro-tasks',
  SETTINGS: 'pomodoro-settings',
};

export const THEMES = {
  light: {
    background: 'bg-slate-50',
    surface: 'bg-white',
    primary: 'bg-indigo-600',
    text: 'text-slate-900',
    accent: 'bg-rose-500',
  },
  dark: {
    background: 'bg-slate-900',
    surface: 'bg-slate-800',
    primary: 'bg-indigo-500',
    text: 'text-white',
    accent: 'bg-rose-500',
  },
} as const;