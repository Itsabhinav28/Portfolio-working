import React, { useRef } from "react";



export function TechStackGrid({ icons = [], size = 300, iconSize = 40 }) {
  const containerRef = useRef(null);



  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(51, 194, 204, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(122, 87, 219, 0.1) 0%, transparent 50%)`,
        }}></div>
      </div>

      {/* Floating Particles - Sparkling Effect */}
      <div className="absolute inset-0 z-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
              zIndex: 10,
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative mx-auto"
        style={{
          width: size,
          height: size,
        }}
      >
        {/* Placeholder for IconCloud component */}
        <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
          IconCloud Component Goes Here
        </div>
      </div>



      {/* Center Pulse Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
    </div>
  );
} 