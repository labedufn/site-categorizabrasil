"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

export function Tooltip({ children, content, position = "top", delay = 300 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipTimer, setTooltipTimer] = useState<NodeJS.Timeout | null>(null);

  const positions = {
    top: "bottom-full left-1/2 mb-2",
    bottom: "top-full left-1/2 mt-2",
    left: "right-full top-1/2 mr-2",
    right: "left-full top-1/2 ml-2",
  };

  const tooltipVariants = {
    top: {
      hidden: { y: 10, opacity: 0, x: "-50%" },
      visible: { y: 0, opacity: 1, x: "-50%" },
    },
    bottom: {
      hidden: { y: -10, opacity: 0, x: "-50%" },
      visible: { y: 0, opacity: 1, x: "-50%" },
    },
    left: {
      hidden: { x: 10, opacity: 0, y: "-50%" },
      visible: { x: 0, opacity: 1, y: "-50%" },
    },
    right: {
      hidden: { x: -10, opacity: 0, y: "-50%" },
      visible: { x: 0, opacity: 1, y: "-50%" },
    },
  };

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTooltipTimer(timer);
  };

  const handleMouseLeave = () => {
    if (tooltipTimer) {
      clearTimeout(tooltipTimer);
    }
    setIsVisible(false);
  };

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tooltipVariants[position]}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
            }}
            className={`
              absolute z-50 px-3 py-2
              text-xs text-white bg-gray-900 rounded-lg
              pointer-events-none whitespace-nowrap
              ${positions[position]}
            `}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
