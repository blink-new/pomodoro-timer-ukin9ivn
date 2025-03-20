import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer } from './components/Timer';
import { TaskList } from './components/TaskList';
import { Statistics } from './components/Statistics';
import { Settings } from './components/Settings';
import { useTimer } from './hooks/useTimer';
import { useTheme } from './hooks/useTheme';
import { useStatistics } from './hooks/useStatistics';
import { useTasks } from './hooks/useTasks';
import { useSound } from './hooks/useSound';
import { TimerPhase, Theme, TimerSettings } from './types';
import { Bell, Settings as SettingsIcon, List, BarChart2, Music } from 'lucide-react';

const defaultSettings: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: true,
  autoStartPomodoros: false,
  soundEnabled: true,
  notificationsEnabled: true,
  theme: 'light' as Theme
};

export default function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [settings, setSettings] = useState<TimerSettings>(defaultSettings);

  const { theme, toggleTheme } = useTheme();
  const { 
    time, 
    phase, 
    isRunning, 
    progress, 
    start, 
    pause, 
    reset, 
    skip 
  } = useTimer(settings);
  const { playSound } = useSound(settings.soundEnabled);
  const { statistics, updateStatistics } = useStatistics();
  const { tasks, addTask, completeTask, removeTask } = useTasks();

  useEffect(() => {
    const savedSettings = localStorage.getItem('timerSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timerSettings', JSON.stringify(settings));
  }, [settings]);

  const handlePhaseComplete = () => {
    playSound('complete');
    if (settings.notificationsEnabled) {
      new Notification('Timer Complete!', {
        body: `${phase === 'work' ? 'Take a break!' : 'Time to focus!'}`
      });
    }
    updateStatistics(phase);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Pomodoro Timer
          </h1>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTasks(!showTasks)}
              className="btn-icon"
            >
              <List />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowStats(!showStats)}
              className="btn-icon"
            >
              <BarChart2 />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(!showSettings)}
              className="btn-icon"
            >
              <SettingsIcon />
            </motion.button>
          </div>
        </header>

        <main className="flex flex-col items-center gap-8">
          <Timer
            time={time}
            phase={phase}
            isRunning={isRunning}
            progress={progress}
            onStart={start}
            onPause={pause}
            onReset={reset}
            onSkip={skip}
            onComplete={handlePhaseComplete}
          />

          <AnimatePresence>
            {showTasks && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full max-w-2xl"
              >
                <TaskList
                  tasks={tasks}
                  onAdd={addTask}
                  onComplete={completeTask}
                  onRemove={removeTask}
                />
              </motion.div>
            )}

            {showStats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full max-w-2xl"
              >
                <Statistics statistics={statistics} />
              </motion.div>
            )}

            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full max-w-2xl"
              >
                <Settings
                  settings={settings}
                  onUpdate={setSettings}
                  onClose={() => setShowSettings(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}