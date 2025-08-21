"use client";
import React from "react";
import { motion } from "motion/react";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleMainItemClick = () => {
    // Map main items to their corresponding sections
    const sectionMap = {
      'HOME': 'home',
      'ABOUT': 'about',
      'PROJECTS': 'projects',
      'EXPERIENCE': 'experience',
      'ACHIEVEMENTS': 'achievements',
      'CONTACT': 'contact'
    };
    
    const sectionId = sectionMap[item];
    if (sectionId) {
      scrollToSection(sectionId);
    }
  };

  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white hover:opacity-[0.9] text-sm font-medium"
        onClick={handleMainItemClick}
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-black/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-white/[0.2] bg-black/60 backdrop-blur-md shadow-input flex justify-center space-x-8 px-12 py-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (href && href.startsWith('#')) {
      const sectionId = href.substring(1);
      scrollToSection(sectionId);
    }
  };

  return (
    <a href={href} onClick={handleClick} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={80}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl object-cover h-20 w-28"
      />
      <div>
        <h4 className="text-sm font-bold mb-1 text-white">
          {title}
        </h4>
        {description && (
          <p className="text-neutral-300 text-xs max-w-[8rem]">
            {description}
          </p>
        )}
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <a
      {...rest}
      className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
    >
      {children}
    </a>
  );
}; 