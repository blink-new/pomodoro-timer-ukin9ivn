import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Check } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onAdd: (task: Omit<Task, 'id' | 'completed' | 'pomodorosCompleted' | 'createdAt'>) => void;
  onComplete: (id: string) => void;
  onRemove: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onAdd,
  onComplete,
  onRemove,
}) => {
  const [newTask, setNewTask] = useState('');
  const [newCategory, setNewCategory] = useState('work');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAdd({
        title: newTask,
        category: newCategory,
      });
      setNewTask('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tasks</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 input-primary"
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="input-secondary"
        >
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="personal">Personal</option>
        </select>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn-primary"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </form>

      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex items-center gap-2 p-3 rounded-lg mb-2 
              ${task.completed ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}
              border border-gray-200 dark:border-gray-600`}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onComplete(task.id)}
              className={`p-1 rounded-full 
                ${task.completed ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'}`}
            >
              <Check className={`w-4 h-4 ${task.completed ? 'text-white' : 'text-transparent'}`} />
            </motion.button>

            <div className="flex-1">
              <p className={`text-gray-900 dark:text-white ${task.completed ? 'line-through opacity-50' : ''}`}>
                {task.title}
              </p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {task.category} • {task.pomodorosCompleted} pomodoros
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemove(task.id)}
              className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};