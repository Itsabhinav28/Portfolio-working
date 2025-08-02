import { motion } from "motion/react";
const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm p-5">
      <motion.div
        className="relative max-w-xl w-full border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 max-h-[100vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-sm top-3 right-3 bg-midnight hover:bg-gray-500 z-10"
        >
          <img src="assets/close.svg" className="w-5 h-5" />
        </button>
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-2xl" />
        <div className="p-4">
          <h5 className="mb-2 text-xl font-bold text-white">{title}</h5>
          <p className="mb-3 text-sm font-normal text-neutral-400">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-2 text-sm font-normal text-neutral-400">{subDesc}</p>
          ))}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg size-8 hover-animation"
                />
              ))}
            </div>
            <a className="inline-flex items-center gap-1 text-sm font-medium cursor-pointer hover-animation text-purple-300 hover:text-purple-200">
              View Project{" "}
              <img src="assets/arrow-up.svg" className="size-3" href={href} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
