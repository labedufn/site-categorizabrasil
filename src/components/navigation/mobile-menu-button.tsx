"use client";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="toggle navbar"
      className="outline-none border-l border-l-gray-200 pl-3 relative py-3"
    >
      <span
        aria-hidden={true}
        className={`
          flex h-0.5 w-6 rounded bg-gray-800 transition duration-300
          ${isOpen ? "rotate-45 translate-y-[.324rem]" : ""}
        `}
      />
      <span
        aria-hidden={true}
        className={`
          mt-2 flex h-0.5 w-6 rounded bg-gray-800 transition duration-300
          ${isOpen ? "-rotate-45 -translate-y-[.324rem]" : ""}
        `}
      />
    </button>
  );
}
