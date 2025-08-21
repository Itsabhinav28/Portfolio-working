import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import MessageInput from './MessageInput';
import GeminiService from '../../services/geminiService';

const CareerAgentModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [geminiService] = useState(() => new GeminiService());
  const messagesEndRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isInitialized) {
      initializeChat();
    }
  }, [isOpen, isInitialized]);

  const initializeChat = async () => {
    try {
      setIsLoading(true);
      const summary = await geminiService.getCareerSummary();
      
      // Handle the response format properly
      const summaryText = summary && summary.text ? summary.text : 
        "👋 **Welcome! I'm Abhinav's Career Agent**\n\nI can tell you everything about Abhinav Mishra's impressive career:\n\n🎯 **Current**: Software Engineer at Persistent Systems\n🥽 **Specialty**: XR/VR Development & AI Integration\n🏆 **Recognition**: International awards and hackathon wins\n🌍 **Impact**: Government projects and real-world solutions\n\nAsk me anything about his skills, experience, projects, or achievements!";
      
      setMessages([
        {
          content: summaryText,
          isUser: false,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } catch (error) {
      console.error('Error initializing chat:', error);
      setMessages([
        {
          content: "👋 **Welcome! I'm Abhinav's Career Agent**\n\nI can tell you everything about Abhinav Mishra's impressive career:\n\n🎯 **Current**: Software Engineer at Persistent Systems\n🥽 **Specialty**: XR/VR Development & AI Integration\n🏆 **Recognition**: International awards and hackathon wins\n🌍 **Impact**: Government projects and real-world solutions\n\nAsk me anything about his skills, experience, projects, or achievements!",
          isUser: false,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message) => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      content: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await geminiService.sendMessage(message);
      
      // Handle the response format properly
      const responseText = response && response.text ? response.text : 
        "I'm having trouble processing your request right now. Please try again in a moment.";
      
      const aiMessage = {
        content: responseText,
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        content: "I'm having trouble processing your request right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl h-[85vh] bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 border-b border-gray-600/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">AI</span>
                </div>
                <div>
                  <h2 className="text-white text-xl font-bold">Abhinav's Career Agent</h2>
                  <p className="text-white/80 text-sm">Ask me anything about my career!</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar" style={{ height: 'calc(85vh - 200px)' }}>
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.content}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
              />
            ))}
            
            {isLoading && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 pb-8 mt-4 border-t border-gray-600/50 bg-gray-800/30">
            <MessageInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-purple-600" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-indigo-600" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CareerAgentModal;
