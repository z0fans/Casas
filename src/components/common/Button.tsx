import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
    danger:
      "bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
