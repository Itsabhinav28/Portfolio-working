import HeroText from "../components/HeroText";
import { StarryBackground } from "../components/ui/starry-background";
import Circular3DCard from "../components/ui/circular-3d-card";
import StatsSection from "../components/StatsSection";
import { motion } from "motion/react";
import { MorphingText } from "../components/ui/morphing-text";

const Hero = () => {
  return (
    <section id="home" className="relative flex items-center justify-center min-h-[85vh] overflow-hidden">
      {/* Shooting stars background */}
      <StarryBackground 
        starDensity={0.0002}
        shootingStarDelay={1500}
        starColor="#9E00FF"
        trailColor="#2EB9DF"
      />
      
      {/* Main content container - Full width responsive */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[85vh] max-w-none pt-8 lg:pt-12">
          {/* Left side - Text content */}
          <div className="flex-1 w-full lg:max-w-3xl xl:max-w-4xl pt-12 lg:pt-0">
            <HeroText />
          </div>
          
          {/* Right side - 3D Circular Card with Stats */}
          <div className="flex-1 flex flex-col items-center justify-center mt-8 lg:mt-0 lg:pl-8 xl:pl-12">
            <Circular3DCard />
            <StatsSection />
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
};

export default Hero;