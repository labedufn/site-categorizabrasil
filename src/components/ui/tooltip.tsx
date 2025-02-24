"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "./icons";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  alwaysVisible?: boolean;
  closable?: boolean;
}

export function Tooltip({
  children,
  content,
  position = "top",
  delay = 300,
  alwaysVisible = false,
  closable = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(alwaysVisible);
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
    if (!alwaysVisible) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      setTooltipTimer(timer);
    }
  };

  const handleMouseLeave = () => {
    if (!alwaysVisible) {
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
      }
      setIsVisible(false);
    }
  };

  const handleClose = () => {
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
              whitespace-nowrap
              ${positions[position]}
            `}
          >
            <div className="flex items-center">
              <span>{content}</span>
              {closable && (
                <button onClick={handleClose} className="ml-2 text-white font-bold focus:outline-none">
                  <Icon.x className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
