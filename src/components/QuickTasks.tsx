import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStore } from '../lib/store';
import { Plus, GripVertical, X, Check } from 'lucide-react';

interface SortableTaskItemProps {
  id: string;
  text: string;
  completed: boolean;
}

function SortableTaskItem({ id, text, completed }: SortableTaskItemProps) {
  const { toggleQuickTask, removeQuickTask } = useStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="group flex items-center space-x-3 bg-background/30 backdrop-blur-sm 
                 rounded-lg p-3 cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <button
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                   ${completed ? 'bg-primary border-primary' : 'border-white/30'}`}
        onClick={() => toggleQuickTask(id)}
      >
        {completed && <Check className="w-4 h-4" />}
      </button>
      
      <span className={`flex-1 ${completed ? 'line-through text-white/50' : ''}`}>
        {text}
      </span>

      <button
        className="opacity-0 group-hover:opacity-100 hover:text-red-400"
        onClick={() => removeQuickTask(id)}
      >
        <X className="w-4 h-4" />
      </button>

      <div
        {...attributes}
        {...listeners}
        className="opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4" />
      </div>
    </motion.div>
  );
}

export function QuickTasks() {
  const [newTask, setNewTask] = useState('');
  const { quickTasks, addQuickTask, reorderQuickTasks } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addQuickTask(newTask.trim());
      setNewTask('');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = quickTasks.findIndex(task => task.id === active.id);
      const newIndex = quickTasks.findIndex(task => task.id === over.id);
      
      const newTasks = [...quickTasks];
      const [movedTask] = newTasks.splice(oldIndex, 1);
      newTasks.splice(newIndex, 0, movedTask);
      
      reorderQuickTasks(newTasks);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a quick task..."
          className="w-full bg-background/30 backdrop-blur-sm p-3 pr-12 rounded-lg
                     placeholder:text-white/50 focus:outline-none focus:ring-2 
                     focus:ring-primary"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2
                     hover:text-primary transition-colors"
          disabled={!newTask.trim()}
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={quickTasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence>
            <div className="space-y-2">
              {quickTasks.map((task) => (
                <SortableTaskItem
                  key={task.id}
                  id={task.id}
                  text={task.text}
                  completed={task.completed}
                />
              ))}
            </div>
          </AnimatePresence>
        </SortableContext>
      </DndContext>
    </div>
  );
}