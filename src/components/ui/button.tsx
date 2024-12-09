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
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
