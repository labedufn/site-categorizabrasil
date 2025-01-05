"use client";

import { motion } from "motion/react";

interface LayoutInternoProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutInterno({ children, className = "" }: LayoutInternoProps) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
}
