import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain } from 'lucide-react';

export function Weather() {
  // For demo purposes, we'll just show a static weather
  // In a real app, we'd fetch from a weather API
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center space-x-3 backdrop-blur-sm bg-background/30 
                 rounded-lg p-4"
    >
      <Sun className="w-8 h-8 text-yellow-400" />
      <div>
        <h2 className="text-2xl font-bold">24°C</h2>
        <p className="text-white/80">San Francisco</p>
      </div>
    </motion.div>
  );
}