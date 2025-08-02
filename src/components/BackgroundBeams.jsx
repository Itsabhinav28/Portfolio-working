"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export const BackgroundBeams = ({ className }) => {
  const beamsRef = useRef(null);

  useEffect(() => {
    const beams = beamsRef.current;
    if (!beams) return;

    const handleMouseMove = (e) => {
      const rect = beams.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      beams.style.setProperty("--mouse-x", `${mouseX}px`);
      beams.style.setProperty("--mouse-y", `${mouseY}px`);
    };

    beams.addEventListener("mousemove", handleMouseMove);
    return () => beams.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={beamsRef}
      className={cn(
        "absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* Continuous diagonal beam lines */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            style={{
              top: `${(i * 100) / 15}%`,
              left: `-${Math.random() * 50}%`,
              width: `${150 + Math.random() * 50}%`,
              transform: `rotate(45deg)`,
              animation: `beamMove ${8 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
        
        {/* Additional beams with different angles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`beam-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            style={{
              top: `${(i * 100) / 10}%`,
              left: `-${Math.random() * 50}%`,
              width: `${150 + Math.random() * 50}%`,
              transform: `rotate(-45deg)`,
              animation: `beamMove ${6 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse-following glow */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.1), transparent 40%)`,
        }}
      />
    </div>
  );
}; 