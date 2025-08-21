import { useState } from "react";
import { motion } from "motion/react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
import { myProjects } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState(null);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActive(null); // Close dropdown after clicking
    }
  };
  
  return (
    <div className="fixed top-10 inset-x-0 max-w-4xl mx-auto z-50">
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="HOME">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink onClick={() => scrollToSection('home')}>Home</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="ABOUT">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink onClick={() => scrollToSection('about')}>About Me</HoveredLink>
            <HoveredLink onClick={() => scrollToSection('about')}>Tech Stack</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="PROJECTS">
          <div className="text-sm grid grid-cols-2 gap-6 p-4">
            <ProductItem
              title="Sangrakshan: VR-Based Training Module"
              href="#projects"
              src="/assets/projects/Sangrakshan.jpg"
              description="VR-based CBRN disaster training platform for NDRF with multiplayer modes & AI support."
            />
            <ProductItem
              title="AccessWay – AI/AR Accessibility Platform"
              href="#projects"
              src="/assets/projects/Accesway.png"
              description="AI/AR accessibility platform for disabilities. Awarded at World Governments Summit."
            />
            <ProductItem
              title="CRYPTXCHANGE: DeFi Platform"
              href="#projects"
              src="/assets/projects/Cryptxchange.png"
              description="DeFi platform with metaverse education. Top 3 at Fintech Festival 2024."
            />
            <ProductItem
              title="Herbal-Reet: Ayurvedic Metaverse"
              href="#projects"
              src="/assets/projects/Herbal-Reet.png"
              description="Ayurvedic Metaverse with AI-guided Botany & Yoga Sessions."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="EXPERIENCE">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink onClick={() => scrollToSection('experience')}>Internship</HoveredLink>
            <HoveredLink onClick={() => scrollToSection('experience')}>Clients</HoveredLink>
            <HoveredLink onClick={() => scrollToSection('experience')}>Venture</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="ACHIEVEMENTS">
          <div className="text-sm grid grid-cols-2 gap-6 p-4">
            <ProductItem
              title="Smart India Hackathon 2023"
              href="#achievements"
              src="/assets/Achievements/sih23.jpg"
              description="Nationally Acclaimed Winner - VR Disaster Training Platform"
            />
            <ProductItem
              title="Global Best M-Gov Awards 2025"
              href="#achievements"
              src="/assets/Achievements/wgs.jpg"
              description="Internationally Acclaimed Bronze - AI/AR Accessibility Platform"
            />
            <ProductItem
              title="IIT Delhi Hackathon 2024"
              href="#achievements"
              src="/assets/Achievements/iitd24.jpg"
              description="Hack4Purpose 2024 - 1st Runner-Up&#10;(600+ teams)"
            />
            <ProductItem
              title="Fintech Festival 2024"
              href="#achievements"
              src="/assets/Achievements/fintech.jpg"
              description="Scale +91 Hackathon - Top 3 (5000+ teams)"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="CONTACT">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink onClick={() => scrollToSection('contact')}>Get In Touch</HoveredLink>
            <HoveredLink href="mailto:abhinav@example.com">Email</HoveredLink>
            <HoveredLink href="https://www.linkedin.com/in/mishra-abhinav05/" target="_blank" rel="noopener noreferrer">LinkedIn</HoveredLink>
            <HoveredLink href="https://github.com/Itsabhinav28" target="_blank" rel="noopener noreferrer">GitHub</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;