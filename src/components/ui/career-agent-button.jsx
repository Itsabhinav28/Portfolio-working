import React, { useState } from 'react';
import { motion } from 'motion/react';

const CareerAgentButton = ({ onClick, children, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer relative ${className}`}
    >
      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl transition-opacity duration-500"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Interactive indicator */}
      <motion.div
        className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full transition-all duration-300"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Click hint */}
      <motion.div
        className="absolute top-4 left-4 text-xs text-white/60 transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        Click to chat!
      </motion.div>
    </motion.div>
  );
};

export default CareerAgentButton;
