import { motion } from 'framer-motion';
import { Clock } from './components/Clock';
import { FocusTask } from './components/FocusTask';
import { QuickTasks } from './components/QuickTasks';
import { Weather } from './components/Weather';
import { Quote } from './components/Quote';
import { useEffect, useState } from 'react';

export default function App() {
  const [backgroundUrl, setBackgroundUrl] = useState('');
  
  useEffect(() => {
    // For now, using a static beautiful nature image
    setBackgroundUrl('https://images.unsplash.com/photo-1506744038136-46273834b3fb');
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Top Bar */}
          <div className="flex justify-between items-start mb-12">
            <Weather />
            <Clock />
          </div>

          {/* Main Focus Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <FocusTask />
          </motion.div>

          {/* Quick Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-md mx-auto mb-12"
          >
            <QuickTasks />
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
          >
            <Quote />
          </motion.div>
        </div>
      </div>
    </div>
  );
}