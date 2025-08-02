import { motion } from "framer-motion";
import { useState } from "react";
import { TracingBeam } from "../components/ui/tracing-beam";
import ProjectDetails from "../components/ProjectDetails";
import { myProjects } from "../constants";
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleMouseMove = (e) => {
    if (preview) {
      const { clientX, clientY } = e;
      setPreview(prev => ({ ...prev, x: clientX, y: clientY }));
    }
  };

  const handleProjectHover = (project, e) => {
    const { clientX, clientY } = e;
    setPreview({ ...project, x: clientX, y: clientY });
  };

  // Project logo mapping with fallback emojis
  const getProjectLogo = (projectName) => {
    const logos = {
      "Sangrakshan": "🛡️",
      "AccessWay": "🌐",
      "CRYPTXCHANGE": "₿",
      "Herbal-Reet": "🌿",
      "Enviro-Bot": "🤖",
      "LogiGreen": "📦"
    };
    return logos[projectName] || "🚀";
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="c-space section-spacing relative"
      id="projects"
      style={{ position: 'relative' }}
    >
      <TracingBeam className="px-6">
        <div className="max-w-6xl mx-auto antialiased pt-4 relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-heading mb-12 text-center"
          >
            My Projects
          </motion.h2>

          <div className="grid gap-8">
            {myProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
                onMouseEnter={(e) => handleProjectHover(project, e)}
                onMouseLeave={() => setPreview(null)}
              >
                <div className="bg-gradient-to-br from-indigo/20 via-navy/20 to-storm/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center gap-6">
                    {/* Circular Logo Widget with Image */}
                    <div className="flex-shrink-0">
                      <div className="relative group">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-white/20 flex items-center justify-center text-3xl backdrop-blur-sm hover:scale-110 transition-all duration-300 hover:border-purple-400/40 overflow-hidden">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover rounded-full"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <span 
                            className={`text-2xl ${project.image ? 'hidden' : 'flex'}`}
                            style={{ display: project.image ? 'none' : 'flex' }}
                          >
                            {getProjectLogo(project.title)}
                          </span>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-3">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 hover:text-purple-300 transition-colors duration-300 transform hover:scale-105">
                          {project.title}
                        </h3>
                      </div>

                      <div className="mb-4">
                        <p className="text-neutral-300 text-base md:text-lg leading-relaxed transform hover:scale-105 transition-transform duration-300">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <motion.div
                              key={tag.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: tagIndex * 0.05 }}
                              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:translate-y-[-2px]"
                            >
                              <img
                                src={tag.path}
                                alt={tag.name}
                                className="w-4 h-4 rounded-full"
                              />
                              <span className="text-xs text-neutral-300 font-medium">
                                {tag.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <InteractiveHoverButton
                        onClick={() => setSelectedProject(project)}
                        className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-400/30 text-white hover:from-purple-600/30 hover:to-blue-600/30 hover:border-purple-300/50 backdrop-blur-sm transform hover:scale-105"
                      >
                        View Details
                      </InteractiveHoverButton>
                    </div>
                  </div>

                  {/* Accolade Badge */}
                  {project.accolade && (
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 text-yellow-300 text-xs font-semibold backdrop-blur-sm transform hover:scale-110">
                        {project.accolade}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </TracingBeam>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetails
          title={selectedProject.title}
          description={selectedProject.description}
          subDescription={selectedProject.subDescription}
          image={selectedProject.image}
          tags={selectedProject.tags}
          href={selectedProject.href}
          closeModal={() => setSelectedProject(null)}
        />
      )}

      {/* Hover Preview - Project Image Only */}
      {preview && preview.image && (
        <motion.div
          className="fixed pointer-events-none z-50 hidden md:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            left: preview.x + 20,
            top: preview.y - 20,
          }}
        >
          <div className="w-48 h-32 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-white/20 backdrop-blur-sm overflow-hidden shadow-2xl">
            <img 
              src={preview.image} 
              alt={preview.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
