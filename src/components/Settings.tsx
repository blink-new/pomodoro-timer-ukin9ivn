import React from 'react';
import { motion } from 'framer-motion';
import { TimerSettings } from '../types';
import { Volume2, BellRing, Sun, Moon, Monitor } from 'lucide-react';

interface SettingsProps {
  settings: TimerSettings;
  onUpdate: (settings: TimerSettings) => void;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  settings,
  onUpdate,
  onClose,
}) => {
  const handleChange = (key: keyof TimerSettings, value: any) => {
    onUpdate({ ...settings, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </motion.button>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Timer Duration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Work Minutes
              </label>
              <input
                type="number"
                value={settings.workDuration}
                onChange={(e) => handleChange('workDuration', parseInt(e.target.value))}
                className="input-primary w-full"
                min="1"
                max="60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Break
              </label>
              <input
                type="number"
                value={settings.shortBreakDuration}
                onChange={(e) => handleChange('shortBreakDuration', parseInt(e.target.value))}
                className="input-primary w-full"
                min="1"
                max="30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Long Break
              </label>
              <input
                type="number"
                value={settings.longBreakDuration}
                onChange={(e) => handleChange('longBreakDuration', parseInt(e.target.value))}
                className="input-primary w-full"
                min="1"
                max="60"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Sound Effects</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleChange('soundEnabled', !settings.soundEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${settings.soundEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </motion.button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BellRing className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Notifications</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleChange('notificationsEnabled', !settings.notificationsEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${settings.notificationsEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </motion.button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Auto-start Breaks</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleChange('autoStartBreaks', !settings.autoStartBreaks)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${settings.autoStartBreaks ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${settings.autoStartBreaks ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Theme</h3>
          <div className="flex space-x-4">
            {['light', 'dark', 'aurora', 'sunset', 'ocean'].map((theme) => (
              <motion.button
                key={theme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleChange('theme', theme)}
                className={`w-8 h-8 rounded-full border-2 ${
                  settings.theme === theme
                    ? 'border-primary'
                    : 'border-transparent'
                } ${
                  theme === 'light'
                    ? 'bg-white'
                    : theme === 'dark'
                    ? 'bg-gray-900'
                    : theme === 'aurora'
                    ? 'bg-gradient-to-r from-green-400 to-blue-500'
                    : theme === 'sunset'
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500'
                    : 'bg-gradient-to-r from-blue-400 to-purple-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};