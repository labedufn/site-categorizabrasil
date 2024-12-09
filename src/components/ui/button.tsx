"use client";

import { motion } from "motion/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

interface VariantStyles {
  primary: string;
  secondary: string;
}

export const Button = ({ variant = "primary", children, className = "", ...props }: ButtonProps) => {
  const baseStyles: string =
    "inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide transition duration-200 rounded-lg shadow-md focus:shadow-outline focus:outline-none";
  const variantStyles: VariantStyles = {
    primary: "text-white bg-primary-500 hover:bg-primary-600",
    secondary: "text-primary-500 bg-white hover:bg-gray-50",
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
