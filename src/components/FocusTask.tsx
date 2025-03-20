import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../lib/store';
import { Check, Plus } from 'lucide-react';

export function FocusTask() {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState('');
  const { focusTask, setFocusTask } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setFocusTask({ text: newTask.trim(), completed: false });
      setNewTask('');
      setIsEditing(false);
    }
  };

  const toggleComplete = () => {
    if (focusTask) {
      setFocusTask({ ...focusTask, completed: !focusTask.completed });
    }
  };

  if (!focusTask && !isEditing) {
    return (
      <motion.button
        onClick={() => setIsEditing(true)}
        className="w-full text-center p-8 rounded-lg backdrop-blur-sm bg-background/30 
                   hover:bg-background/40 transition-all group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="w-8 h-8 mx-auto mb-4 opacity-60 group-hover:opacity-100" />
        <p className="text-xl text-white/80 group-hover:text-white">
          What's your main focus for today?
        </p>
      </motion.button>
    );
  }

  if (isEditing) {
    return (
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full"
      >
        <input
          autoFocus
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="What's your main focus for today?"
          className="w-full bg-background/30 backdrop-blur-sm text-3xl p-6 rounded-lg
                     placeholder:text-white/50 focus:outline-none focus:ring-2 
                     focus:ring-primary"
        />
      </motion.form>
    );
  }

  return (
    <motion.div
      layout
      className="text-center space-y-4"
    >
      <h2 className="text-2xl text-white/80">TODAY'S FOCUS</h2>
      <motion.div 
        className="flex items-center justify-center space-x-4 text-4xl"
        whileHover={{ scale: 1.02 }}
      >
        <button
          onClick={toggleComplete}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                     ${focusTask.completed ? 'bg-primary border-primary' : 'border-white/30'}`}
        >
          {focusTask.completed && <Check className="w-6 h-6" />}
        </button>
        <span className={focusTask.completed ? 'line-through text-white/50' : ''}>
          {focusTask.text}
        </span>
      </motion.div>
    </motion.div>
  );
}