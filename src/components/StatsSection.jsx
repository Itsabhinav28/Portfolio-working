import { motion } from "motion/react";
import { NumberTicker } from "./ui/number-ticker";

export default function StatsSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 1 }}
      className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center mt-8 lg:mt-12"
    >
      <div className="text-center">
        <NumberTicker value={8} delay={0.4} />
        <p className="mt-2 text-sm sm:text-base lg:text-lg font-medium text-gray-300">World Wide Clients</p>
      </div>
      
      <div className="text-center">
        <NumberTicker value={35} delay={0.4} />
        <p className="mt-2 text-sm sm:text-base lg:text-lg font-medium text-gray-300">Projects Contributed</p>
      </div>
      
      <div className="text-center">
        <NumberTicker value={10} delay={0.4} />
        <p className="mt-2 text-sm sm:text-base lg:text-lg font-medium text-gray-300">Global Wins</p>
      </div>
    </motion.div>
  );
} 