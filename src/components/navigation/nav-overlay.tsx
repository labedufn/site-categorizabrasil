"use client";

import { motion, AnimatePresence } from "motion/react";

interface NavOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export function NavOverlay({ isVisible, onClose }: NavOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          aria-hidden={true}
          onClick={onClose}
          className="fixed bg-white/40 backdrop-filter backdrop-blur-sm inset-0 z-30 lg:hidden"
        />
      )}
    </AnimatePresence>
  );
}
