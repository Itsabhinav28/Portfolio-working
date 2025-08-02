"use client";
import React, { createContext, useState, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const MouseEnterContext = createContext<{
  mouseX: number;
  mouseY: number;
  setMouseX: React.Dispatch<React.SetStateAction<number>>;
  setMouseY: React.Dispatch<React.SetStateAction<number>>;
}>({
  mouseX: 0,
  mouseY: 0,
  setMouseX: () => {},
  setMouseY: () => {},
});

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMouseX(event.clientX - rect.left);
      setMouseY(event.clientY - rect.top);
    }
  };

  return (
    <MouseEnterContext.Provider value={{ mouseX, mouseY, setMouseX, setMouseY }}>
      <div
        className={cn("py-20", containerClassName)}
        onMouseMove={handleMouseMove}
        ref={containerRef}
      >
        <div className={cn("flex items-center justify-center", className)}>
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { mouseX, mouseY } = useContext(MouseEnterContext);
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = mouseY / 5;
  const rotateY = mouseX / 5;

  return (
    <motion.div
      ref={ref}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: any;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const { mouseX, mouseY } = useContext(MouseEnterContext);
  const ref = useRef<any>(null);

  const rotateXValue = mouseY / 5;
  const rotateYValue = mouseX / 5;

  return (
    <Tag
      ref={ref}
      className={cn("w-fit", className)}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Create a wrapper component that's easier to use
export const Card3D = ({ children, className, ...props }: any) => {
  return (
    <CardContainer {...props}>
      <CardBody className={className}>
        {children}
      </CardBody>
    </CardContainer>
  );
}; 