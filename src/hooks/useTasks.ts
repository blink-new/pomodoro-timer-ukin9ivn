import { useState, useEffect } from 'react';
import { Task } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'completed' | 'pomodorosCompleted' | 'createdAt'>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      completed: false,
      pomodorosCompleted: 0,
      createdAt: new Date().toISOString(),
      ...task,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const completeTask = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return { tasks, addTask, completeTask, removeTask };
};