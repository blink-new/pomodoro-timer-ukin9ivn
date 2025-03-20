import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Timer, Plus, Check, X, Play, Pause } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'inProgress' | 'done';
  timeSpent: number;
  isTimerRunning: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.isTimerRunning
            ? { ...task, timeSpent: task.timeSpent + 1 }
            : task
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: 'todo',
      timeSpent: 0,
      isTimerRunning: false,
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
  };

  const toggleTimer = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, isTimerRunning: !task.isTimerRunning }
          : task
      )
    );
  };

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const columns: { title: string; status: Task['status'] }[] = [
    { title: 'To Do', status: 'todo' },
    { title: 'In Progress', status: 'inProgress' },
    { title: 'Done', status: 'done' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Task Board
        </h1>

        <form onSubmit={addTask} className="mb-8">
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center gap-2"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div
              key={column.status}
              className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-slate-700"
            >
              <h2 className="text-xl font-semibold mb-4 text-center text-slate-200">
                {column.title}
              </h2>
              <div className="space-y-4">
                {tasks
                  .filter((task) => task.status === column.status)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border border-slate-600 hover:border-purple-500/50 transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-slate-200 flex-1">
                          {task.title}
                        </h3>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-slate-400 hover:text-red-400 transition-colors duration-200"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Timer size={16} />
                          <span className="font-mono">
                            {formatTime(task.timeSpent)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleTimer(task.id)}
                            className={`p-1.5 rounded-full transition-all duration-200 ${
                              task.isTimerRunning
                                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            }`}
                          >
                            {task.isTimerRunning ? (
                              <Pause size={16} />
                            ) : (
                              <Play size={16} />
                            )}
                          </button>

                          {task.status !== 'done' && (
                            <button
                              onClick={() =>
                                moveTask(
                                  task.id,
                                  task.status === 'todo'
                                    ? 'inProgress'
                                    : 'done'
                                )
                              }
                              className="p-1.5 rounded-full bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all duration-200"
                            >
                              <Check size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;