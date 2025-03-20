import { motion } from 'framer-motion';

export function Quote() {
  // For demo purposes, using a static quote
  // In a real app, we'd fetch from a quotes API
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="text-center backdrop-blur-sm bg-background/30 rounded-lg p-6"
    >
      <p className="text-xl italic">
        "The only way to do great work is to love what you do."
      </p>
      <p className="mt-2 text-white/70">
        - Steve Jobs
      </p>
    </motion.div>
  );
}