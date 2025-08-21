"use client";
import { cn } from "../../lib/utils";
import React, { useEffect, useRef } from "react";

interface BorderBeamProps {
  duration?: number;
  delay?: number;
  size?: number;
  borderWidth?: number;
  className?: string;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  duration = 4,
  delay = 0,
  size = 400,
  borderWidth = 1,
  className,
}) => {
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const beam = beamRef.current;
    if (!beam) return;

    const animate = () => {
      beam.style.transform = "translateX(-100%)";
      setTimeout(() => {
        beam.style.transform = "translateX(100%)";
      }, 50);
    };

    const interval = setInterval(animate, duration * 1000);
    setTimeout(() => animate(), delay * 1000);

    return () => clearInterval(interval);
  }, [duration, delay]);

  return (
    <div
      ref={beamRef}
      className={cn(
        "absolute inset-0 pointer-events-none",
        "before:absolute before:inset-0 before:rounded-[inherit] before:p-[1px]",
        "before:bg-gradient-to-r before:from-transparent before:via-current before:to-transparent",
        "before:animate-[beam_4s_ease-in-out_infinite]",
        className
      )}
      style={{
        "--beam-size": `${size}px`,
        "--beam-border-width": `${borderWidth}px`,
      } as React.CSSProperties}
    />
  );
};

