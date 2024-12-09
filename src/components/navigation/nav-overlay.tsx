"use client";

interface NavOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export function NavOverlay({ isVisible, onClose }: NavOverlayProps) {
  return (
    <div
      aria-hidden={true}
      onClick={onClose}
      className={`fixed bg-white/40 backdrop-filter backdrop-blur-sm inset-0 z-30 ${
        isVisible ? "lg:hidden" : "hidden lg:hidden"
      }`}
    />
  );
}
