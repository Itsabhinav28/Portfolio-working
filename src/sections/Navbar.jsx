import { useState } from "react";
import { motion } from "motion/react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
import { myProjects } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState(null);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="fixed top-10 inset-x-0 max-w-4xl mx-auto z-50">
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="HOME">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink onClick={() => scrollToSection('home')}>Home</HoveredLink>
            <HoveredLink onClick={() => scrollToSection('hero')}>Hero Section</HoveredLink>
            <HoveredLink onClick={() => scrollToSection('intro')}>Introduction</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="ABOUT">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink onClick={() => scrollToSection('about')}>About Me</HoveredLink>
            <HoveredLink onClick={() => scrollToSection('skills')}>Skills & Tech Stack</HoveredLink>
            <HoveredLink onClick={() => scrollToSection('background')}>Background</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="PROJECTS">
          <div className="text-sm grid grid-cols-2 gap-6 p-4">
            <ProductItem
              title="Sangrakshan"
              href="#projects"
              src="/assets/projects/accessories.jpg"
              description="VR Disaster Training Platform - Smart India Hackathon'23 Winner"
            />
            <ProductItem
              title="AccessWay"
              href="#projects"
              src="/assets/projects/auth-system.jpg"
              description="AI/AR Accessibility Platform - Global Best M-Gov Awards 2025 Bronze"
            />
            <ProductItem
              title="CRYPTXCHANGE"
              href="#projects"
              src="/assets/projects/blazor-app.jpg"
              description="Secure DeFi + EdTech Ecosystem with AI Fraud Detection"
            />
            <ProductItem
              title="Herbal-Reet"
              href="#projects"
              src="/assets/projects/elearning.jpg"
              description="Ayurvedic Metaverse with AI-guided Botany & Yoga Sessions"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="EXPERIENCE">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink onClick={() => scrollToSection('experience')}>Work Experience</HoveredLink>
            <HoveredLink onClick={() => scrollToSection('internships')}>Internships</HoveredLink>
            <HoveredLink onClick={() => scrollToSection('freelance')}>Freelance Work</HoveredLink>
            </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="ACHIEVEMENTS">
          <div className="text-sm grid grid-cols-2 gap-6 p-4">
            <ProductItem
              title="Smart India Hackathon'23"
              href="#achievements"
              src="/assets/projects/auth-system.jpg"
              description="Nationally Acclaimed Winner - VR Disaster Training Platform"
            />
            <ProductItem
              title="Global Best M-Gov Awards 2025"
              href="#achievements"
              src="/assets/projects/accessories.jpg"
              description="Internationally Acclaimed Bronze - AI/AR Accessibility Platform"
            />
            <ProductItem
              title="17+ Innovative Projects"
              href="#projects"
              src="/assets/projects/blazor-app.jpg"
              description="Developed cutting-edge solutions across multiple domains"
            />
            <ProductItem
              title="Multiple Hackathon Wins"
              href="#achievements"
              src="/assets/projects/elearning.jpg"
              description="Consistent winner in various national and international competitions"
            />
        </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="CONTACT">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink onClick={() => scrollToSection('contact')}>Get In Touch</HoveredLink>
            <HoveredLink href="mailto:abhinav@example.com">Email</HoveredLink>
            <HoveredLink href="https://linkedin.com/mishra-abhinav05">LinkedIn</HoveredLink>
            <HoveredLink href="https://github.com/Itsabhinav28">GitHub</HoveredLink>
      </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;