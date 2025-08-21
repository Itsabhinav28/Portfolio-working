"use client";
import React from "react";

interface BorderMagicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export function BorderMagicButton({ 
  children, 
  onClick, 
  className = "",
  href 
}: BorderMagicButtonProps) {
  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white backdrop-blur-3xl hover:bg-slate-900 transition-colors duration-300">
        {children}
      </span>
    </Component>
  );
} 