import { motion } from "motion/react";

const HeroText = () => {
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Name and greeting */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.8 }}
        className="space-y-2 sm:space-y-4"
      >
        <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-light text-gray-400 tracking-wide">
          CREATIVE WEB & APP DEVELOPER
        </h2>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-none">
          ABHINAV<br />
          MISHRA
        </h1>
      </motion.div>
      
      {/* Subtitle */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6, duration: 0.8 }}
        className="space-y-4 lg:space-y-6"
      >
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 font-light">
          A Developer Dedicated to Crafting
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
            Secure
          </span>
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 font-light">
            Web Solutions
          </span>
        </div>
      </motion.div>
      
      {/* Description */}
      <motion.p
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1, duration: 0.8 }}
        className="text-gray-400 text-base sm:text-lg lg:text-xl xl:text-2xl max-w-lg lg:max-w-2xl xl:max-w-3xl leading-relaxed"
      >
        With passion for creating digital experiences that are both beautiful and functional, 
        I bring ideas to life through code.
      </motion.p>
      
      {/* CTA Button */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pt-4 lg:pt-6"
      >
        <button className="group relative px-6 sm:px-8 lg:px-10 py-3 lg:py-4 bg-white text-black font-medium tracking-wide hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base lg:text-lg">
          <span className="relative z-10">Download CV</span>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </button>
      </motion.div>
    </div>
  );
};

export default HeroText;