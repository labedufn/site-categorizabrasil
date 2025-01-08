interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button onClick={onClick} aria-label="toggle navbar">
      <span
        aria-hidden={true}
        className={`
          flex h-0.5 w-6 rounded bg-primary transition duration-300
          ${isOpen ? "rotate-45 translate-y-[.324rem]" : ""}
        `}
      />
      <span
        aria-hidden={true}
        className={`
          mt-2 flex h-0.5 w-6 rounded bg-primary transition duration-300
          ${isOpen ? "-rotate-45 -translate-y-[.324rem]" : ""}
        `}
      />
    </button>
  );
}
