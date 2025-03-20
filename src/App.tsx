import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Trash2, Plus, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'inProgress' | 'done';
  timeSpent: number;
  isTimerRunning: boolean;
  createdAt: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  toggleTimer: (id: string) => void;
  updateTimeSpent: (id: string, timeSpent: number) => void;
}

const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Math.random().toString(36).substring(7),
              title,
              status: 'todo',
              timeSpent: 0,
              isTimerRunning: false,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      updateTaskStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        })),
      toggleTimer: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, isTimerRunning: !task.isTimerRunning }
              : task
          ),
        })),
      updateTimeSpent: (id, timeSpent) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, timeSpent } : task
          ),
        })),
    }),
    {
      name: 'task-store',
    }
  )
);

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const { removeTask, toggleTimer, updateTimeSpent, updateTaskStatus } = useTaskStore();

  React.useEffect(() => {
    let interval: number;
    if (task.isTimerRunning) {
      interval = window.setInterval(() => {
        updateTimeSpent(task.id, task.timeSpent + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [task.isTimerRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="task-card"
    >
      <h3 className="mb-4 text-lg font-semibold">{task.title}</h3>
      <div className="mb-4 flex items-center gap-4">
        <button
          onClick={() => toggleTimer(task.id)}
          className="timer-button"
        >
          {task.isTimerRunning ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>
        <span className="font-mono text-lg">{formatTime(task.timeSpent)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-text/60">
          {format(new Date(task.createdAt), 'MMM d, yyyy')}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => removeTask(task.id)}
            className="rounded-full p-2 text-red-500 transition-colors hover:bg-red-500/10"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          {task.status !== 'done' && (
            <button
              onClick={() => updateTaskStatus(task.id, 'done')}
              className="rounded-full p-2 text-green-500 transition-colors hover:bg-green-500/10"
            >
              <CheckCircle className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Column: React.FC<{
  title: string;
  status: Task['status'];
  tasks: Task[];
}> = ({ title, status, tasks }) => {
  return (
    <div className="column">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="space-y-4">
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function App() {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { tasks, addTask } = useTaskStore();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Task Board</h1>
          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add new task..."
              className="rounded-xl bg-surface px-4 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="add-task-button">
              <Plus className="h-5 w-5" />
              Add Task
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Column
            title="To Do"
            status="todo"
            tasks={tasks.filter((task) => task.status === 'todo')}
          />
          <Column
            title="In Progress"
            status="inProgress"
            tasks={tasks.filter((task) => task.status === 'inProgress')}
          />
          <Column
            title="Done"
            status="done"
            tasks={tasks.filter((task) => task.status === 'done')}
          />
        </div>
      </div>
    </div>
  );
}