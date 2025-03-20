import { TimerStats } from '../lib/types';

interface StatsProps {
  stats: TimerStats;
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
        <div className="text-sm text-slate-600 dark:text-slate-400">Sessions</div>
        <div className="text-2xl font-bold">{stats.completedSessions}</div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
        <div className="text-sm text-slate-600 dark:text-slate-400">Focus Time</div>
        <div className="text-2xl font-bold">{Math.round(stats.totalFocusTime / 60)}m</div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
        <div className="text-sm text-slate-600 dark:text-slate-400">Daily Streak</div>
        <div className="text-2xl font-bold">{stats.dailyStreak}</div>
      </div>
    </div>
  );
}