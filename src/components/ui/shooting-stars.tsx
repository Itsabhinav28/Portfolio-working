"use client";
import React, { useEffect, useState } from "react";

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
}

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 15,
  maxSpeed = 35,
  minDelay = 2000,
  maxDelay = 4000,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 8,
  starHeight = 1,
}) => {
  const [shootingStars, setShootingStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    speed: number;
    delay: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const createShootingStar = () => {
      const id = Date.now() + Math.random();
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight * 0.3);
      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      
      setShootingStars(prev => [...prev, { id, x, y, speed, delay, opacity: 1 }]);
      
      // Remove the shooting star after animation
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== id));
      }, 3000);
    };

    // Create initial shooting stars
    const initialStars = Array.from({ length: 3 }, () => {
      const id = Date.now() + Math.random();
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight * 0.3);
      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
      const delay = Math.random() * 2000;
      
      return { id, x, y, speed, delay, opacity: 1 };
    });
    
    setShootingStars(initialStars);

    // Create new shooting stars periodically
    const interval = setInterval(createShootingStar, 3000);

    return () => clearInterval(interval);
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${starWidth}px`,
            height: `${starHeight}px`,
            background: `linear-gradient(90deg, ${starColor} 0%, ${trailColor} 100%)`,
            borderRadius: '50%',
            boxShadow: `0 0 ${starWidth * 2}px ${starColor}`,
            animation: `shootingStar ${star.speed}s linear infinite`,
            animationDelay: `${star.delay}ms`,
            opacity: star.opacity,
          }}
        />
      ))}
      
      <style>{`
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0) rotate(45deg);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) translateY(100vh) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}; 