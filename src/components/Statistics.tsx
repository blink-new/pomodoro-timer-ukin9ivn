import React from 'react';
import { motion } from 'framer-motion';
import { Statistics as StatsType } from '../types';
import { Clock, Calendar, Award, PieChart } from 'lucide-react';

interface StatisticsProps {
  statistics: StatsType;
}

export const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card"
        >
          <Clock className="w-6 h-6 text-primary" />
          <div>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Focus Time</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatTime(statistics.totalFocusTime)}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stat-card"
        >
          <Calendar className="w-6 h-6 text-secondary" />
          <div>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Completed Pomodoros</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {statistics.completedPomodoros}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
        >
          <Award className="w-6 h-6 text-accent" />
          <div>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Daily Streak</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {statistics.dailyStreak} days
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card"
        >
          <PieChart className="w-6 h-6 text-purple-500" />
          <div>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Best Streak</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {statistics.bestStreak} days
            </p>
          </div>
        </motion.div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Tasks by Category
        </h3>
        {Object.entries(statistics.tasksByCategory).map(([category, count]) => (
          <div key={category} className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                  {category}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-primary">
                  {count}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(count / Object.values(statistics.tasksByCategory).reduce((a, b) => a + b, 0)) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};