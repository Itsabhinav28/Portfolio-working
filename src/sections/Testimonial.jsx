import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Marquee from "../components/Marquee";
import { achievements } from "../constants";
import { motion } from "framer-motion";

const badgeEmojis = ["🏆", "🥇", "🚀", "🎖️", "🌟", "💡", "🔥", "✨"];

const AchievementCard = ({ img, title, onClick, badge }) => {
  return (
    <motion.figure
      whileHover={{ scale: 1.06, rotateX: 6, boxShadow: "0 8px 32px 0 rgba(92,51,204,0.25)" }}
      whileTap={{ scale: 0.98 }}
      className={twMerge(
        "relative h-85 w-[420px] cursor-pointer overflow-hidden rounded-xl border-2 bg-gradient-to-r bg-indigo to-storm hover:shadow-royal flex items-end border-transparent",
        "animated-border"
      )}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' ? onClick() : null)}
      aria-label={title}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 z-0 pointer-events-none animated-border-inner" />
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10 text-2xl select-none drop-shadow-lg">
        {badge}
      </div>
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={img}
        alt="Achievement"
      />
      <div className="absolute bottom-0 left-0 w-full flex justify-center items-end z-10">
      <div className="w-full bg-black/40 px-4 py-3 rounded-b-xl flex justify-center">
      <figcaption className="achievement-gradient-text text-lg font-bold drop-shadow-md text-center cursor-pointer">
            {title}
          </figcaption>
        </div>
      </div>
    </motion.figure>
  );
};

const AchievementModal = ({ open, onClose, title, description, img, demo }) => {
  // Keyboard close
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'linear-gradient(120deg, rgba(31,30,57,0.65) 0%, rgba(22,26,49,0.75) 100%)', backdropFilter: 'blur(8px)' }}>
      <div className="relative bg-gradient-to-br from-indigo/90 via-navy/80 to-storm/90 rounded-2xl shadow-2xl max-w-3xl w-full p-0 overflow-hidden animate-scalein border-2 border-royal/60">
        <motion.button
          className="absolute top-4 right-4 text-white text-3xl hover:text-fuchsia z-20 focus:outline-none"
          onClick={onClose}
          whileHover={{ rotate: 90 }}
          aria-label="Close"
        >
          &times;
        </motion.button>
        <img
          src={img}
          alt="Achievement Visual"
          className="w-full h-90 object-cover object-center border-b-4 border-royal"
        />
        <div className="p-8 flex flex-col gap-4">
        <h3 className="achievement-gradient-text text-3xl font-extrabold text-center">{title}</h3>
          <p className="text-lg leading-relaxed text-neutral-500 text-center">{description}</p>
          {demo && demo.length > 0 && (
            <motion.a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-6 py-2 rounded-lg bg-royal text-white font-semibold shadow hover:bg-fuchsia transition-colors text-center w-fit focus:outline-none"
              whileHover={{ scale: 1.08, boxShadow: "0 0 16px #5c33cc" }}
            >
              View Demo
            </motion.a>
          )}
        </div>
      </div>
      <style>{`
        .animated-border {
          border: 2px solid transparent;
        }
        .animated-border-inner {
          position: absolute;
          inset: -2px;
          z-index: 1;
          border-radius: 0.75rem;
          pointer-events: none;
          background: linear-gradient(120deg, #5c33cc 0%, #33c2cc 50%, #ca2f8c 100%);
          opacity: 0.7;
          filter: blur(4px);
          animation: borderMove 3s linear infinite;
        }
        @keyframes borderMove {
          0% { filter: blur(4px) hue-rotate(0deg); }
          100% { filter: blur(4px) hue-rotate(360deg); }
        }
        .animate-scalein { animation: scalein 0.3s cubic-bezier(.4,2,.6,1); }
        @keyframes scalein { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default function Achievements() {
  const [modal, setModal] = useState({ open: false, title: "", description: "", img: "", demo: "" });
  const marqueeRef = useRef();

  // Keyboard navigation for cards
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab' && marqueeRef.current) {
        const focusables = marqueeRef.current.querySelectorAll('figure');
        if (focusables.length > 0) {
          if (document.activeElement === focusables[focusables.length - 1] && !e.shiftKey) {
            focusables[0].focus();
            e.preventDefault();
          } else if (document.activeElement === focusables[0] && e.shiftKey) {
            focusables[focusables.length - 1].focus();
            e.preventDefault();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div id="achievements" className="items-start mt-25 md:mt-35 c-space">
      <h2 className="text-heading">My Achievements</h2>
      <div className="relative flex flex-col items-center justify-center w-full mt-12 overflow-hidden" ref={marqueeRef}>
        <Marquee pauseOnHover className="[--duration:20s]">
          {achievements.map((achievement, idx) => (
            <AchievementCard
              key={idx}
              img={achievement.img}
              title={achievement.title}
              onClick={() => setModal({ open: true, title: achievement.title, description: achievement.description, img: achievement.img, demo: achievement.demo })}
              badge={badgeEmojis[idx % badgeEmojis.length]}
            />
          ))}
        </Marquee>
        <div className="absolute inset-y-0 left-0 w-1/8 pointer-events-none bg-gradient-to-r from-primary"></div>
        <div className="absolute inset-y-0 right-0 w-1/8 pointer-events-none bg-gradient-to-l from-primary"></div>
      </div>
      <AchievementModal
        open={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        title={modal.title}
        description={modal.description}
        img={modal.img}
        demo={modal.demo}
      />
    </div>
  );
}
