"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";

export default function Circular3DCard() {
  return (
    <CardContainer className="inter-var">
      {/* Background Glow - Behind the card */}
      <CardItem
        translateZ="-50"
        className="w-full h-full absolute inset-0 rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 blur-3xl scale-150 animate-pulse" />
      </CardItem>
      
      {/* Additional Background Glow Ring */}
      <CardItem
        translateZ="-25"
        className="w-full h-full absolute inset-0 rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-2xl scale-125" />
      </CardItem>
      
      {/* Extra Glow Layer */}
      <CardItem
        translateZ="-10"
        className="w-full h-full absolute inset-0 rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-purple-500/20 blur-lg scale-105" />
      </CardItem>
      
      <CardBody className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] dark:bg-black/20 dark:border-white/[0.2] border-white/[0.1] w-96 h-96 rounded-full p-6 border backdrop-blur-sm">
        {/* Dummy Profile Image */}
        <CardItem
          translateZ="100"
          className="w-full h-full absolute inset-0 rounded-full overflow-hidden"
        >
          <img
            src="/assets/Abhinav_photo.jpg"
            alt="Abhinav Mishra"
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
        </CardItem>
        
        {/* Border Effect */}
        <CardItem
          translateZ="75"
          className="w-full h-full absolute inset-0 rounded-full"
        >
          <div className="absolute inset-0 rounded-full border-2 border-white/40 group-hover/card:border-purple-400/80 transition-colors duration-300" />
        </CardItem>
        
        {/* Additional Glow Border */}
        <CardItem
          translateZ="50"
          className="w-full h-full absolute inset-0 rounded-full"
        >
          <div className="absolute inset-0 rounded-full border border-purple-400/30 blur-sm" />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
} 