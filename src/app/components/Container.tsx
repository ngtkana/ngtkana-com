"use client";

import React, { ElementType } from "react";

/**
 * Container size options
 */
type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Container props interface with generic element type
 */
type ContainerProps<T extends ElementType = "div"> = {
  /** Container content */
  children: React.ReactNode;
  /** Container max width */
  size?: ContainerSize;
  /** Additional CSS classes */
  className?: string;
  /** Container padding */
  padding?: "none" | "sm" | "md" | "lg";
  /** HTML element to render as */
  as?: T;
  /** Container ID */
  id?: string;
} & React.ComponentPropsWithoutRef<T>;

/**
 * Size mapping to max-width values
 */
const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-screen-sm", // 640px
  md: "max-w-screen-md", // 768px
  lg: "max-w-screen-lg", // 1024px
  xl: "max-w-screen-xl", // 1280px
  full: "max-w-full", // 100%
};

/**
 * Padding mapping to padding values
 */
const paddingMap: Record<string, string> = {
  none: "px-0",
  sm: "px-4",
  md: "px-6 md:px-8",
  lg: "px-6 md:px-12",
};

/**
 * Container component
 *
 * Provides consistent container sizing and padding throughout the application
 */
export const Container = <T extends ElementType = "div">({
  children,
  size = "xl",
  className = "",
  padding = "md",
  as,
  id,
  ...rest
}: ContainerProps<T>) => {
  const Component = as || "div";

  const containerClasses = [
    "w-full",
    "mx-auto",
    sizeMap[size],
    paddingMap[padding],
    className,
  ].join(" ");

  return (
    <Component className={containerClasses} id={id} {...rest}>
      {children}
    </Component>
  );
};

export default Container;
