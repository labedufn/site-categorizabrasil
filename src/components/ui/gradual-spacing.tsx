"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

export function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
}: GradualSpacingProps) {
  return (
    <div className="flex flex-wrap justify-center gap-x-2">
      {" "}
      <AnimatePresence>
        {text.split(" ").map((word, i) => (
          <motion.span
            key={i}
            className="flex"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple }}
          >
            {word.split("").map((char, j) => (
              <motion.span
                key={j}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={framerProps}
                transition={{ duration, delay: j * 0.02 }}
                className={cn("drop-shadow-sm", className)}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
