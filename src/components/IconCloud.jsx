import React, { useRef, useEffect, useState } from "react";

// Utility to generate 3D positions on a sphere
function getSphereCoords(count, radius) {
  const coords = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    coords.push({
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
    });
  }
  return coords;
}

export function IconCloud({ icons = [], size = 350, iconSize = 48, speed = 0.002 }) {
  const containerRef = useRef(null);
  const iconRefs = useRef([]);
  const requestRef = useRef();
  const angle = useRef(0);
  const radius = size / 2.2;
  const coords = getSphereCoords(icons.length, radius);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  useEffect(() => {
    function animate() {
      angle.current += speed;
      icons.forEach((_, i) => {
        const a = angle.current;
        const { x, y, z } = coords[i];
        // Simple Y-axis rotation
        const rx = x * Math.cos(a) - z * Math.sin(a);
        const rz = x * Math.sin(a) + z * Math.cos(a);
        const scale = 0.6 + 0.6 * ((rz + radius) / (2 * radius));
        const opacity = 0.5 + 0.5 * ((rz + radius) / (2 * radius));
        const el = iconRefs.current[i];
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate(${rx + size / 2}px, ${y + size / 2}px) scale(${scale})`;
          el.style.opacity = opacity;
          el.style.zIndex = Math.floor(1000 * scale);
        }
      });
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line
  }, [icons.length, size, speed]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: size,
        height: size,
        margin: "0 auto",
        perspective: 800,
      }}
    >
      {icons.map((icon, i) => (
        <div
          key={i}
          ref={el => (iconRefs.current[i] = el)}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: iconSize,
            height: iconSize,
            transition: "box-shadow 0.2s",
            cursor: "pointer",
            willChange: "transform, opacity",
          }}
          className="group"
          onMouseEnter={() => setHoveredIcon(i)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          {/* Icon Glow Effect
          <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
            hoveredIcon === i 
              ? 'bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-500/30 blur-md scale-150' 
              : 'bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-pink-500/10 blur-sm scale-100'
          }`} /> */}
          
          {/* Icon Container */}
          <div className={`relative z-20 w-full h-full rounded-lg p-1 transition-all duration-300 ${
            hoveredIcon === i 
              ? 'scale-125 bg-white/10 backdrop-blur-sm border border-cyan-400/50' 
              : 'scale-100 bg-transparent'
          }`}>
            {icon}
          </div>

          {/* Tooltip */}
          {hoveredIcon === i && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm border border-cyan-400/50">
                {icons[i].props.alt}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
