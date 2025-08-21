import React, { useState } from 'react';
import { motion } from 'motion/react';

const MessageInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything about Abhinav's career, skills, or projects..."
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          maxLength={1000}
          disabled={isLoading}
        />
        <div className="absolute right-3 bottom-3 text-xs text-gray-500">
          {message.length}/1000
        </div>
      </div>
      
      <motion.button
        type="submit"
        disabled={!message.trim() || isLoading}
        className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
          message.trim() && !isLoading
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
        whileHover={message.trim() && !isLoading ? { scale: 1.05 } : {}}
        whileTap={message.trim() && !isLoading ? { scale: 0.95 } : {}}
      >
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>Send</span>
        </div>
      </motion.button>
    </form>
  );
};

export default MessageInput;
