"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const AutoHoverTextEffect = ({
  text,
  duration = 0,
}: {
  text: string;
  duration?: number;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [maskPosition, setMaskPosition] = useState({ cx: "0%", cy: "50%" });
  const [isAnimating, setIsAnimating] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);

  // Split the text into two parts
  const [firstName, lastName] = text.split(" ");

  useEffect(() => {
    const animateHover = () => {
      setIsAnimating(true);
      setGlowIntensity(1);
      
      // Animate from left to right with enhanced timing
      const animation = [
        { cx: "0%", cy: "50%" },
        { cx: "25%", cy: "50%" },
        { cx: "50%", cy: "50%" },
        { cx: "75%", cy: "50%" },
        { cx: "100%", cy: "50%" },
      ];
      
      animation.forEach((position, index) => {
        setTimeout(() => {
          setMaskPosition(position);
          if (index === animation.length - 1) {
            setTimeout(() => {
              setIsAnimating(false);
              setMaskPosition({ cx: "0%", cy: "50%" });
              setGlowIntensity(0);
            }, 800);
          }
        }, index * 600);
      });
    };

    // Start animation immediately and repeat every 3.5 seconds
    animateHover();
    const interval = setInterval(animateHover, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 1600 1600"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none max-w-[95vw]"
    >
      <defs>
        {/* Purple to blue gradient matching homepage */}
        <linearGradient
          id="autoTextGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="25%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="75%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Secondary purple to blue gradient for extra glow */}
        <linearGradient
          id="autoTextGlow"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        <motion.radialGradient
          id="autoRevealMask"
          gradientUnits="userSpaceOnUse"
          r="35%"
          animate={maskPosition}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="70%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        
        <mask id="autoTextMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#autoRevealMask)"
          />
        </mask>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Enhanced glow filter */}
        <filter id="enhancedGlow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* ABHINAV - Centered over wavy background */}
      {/* Background glow effect for ABHINAV */}
      <motion.text
        x="50%"
        y="45%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="8"
        fill="transparent"
        filter="url(#enhancedGlow)"
        className="font-black text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem]"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {firstName}
      </motion.text>

      {/* Base text for ABHINAV */}
      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="2"
        stroke="rgba(255,255,255,0.1)"
        fill="transparent"
        className="font-black text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem]"
      >
        {firstName}
      </text>
      
      {/* Animated stroke text for ABHINAV */}
      <motion.text
        x="50%"
        y="45%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1.5"
        stroke="rgba(255,255,255,0.3)"
        fill="transparent"
        className="font-black text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem]"
        initial={{ strokeDashoffset: 3000, strokeDasharray: 3000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 3000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        {firstName}
      </motion.text>
      
      {/* Main white text for ABHINAV */}
      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
        fill="rgba(255,255,255,0.9)"
        mask="url(#autoTextMask)"
        filter="url(#glow)"
        className="font-black text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem]"
      >
        {firstName}
      </text>

      {/* MISHRA - Centered over wavy background */}
      {/* Background glow effect for MISHRA */}
      <motion.text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="8"
        fill="transparent"
        filter="url(#enhancedGlow)"
        className="font-black text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem]"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        {lastName}
      </motion.text>

      {/* Base text for MISHRA */}
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="2"
        stroke="rgba(255,255,255,0.1)"
        fill="transparent"
        className="font-black text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem]"
      >
        {lastName}
      </text>
      
      {/* Animated stroke text for MISHRA */}
      <motion.text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1.5"
        stroke="rgba(255,255,255,0.3)"
        fill="transparent"
        className="font-black text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem]"
        initial={{ strokeDashoffset: 3000, strokeDasharray: 3000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 3000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2,
          delay: 1,
        }}
      >
        {lastName}
      </motion.text>
      
      {/* Main white text for MISHRA */}
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
        fill="rgba(255,255,255,0.9)"
        mask="url(#autoTextMask)"
        filter="url(#glow)"
        className="font-black text-9xl md:text-[12rem] lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem]"
      >
        {lastName}
      </text>




    </svg>
  );
}; 