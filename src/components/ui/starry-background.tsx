"use client";
import React from "react";
import { ShootingStars } from "./shooting-stars";
import { StarsBackground } from "./stars-background";

interface StarryBackgroundProps {
  className?: string;
  starDensity?: number;
  shootingStarDelay?: number;
  starColor?: string;
  trailColor?: string;
}

export const StarryBackground: React.FC<StarryBackgroundProps> = ({
  className = "",
  starDensity = 0.0001,
  shootingStarDelay = 2000,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
}) => {
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      <StarsBackground 
        starDensity={starDensity}
        allStarsTwinkle={true}
        twinkleProbability={0.8}
        minTwinkleSpeed={0.3}
        maxTwinkleSpeed={1.2}
      />
      <ShootingStars 
        minSpeed={15}
        maxSpeed={35}
        minDelay={shootingStarDelay}
        maxDelay={shootingStarDelay + 2000}
        starColor={starColor}
        trailColor={trailColor}
        starWidth={8}
        starHeight={1}
      />
    </div>
  );
}; 