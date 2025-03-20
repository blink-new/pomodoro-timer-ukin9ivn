export const TIMER_CONFIG = {
  phases: {
    work: {
      label: 'Focus Time',
      defaultDuration: 25,
      color: 'rgb(248 113 113)', // red
    },
    shortBreak: {
      label: 'Short Break',
      defaultDuration: 5,
      color: 'rgb(74 222 128)', // green
    },
    longBreak: {
      label: 'Long Break',
      defaultDuration: 15,
      color: 'rgb(96 165 250)', // blue
    },
  },
  shortcuts: {
    toggleTimer: 'Space',
    resetTimer: 'r',
    skipPhase: 's',
    toggleSound: 'm',
  },
};

export const STORAGE_KEYS = {
  settings: 'pomodoroSettings',
  stats: 'pomodoroStats',
  tasks: 'pomodoroTasks',
};