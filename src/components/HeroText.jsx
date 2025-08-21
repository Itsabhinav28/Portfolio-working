import { motion } from "motion/react";
import { TailwindConnectButton } from "./ui/tailwind-connect-button";
import { MorphingText } from "./ui/morphing-text";
import { AuroraText } from "./ui/aurora-text";
import { HyperText } from "./ui/hyper-text";
import { useState, useEffect } from "react";

const HeroText = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["Full Stack Developer", "XR Developer", "Software Engineer", "Problem Solver", "Innovation Enthusiast"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, [texts.length]);
  
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="space-y-4 sm:space-y-5 lg:space-y-6 mt-6 lg:mt-8">
      {/* Name */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0, duration: 0.8 }}
        className="space-y-2 sm:space-y-3"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none">
          <AuroraText className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
            ABHINAV<br />MISHRA
          </AuroraText>
        </h1>
      </motion.div>
      
      {/* Tagline with Morphing Text */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6, duration: 0.8 }}
        className="space-y-3 lg:space-y-4"
      >
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-300 font-light leading-tight">
          A <span className="text-purple-400 font-semibold transition-all duration-500 ease-in-out">{texts[currentTextIndex]}</span>
          <br />
          Dedicated to Crafting
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
            <AuroraText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Secure
            </AuroraText>
          </span>
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 font-light">
            Digital Solutions
          </span>
        </div>
      </motion.div>
      
      {/* Enhanced Description */}
      <motion.p
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1, duration: 0.8 }}
        className="text-gray-300 text-base sm:text-lg lg:text-xl xl:text-2xl max-w-lg lg:max-w-2xl xl:max-w-3xl leading-relaxed font-light"
      >
        With passion for creating innovative experiences that are both
        functional and transformative, I bring complex visions to life through code.
      </motion.p>
      
                    {/* CTA Button - Moved to morphing text position */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2, duration: 0.8 }}
        className="pt-2 lg:pt-4"
      >
        <TailwindConnectButton 
          onClick={() => {
            // Download CV functionality
            const link = document.createElement('a');
            link.href = '/ABHINAV MISHRA-RESUME.pdf';
            link.download = 'ABHINAV MISHRA-RESUME.pdf';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="text-lg"
        >
          Download CV
        </TailwindConnectButton>
      </motion.div>
    </div>
  );
};

export default HeroText;