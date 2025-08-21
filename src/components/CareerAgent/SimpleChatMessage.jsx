import React from 'react';
import { motion } from 'motion/react';

const SimpleChatMessage = ({ message, isUser, timestamp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-start space-x-3 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          isUser 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
            : 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
        }`}>
          {isUser ? 'U' : 'AI'}
        </div>

        {/* Message Content */}
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
            : 'bg-gray-700/50 text-gray-100 border border-gray-600/30'
        }`}>
          {/* Message Text - DIRECT RENDERING, NO MARKDOWN */}
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message}
          </div>

          {/* Timestamp */}
          <div className={`text-xs text-gray-400 mt-2 ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SimpleChatMessage;
