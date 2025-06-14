"use client";

import React from "react";
import Link from "next/link";

/**
 * Button variants
 */
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

/**
 * Button sizes
 */
type ButtonSize = "sm" | "md" | "lg";

/**
 * Button props interface
 */
interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Optional icon to display before text */
  icon?: React.ReactNode;
  /** Optional icon to display after text */
  trailingIcon?: React.ReactNode;
  /** Button type attribute */
  type?: "button" | "submit" | "reset";
  /** Is the button disabled? */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Aria label for accessibility */
  ariaLabel?: string;
}

/**
 * Link button props interface
 */
interface LinkButtonProps extends Omit<ButtonProps, "type" | "onClick"> {
  /** URL to navigate to */
  href: string;
  /** Open in new tab */
  external?: boolean;
}

/**
 * Get button classes based on variant and size
 */
const getButtonClasses = (
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  fullWidth: boolean = false,
  className: string = ""
): string => {
  // Base classes
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Width classes
  const widthClasses = fullWidth ? "w-full" : "";

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }[size];

  // Variant classes
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-opacity-90 focus:ring-primary",
    secondary:
      "bg-secondary text-foreground hover:bg-opacity-90 focus:ring-secondary",
    outline:
      "border border-border bg-transparent hover:bg-muted focus:ring-primary",
    ghost: "bg-transparent hover:bg-muted focus:ring-primary",
  }[variant];

  return `${baseClasses} ${widthClasses} ${sizeClasses} ${variantClasses} ${className}`;
};

/**
 * Button component
 *
 * Reusable button component with various styles and sizes
 */
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  trailingIcon,
  type = "button",
  disabled = false,
  className = "",
  onClick,
  ariaLabel,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={getButtonClasses(variant, size, fullWidth, className)}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
    </button>
  );
};

/**
 * LinkButton component
 *
 * Button that acts as a link, either internal or external
 */
export const LinkButton = ({
  children,
  href,
  external = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  trailingIcon,
  className = "",
  ariaLabel,
}: LinkButtonProps) => {
  const classes = getButtonClasses(variant, size, fullWidth, className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
        {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
    </Link>
  );
};
