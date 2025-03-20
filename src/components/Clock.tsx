import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center backdrop-blur-sm bg-background/30 rounded-lg p-4"
    >
      <motion.h1 
        className="font-display text-6xl font-bold"
        key={time.getSeconds()}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        {format(time, 'HH:mm')}
      </motion.h1>
      <p className="text-xl mt-2 text-white/80">
        {format(time, 'EEEE, MMMM d')}
      </p>
    </motion.div>
  );
}