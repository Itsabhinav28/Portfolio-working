"use client";
import React, { useEffect, useState } from "react";

interface StarsBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  starColor?: string;
}

export const StarsBackground: React.FC<StarsBackgroundProps> = ({
  starDensity = 0.0001,
  allStarsTwinkle = true,
  twinkleProbability = 0.8,
  minTwinkleSpeed = 0.3,
  maxTwinkleSpeed = 1.2,
  starColor = "#FFFFFF",
}) => {
  const [stars, setStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    twinkleSpeed: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const generateStars = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const totalArea = viewportWidth * viewportHeight;
      const numberOfStars = Math.floor(totalArea * starDensity);
      
      const newStars = Array.from({ length: numberOfStars }, () => {
        const id = Math.random();
        const x = Math.random() * viewportWidth;
        const y = Math.random() * viewportHeight;
        const size = 1 + Math.random() * 2;
        const twinkleSpeed = minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed);
        const opacity = allStarsTwinkle ? 0.3 + Math.random() * 0.7 : 0.5 + Math.random() * 0.5;
        
        return { id, x, y, size, twinkleSpeed, opacity };
      });
      
      setStars(newStars);
    };

    generateStars();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [starDensity, allStarsTwinkle, minTwinkleSpeed, maxTwinkleSpeed]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: starColor,
            opacity: star.opacity,
            animation: allStarsTwinkle 
              ? `twinkle ${star.twinkleSpeed}s ease-in-out infinite alternate`
              : 'none',
            boxShadow: `0 0 ${star.size * 2}px ${starColor}`,
          }}
        />
      ))}
      
      <style>{`
        @keyframes twinkle {
          0% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}; 