import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/FrameWorks";
import { IconCloud } from "../components/IconCloud";
import { GlowingEffect } from "../components/GlowingEffect";
import { BackgroundBeams } from "../components/ui/background-beams";
import { CometCard } from "../components/ui/comet-card";
const techStack = [
  // Languages
  { image: "/assets/logos/cplusplus.svg", name: "C++" },
  { image: "/assets/logos/python.svg", name: "Python" },
  { image: "/assets/logos/javascript.svg", name: "JavaScript" },
  { image: "/assets/logos/csharp.svg", name: "C#" },

  // Frontend/Frameworks
  { image: "/assets/logos/react.svg", name: "React.js" },
  { image: "/assets/logos/html5.svg", name: "HTML5" },
  { image: "/assets/logos/css3.svg", name: "CSS3" },
  { image: "/assets/logos/tailwindcss.svg", name: "Tailwind CSS" },

  // Backend/Frameworks
  { image: "/assets/logos/dotnet.svg", name: ".NET" },
  { image: "/assets/logos/dotnetcore.svg", name: ".NET Core" },
  { image: "/assets/logos/blazor.svg", name: "Blazor" },

  // Cloud & Services
  { image: "/assets/logos/azure.svg", name: "Azure" },
  { image: "/assets/logos/auth0.svg", name: "Auth0" },
  { image: "/assets/logos/stripe.svg", name: "Stripe" },

  // Databases
  { image: "/assets/logos/microsoftsqlserver.svg", name: "SQL Server" },
  { image: "/assets/logos/sqlite.svg", name: "SQLite" },

  // Tools
  { image: "/assets/logos/git.svg", name: "Git" },
  { image: "/assets/logos/github.svg", name: "GitHub" },
  { image: "/assets/logos/visualstudiocode.svg", name: "VS Code" },
  { image: "/assets/logos/vitejs.svg", name: "Vite" },
  { image: "/assets/logos/threejs.svg", name: "Three.js" },
  { image: "/assets/logos/wordpress.svg", name: "WordPress" },
];

const icons = techStack.map((tech, index) => (
  <img 
    key={index} 
    src={tech.image} 
    alt={tech.name}
    className="w-8 h-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300"
  />
));

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing min-h-[60vh]" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:auto-rows-[14rem] mt-12">
        {/* Grid 1 - Full Left Half */}
        <CometCard>
          <div className="flex items-end grid-default-color grid-1 relative min-h-[6rem] md:min-h-[35rem]">
            <img
              src="assets/coding-pov.png"
              className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
            />
            <div className="z-10">
              <p className="headtext text-white pointer-events-none opacity-60 select-none font-bold tracking-wider drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300">Hi, I'm Abhinav Mishra</p>
              <p className="subtext">
                A passionate Computer Science Engineering student specializing in AI, with expertise in XR development, blockchain, and full-stack technologies. 
              </p>
            </div>
            <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
          </div>
        </CometCard>
        
        {/* Right Half - Grid 2 and 3 stacked */}
        <div className="flex flex-col gap-4">
          {/* Grid 2 - Tech Stack (Top Right) */}
          <CometCard>
            <div className="grid-default-color grid-2 min-h-[6rem] md:min-h-[17rem] relative overflow-hidden group hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
              <BackgroundBeams />
              <div
                ref={grid2Container}
                className="flex items-center justify-center w-full h-full relative z-10"
              >
                <div className="absolute top-8 left-4 text-5xl text-white pointer-events-none opacity-60 select-none font-bold tracking-wider drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300">
                  <p>TECH</p>
                  <p>STACK</p>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1 -translate-y-35">
                  <IconCloud icons={icons} size={250} iconSize={40} />
                </div>
              </div>
            </div>
          </CometCard>
          
          {/* Grid 3 - Time Zone (Bottom Right) */}
          <CometCard>
            <div className="grid-black-color grid-3 relative min-h-[6rem] md:min-h-[17rem]">
              <div className="z-10 w-[50%]">
                <p className="headtext">Time Zone</p>
                <p className="subtext">
                  I'm based in India, and open to remote work worldwide
                </p>
              </div>
              <figure className="absolute left-[30%] top-[10%]">
                <Globe />
              </figure>
            </div>
          </CometCard>
        </div>
      </div>
    </section>
  );
};

export default About;
