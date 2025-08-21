"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface HyperTextProps {
  /** The text content to be animated */
  children: string;
  /** Optional className for styling */
  className?: string;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean;
}

const DEFAULT_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

export function HyperText({
  children,
  className,
  duration = 600,
  animateOnHover = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState<string[]>(() =>
    children.split(""),
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };

  // Handle scramble animation
  useEffect(() => {
    if (!isAnimating) return;

    const maxIterations = children.length;
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      iterationCount.current = progress * maxIterations;

      setDisplayText((currentText) =>
        currentText.map((letter, index) =>
          letter === " " || letter === "\n"
            ? letter
            : index <= iterationCount.current
              ? children[index]
              : DEFAULT_CHARACTER_SET[getRandomInt(DEFAULT_CHARACTER_SET.length)],
        ),
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [children, duration, isAnimating]);

  return (
    <motion.div
      ref={elementRef}
      className={cn("overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105", className)}
      onMouseEnter={handleAnimationTrigger}
      whileHover={{ scale: 1.02 }}
    >
      {displayText.map((letter, index) => (
        <span
          key={index}
          className={cn(
            "font-mono drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]",
            letter === " " ? "w-3" : ""
          )}
        >
          {letter.toUpperCase()}
        </span>
      ))}
    </motion.div>
  );
} 