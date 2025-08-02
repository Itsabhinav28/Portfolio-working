"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { ShineBorder } from "./ui/shine-border";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [flippedIdx, setFlippedIdx] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [backHeights, setBackHeights] = useState({});

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Enhanced content renderer for back side: headings, subtopics, dividers
  const renderContent = (content, idx, arr) => {
    // Remove **bold** and *italic* markdown
    let clean = content.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1');
    // Enhanced link rendering for Demo button
    clean = clean.replace(/XR-VERSE Site: <a [^>]+>Demo<\/a>/g, `<span class='timeline-point'>
      <span class='font-semibold text-neutral-200 mr-2'>XR-VERSE Site:</span>
      <a href='https://xr-verse.vercel.app/' target='_blank' rel='noopener noreferrer' class='timeline-demo-btn'>Demo</a>
    </span>`);
    // Replace [text](url) with anchor tags (for any other markdown links)
    clean = clean.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-royal underline hover:text-fuchsia">$1</a>');
    // Remove '‣' or '-' from start of bullet points
    if (/^[‣\-]/.test(clean.trim())) {
      clean = clean.replace(/^[‣\-]\s*/, '');
    }
    // Heading: first line or lines ending with ':'
    if (idx === 0 || /:$/g.test(clean.trim())) {
      return `<div class='timeline-heading text-lg md:text-xl font-bold text-royal mb-1 mt-4'>${clean}</div><div class='timeline-divider my-2'></div>`;
    }
    // Subtopic: lines like 'Key tasks:'
    if (/key tasks:?/i.test(clean.trim())) {
      return `<div class='timeline-subtopic text-base font-semibold text-fuchsia-300 mb-1 mt-2'>${clean}</div><div class='timeline-divider my-2'></div>`;
    }
    // Bullet/point: lines that were previously starting with '‣' or '-'
    if (idx > 0 && (arr[idx-1] && /key tasks:?/i.test(arr[idx-1].trim()) || /^[‣\-]/.test(arr[idx].trim()))) {
      return `<div class='timeline-point text-neutral-200 text-base md:text-lg mb-2 pl-2'>${clean}</div>`;
    }
    // Default paragraph
    return `<div class='timeline-paragraph text-neutral-300 text-base md:text-lg mb-2'>${clean}</div>`;
  };

  // Handle swipe up on mobile for flip
  const handleTouchStart = (e, idx) => {
    setTouchStartY(e.touches[0].clientY);
  };
  const handleTouchEnd = (e, idx) => {
    if (touchStartY !== null) {
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (diff > 60) {
        setFlippedIdx(idx);
      }
      setTouchStartY(null);
    }
  };

  // Helper to measure back content height
  const backRefs = useRef([]);
  useEffect(() => {
    data.forEach((item, idx) => {
      if (backRefs.current[idx]) {
        setBackHeights(h => ({ ...h, [idx]: backRefs.current[idx].scrollHeight }));
      }
    });
  }, [data, flippedIdx]);

  return (
    <div className="c-space section-spacing relative" ref={containerRef} style={{ position: 'relative' }}>
      <h2 className="text-heading">My Work Experience</h2>
      <div ref={ref} className="relative pb-20" style={{ position: 'relative' }}>
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-start pt-6 md:pt-20 md:gap-10"
          >
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-midnight">
                <div className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700" />
              </div>
            </div>

            {/* Flip Card */}
            <div
              className="relative w-full md:pl-0 pr-0 md:pr-4 mt-8 md:mt-0 flex items-center justify-start transition-all duration-500"
              style={{
                minHeight: flippedIdx === index
                  ? (backHeights[index] ? backHeights[index] + 64 : 220)
                  : (item.shortDescription ? 260 : 220),
                perspective: 1200
              }}
              onClick={() => setFlippedIdx(flippedIdx === index ? null : index)}
              onTouchStart={(e) => handleTouchStart(e, index)}
              onTouchEnd={(e) => handleTouchEnd(e, index)}
            >
              {/* Animated orbiting tech stack logos (background, per card) */}
              {item.techStack && (
                <div className="orbit-circle-container">
                  <div className="orbit-circle-logos">
                    {item.techStack.map((tech, i, arr) => {
                      const angle = (i * 360 / arr.length) - 90; // Start at top
                      return (
                        <img
                          key={tech.name}
                          src={tech.path}
                          alt={tech.name}
                          className="orbit-logo"
                          style={{
                            left: `calc(50% + ${160 * Math.cos(angle * Math.PI / 180)}px)`,
                            top: `calc(50% + ${160 * Math.sin(angle * Math.PI / 180)}px)`
                          }}
                          title={tech.name}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              <motion.div
                className="w-full h-full max-w-2xl"
                animate={{ rotateY: flippedIdx === index ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
                style={{ transformStyle: "preserve-3d", minHeight: 220 }}
              >
                {/* Front Side */}
                <div
                  className={`absolute inset-0 flex flex-col justify-center gap-3 items-center text-center bg-gradient-to-br from-indigo/80 via-navy/80 to-storm/90 rounded-xl shadow-lg p-8 transition-all duration-300 ${flippedIdx === index ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'}`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <ShineBorder 
                    borderWidth={2}
                    duration={8}
                    shineColor={["#9E00FF", "#2EB9DF", "#6344F5"]}
                  />
                  <div className="flex flex-col gap-2 items-center text-center">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-neutral-300 whitespace-nowrap truncate">{item.date}</h3>
                    <h3 className="text-2xl md:text-3xl font-bold text-neutral-400">{item.title}</h3>
                    <h3 className="text-xl md:text-2xl font-semibold text-neutral-500">{item.job}</h3>
                    {/* Short description on the front */}
                    {item.shortDescription && (
                      <div className="mt-4 text-base md:text-lg text-neutral-300 font-medium max-w-xl mx-auto">{item.shortDescription}</div>
                    )}
                  </div>
                  <div className="mt-6 text-center text-sm text-neutral-400 italic">Tap, click, or swipe up to see details</div>
              </div>
                {/* Back Side */}
                <div
                  className={`absolute inset-0 flex flex-col justify-between glass-card border-l-4 border-royal bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg transition-all duration-300 ${flippedIdx === index ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  ref={el => backRefs.current[index] = el}
                >
                  <ShineBorder 
                    borderWidth={2}
                    duration={8}
                    shineColor={["#9E00FF", "#2EB9DF", "#6344F5"]}
                  />
                  <div>
                    {item.contents.map((content, idx2, arr) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx2, duration: 0.5, type: "spring" }}
                        className="mb-1"
                        key={idx2}
                        dangerouslySetInnerHTML={{ __html: renderContent(content, idx2, arr) }}
                      />
              ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full animate-pulse"
          />
        </div>
      </div>
      <style>{`
        .glass-card {
          box-shadow: 0 8px 32px 0 rgba(44, 33, 100, 0.18);
        }
        .orbit-circle-container {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        .orbit-circle-logos {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0; top: 0;
          animation: orbit 7s linear infinite;
        }
        @keyframes orbit {
          100% { transform: rotate(360deg); }
        }
        .orbit-logo {
          position: absolute;
          width: 38px;
          height: 38px;
          background: none;
          border-radius: 50%;
          box-shadow: 0 2px 8px 0 rgba(44,33,100,0.10);
        }
        .timeline-heading {
          letter-spacing: 0.01em;
          border-radius: 0.5rem;
          background: linear-gradient(90deg, rgba(163,163,163,0.10) 0%, rgba(163,163,163,0.08) 100%);
          color: #d1d5db;
          font-weight: 800;
          padding: 0.25rem 0.75rem;
          display: inline-block;
        }
        .timeline-subtopic {
          color: #d1d5db;
          font-weight: 700;
          letter-spacing: 0.01em;
          background: linear-gradient(90deg, rgba(163,163,163,0.10) 0%, rgba(163,163,163,0.08) 100%);
          border-radius: 0.5rem;
          padding: 0.15rem 0.6rem;
          display: inline-block;
        }
        .timeline-divider {
          border-bottom: 1.5px solid rgba(120,80,255,0.18);
          width: 100%;
          margin: 0.25rem 0 0.5rem 0;
        }
        .timeline-point {
          position: relative;
          padding-left: 1.2rem;
          color: #bdbdbd;
          font-weight: 500;
        }
        .timeline-point:before {
          content: '';
          position: absolute;
          left: 0.2rem;
          top: 0.7em;
          width: 0.5em;
          height: 0.5em;
          background: linear-gradient(135deg, #bdbdbd 0%, #d1d5db 100%);
          border-radius: 50%;
          opacity: 0.7;
          box-shadow: 0 2px 8px 0 rgba(163,163,163,0.10);
        }
        .timeline-paragraph {
          margin-bottom: 0.5rem;
        }
        .timeline-demo-btn {
          display: inline-block;
          background: linear-gradient(90deg, #6366f1 0%, #a21caf 100%);
          color: #fff;
          font-weight: 600;
          border-radius: 0.5rem;
          padding: 0.35em 1.1em;
          margin-left: 0.5em;
          box-shadow: 0 2px 8px 0 rgba(120,80,255,0.10);
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .timeline-demo-btn:hover {
          background: linear-gradient(90deg, #a21caf 0%, #6366f1 100%);
          box-shadow: 0 4px 16px 0 rgba(120,80,255,0.18);
          transform: translateY(-2px) scale(1.04);
          color: #fff;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};