import { create } from 'zustand';
import { Task } from '../types/task';

interface TaskState {
  tasks: Task[];
  addTask: (title: string) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTimer: (id: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  
  addTask: (title) => set((state) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: 'todo',
      timeSpent: 0,
      isTimerRunning: false,
      createdAt: Date.now(),
    };
    const newTasks = [...state.tasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),

  updateTask: (updatedTask) => set((state) => {
    const newTasks = state.tasks.map((task) => 
      task.id === updatedTask.id ? updatedTask : task
    );
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),

  deleteTask: (id) => set((state) => {
    const newTasks = state.tasks.filter((task) => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),

  toggleTimer: (id) => set((state) => {
    const newTasks = state.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isTimerRunning: !task.isTimerRunning };
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),
}));