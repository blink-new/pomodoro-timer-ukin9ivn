import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface FocusTask {
  text: string;
  completed: boolean;
}

interface AppState {
  focusTask: FocusTask | null;
  quickTasks: Task[];
  setFocusTask: (task: FocusTask | null) => void;
  addQuickTask: (text: string) => void;
  toggleQuickTask: (id: string) => void;
  removeQuickTask: (id: string) => void;
  reorderQuickTasks: (tasks: Task[]) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      focusTask: null,
      quickTasks: [],
      setFocusTask: (task) => set({ focusTask: task }),
      addQuickTask: (text) => set((state) => ({
        quickTasks: [...state.quickTasks, { id: Date.now().toString(), text, completed: false }]
      })),
      toggleQuickTask: (id) => set((state) => ({
        quickTasks: state.quickTasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      })),
      removeQuickTask: (id) => set((state) => ({
        quickTasks: state.quickTasks.filter(task => task.id !== id)
      })),
      reorderQuickTasks: (tasks) => set({ quickTasks: tasks }),
    }),
    {
      name: 'momentum-storage',
    }
  )
);