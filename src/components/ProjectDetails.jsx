import { motion } from "motion/react";
import { MagicCard } from "./ui/magic-card";
import { BorderMagicButton } from "./ui/border-magic-button";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
  // Size customization props
  width = "max-w-6xl", // Default width for horizontal layout
  height = "max-h-[90vh]", // Default height
  imageHeight = "h-64", // Default image height
  padding = "p-8", // Default padding
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm p-5">
      <MagicCard className={`${width} w-full ${height} overflow-y-auto`}>
      <motion.div
          className="relative w-full border shadow-2xl rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border-white/20 backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Close Button */}
        <button
          onClick={closeModal}
            className="absolute p-2 rounded-full top-4 right-4 bg-slate-800/80 hover:bg-slate-700/80 z-10 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10"
        >
            <img src="assets/close.svg" className="w-5 h-5" alt="Close" />
        </button>

          {/* Horizontal Layout Container */}
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Project Image */}
            <div className="lg:w-1/2 relative">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full min-h-[400px] object-cover rounded-l-2xl lg:rounded-r-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent rounded-l-2xl lg:rounded-r-none"></div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
            {/* Title */}
            <motion.h2 
              className="mb-3 text-2xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="mb-4 text-sm text-neutral-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {description}
            </motion.p>

            {/* Features List - CARD STYLE LAYOUT */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="mb-3 text-lg font-semibold text-white">Key Features</h3>
              
              {/* CARD STYLE FEATURES - VERTICAL LAYOUT */}
              <div className="space-y-2">
          {subDescription.map((subDesc, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-slate-800/50 backdrop-blur-sm border border-white/20 rounded-lg p-3 hover:bg-slate-800/70 hover:border-purple-400/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start gap-3">
                      {/* NUMBERED CIRCLE */}
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
                        <span className="text-white font-bold text-xs">{index + 1}</span>
                      </div>
                      
                      {/* FEATURE TEXT */}
                      <div className="flex-1">
                        <p className="text-neutral-200 leading-relaxed font-medium text-sm">{subDesc}</p>
                      </div>
                    </div>
                    
                    {/* HOVER GLOW EFFECT */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack and Action Button */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <motion.div
                    key={tag.id}
                    className="group relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                    <div className="relative bg-slate-800/80 backdrop-blur-sm border border-white/20 rounded-lg p-2 group-hover:border-purple-400/50 transition-all duration-300">
                      <img
                  src={tag.path}
                  alt={tag.name}
                        className="w-6 h-6 rounded-md group-hover:scale-110 transition-transform duration-300"
                />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {tag.name}
                    </div>
                  </motion.div>
              ))}
            </div>

              {/* View Project Button */}
              <BorderMagicButton href={href} className="flex-shrink-0">
                <span className="flex items-center gap-2">
                  View Project
                  <img src="assets/arrow-up.svg" className="w-4 h-4" alt="Arrow" />
                </span>
              </BorderMagicButton>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </MagicCard>
    </div>
  );
};

export default ProjectDetails;