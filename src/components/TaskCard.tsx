import { useState, useEffect } from 'react';
import { Play, Pause, Trash2 } from 'lucide-react';
import { Task } from '../types/task';
import { useTaskStore } from '../store/taskStore';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask, toggleTimer } = useTaskStore();
  const [elapsedTime, setElapsedTime] = useState(task.timeSpent);

  useEffect(() => {
    let interval: number;
    if (task.isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
        updateTask({ ...task, timeSpent: elapsedTime + 1 });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [task.isTimerRunning, elapsedTime]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTask({ ...task, status: e.target.value as Task['status'] });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 transform transition-all hover:scale-102 hover:shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{task.title}</h3>
        <select 
          value={task.status}
          onChange={handleStatusChange}
          className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded px-2 py-1 text-sm"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleTimer(task.id)}
            className={`p-2 rounded-full ${
              task.isTimerRunning 
                ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' 
                : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
            }`}
          >
            {task.isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
            {formatTime(elapsedTime)}
          </span>
        </div>
        
        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}