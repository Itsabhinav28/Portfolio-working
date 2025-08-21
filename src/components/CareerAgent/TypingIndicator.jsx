import React from 'react';
import { motion } from 'motion/react';

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start mb-4"
    >
      <div className="max-w-[80%] order-2">
        <div className="bg-gradient-to-r from-storm to-indigo text-white rounded-2xl px-4 py-3 border border-gray-600/50 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <motion.div
                className="w-2 h-2 bg-purple-300 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 bg-cyan-300 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 bg-indigo-300 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              />
            </div>
            <span className="text-sm text-gray-300 ml-2">AI is thinking...</span>
          </div>
        </div>
      </div>
      
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center mx-2 order-1 bg-gradient-to-r from-storm to-indigo">
        <span className="text-white text-sm font-bold">AI</span>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
