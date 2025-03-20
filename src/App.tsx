import { useEffect } from 'react';
import { Timer } from './components/Timer';
import { Stats } from './components/Stats';
import { useTimer } from './hooks/useTimer';

function App() {
  const { phase, timeLeft, isRunning, stats, actions } = useTimer();

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window) {
      Notification.requestPermission();
    }

    // Set up keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        actions.toggle();
      } else if (e.code === 'KeyR') {
        actions.reset();
      } else if (e.code === 'KeyS') {
        actions.skipPhase();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [actions]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Stay focused and productive
          </p>
        </header>

        <Timer
          phase={phase}
          timeLeft={timeLeft}
          isRunning={isRunning}
          onToggle={actions.toggle}
          onReset={actions.reset}
          onSkip={actions.skipPhase}
        />

        <Stats stats={stats} />

        <footer className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>Keyboard shortcuts: Space (Start/Pause), R (Reset), S (Skip)</p>
        </footer>
      </div>
    </div>
  );
}

export default App;