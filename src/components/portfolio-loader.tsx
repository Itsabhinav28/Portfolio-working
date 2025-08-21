"use client";
import React from "react";
import { WavyBackground } from "./ui/wavy-background";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import { AutoHoverTextEffect } from "./ui/auto-hover-text";

export default function PortfolioLoader() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <WavyBackground
        colors={["#8b5cf6", "#ec4899", "#06b6d4", "#22d3ee", "#8b5cf6", "#ec4899"]}
        waveWidth={120}
        backgroundFill="black"
        blur={10}
        speed="fast"
        waveOpacity={0.6}
        containerClassName="h-screen w-full"
        className="flex items-center justify-center w-full h-full"
      >
        {/* Enhanced Stars Background - Full Height Coverage */}
        <StarsBackground 
          starDensity={0.002}
          allStarsTwinkle={true}
          twinkleProbability={0.99}
          minTwinkleSpeed={0.1}
          maxTwinkleSpeed={0.5}
          className="z-10 w-full h-screen absolute inset-0"
        />
        

        

        
        {/* Main Text with Enhanced Scale - Two Line Layout */}
        <div className="relative z-20 flex items-center justify-center w-full h-full">
          <div className="transform scale-[2.0]">
            <AutoHoverTextEffect text="ABHINAV MISHRA" />
          </div>
        </div>


      </WavyBackground>
    </div>
  );
} 