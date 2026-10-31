import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 300);  // Draw decorative line
    const timer2 = setTimeout(() => setStage(2), 800);  // Reveal tagline
    const timer3 = setTimeout(() => setStage(3), 1600); // Begin fade-out
    const timer4 = setTimeout(() => {
      onComplete?.();
    }, 2100); // Complete unmount

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="brand-entrance-loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage >= 3 ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-0 z-[9999] bg-[#FAF7F1] text-[#0B1E34] flex flex-col items-center justify-center p-6 select-none ${
        stage >= 3 ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm w-full text-center">
        {/* Godrej Mahalunge Brand Typography */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.94 }}
          animate={{
            opacity: stage >= 0 ? 1 : 0,
            y: stage >= 0 ? 0 : 15,
            scale: stage >= 0 ? 1 : 0.94,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <span className="font-paragraph text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#8C6D3A] block mb-3">
            FRENCH-INSPIRED LUXURY LIVING
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-light tracking-[0.16em] uppercase text-[#0B1E34]">
            GODREJ <span className="text-[#8C6D3A]">MAHALUNGE</span>
          </h1>
        </motion.div>

        {/* Decorative Gold Line */}
        <div className="w-48 h-5 flex items-center justify-center mb-4">
          <svg
            width="180"
            height="20"
            viewBox="0 0 180 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto overflow-visible"
          >
            <motion.path
              d="M 0 10 Q 45 2, 90 10 T 180 10"
              stroke="#B8975A"
              strokeWidth="1.25"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: stage >= 1 ? 1 : 0,
                opacity: stage >= 1 ? 1 : 0,
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: stage >= 2 ? 1 : 0,
            y: stage >= 2 ? 0 : 10,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-paragraph text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#0B1E34] font-bold">
            Mahalunge · West Pune
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
