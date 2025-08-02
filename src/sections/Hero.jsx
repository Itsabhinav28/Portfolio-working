import HeroText from "../components/HeroText";
import { StarryBackground } from "../components/ui/starry-background";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Shooting stars background */}
      <StarryBackground 
        starDensity={0.0002}
        shootingStarDelay={1500}
        starColor="#9E00FF"
        trailColor="#2EB9DF"
      />
      
      {/* Main content container - Full width responsive */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen max-w-none">
          {/* Left side - Text content */}
          <div className="flex-1 w-full lg:max-w-3xl xl:max-w-4xl pt-20 lg:pt-0">
            <HeroText />
          </div>
          
          {/* Right side - Professional portrait area */}
          <div className="flex-1 flex items-center justify-center mt-8 lg:mt-0 lg:pl-8 xl:pl-12">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem]">
              {/* Circular background with subtle gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm" />
              
              {/* Professional headshot placeholder - you can replace with actual image */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-700/70 to-gray-800/70 backdrop-blur-sm flex items-center justify-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 rounded-full bg-gradient-to-br from-gray-600/80 to-gray-700/80 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white opacity-60">AM</span>
                </div>
              </div>
              
              {/* Subtle ring animation */}
              <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
};

export default Hero;