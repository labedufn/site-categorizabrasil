"use client";

interface LayoutDefaultProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutDefault({ children, className = "" }: LayoutDefaultProps) {
  return <div className={`md:max-w-screen-xl px-6 ${className}`}>{children}</div>;
}
