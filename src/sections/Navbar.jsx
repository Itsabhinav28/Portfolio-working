import { useState } from "react";
import { motion } from "motion/react";

function Navigation() {
  return (
    <ul className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 xl:gap-12">
      <li>
        <a className="text-white hover:text-gray-300 transition-colors text-base lg:text-lg xl:text-xl font-medium" href="#home">
          Home
        </a>
      </li>
      <li>
        <a className="text-white hover:text-gray-300 transition-colors text-base lg:text-lg xl:text-xl font-medium" href="#about">
          About
        </a>
      </li>
      <li>
        <a className="text-white hover:text-gray-300 transition-colors text-base lg:text-lg xl:text-xl font-medium" href="#work">
          Work
        </a>
      </li>
      <li>
        <a className="text-white hover:text-gray-300 transition-colors text-base lg:text-lg xl:text-xl font-medium" href="#contact">
          Contact
        </a>
      </li>
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <a
            href="/"
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-white hover:text-gray-300 transition-colors tracking-tight"
          >
            Pfolio
          </a>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-white hover:text-gray-300 focus:outline-none lg:hidden"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden lg:flex">
            <Navigation />
          </nav>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center lg:hidden bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="pb-6 pt-2 px-4">
            <Navigation />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;