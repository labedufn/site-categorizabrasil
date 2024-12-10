"use client";

import { motion } from "motion/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

interface VariantStyles {
  primary: string;
  secondary: string;
  ghost: string;
}

export const Button = ({ variant = "primary", children, className = "", ...props }: ButtonProps) => {
  const baseStyles: string =
    "inline-flex items-center justify-center font-medium tracking-wide transition duration-200 rounded-lg focus:shadow-outline focus:outline-none";

  const variantStyles: VariantStyles = {
    primary: "text-white px-6 h-12 bg-primary-500 hover:bg-primary-600 shadow-md",
    secondary: "text-white px-6 h-12 bg-secondary hover:bg-secondary-600 shadow-md",
    ghost:
      "text-primary-500 relative py-2.5 duration-300 ease-linear hover:text-secondary-500 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-secondary-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
        {children}
      </button>
    </motion.div>
  );
};
