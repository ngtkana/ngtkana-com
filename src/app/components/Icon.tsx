"use client";

import React from "react";

/**
 * Icon size options
 */
type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Icon name type
 */
export type IconName = "home" | "profile" | "youtube" | "twitter" | "external-link";

/**
 * Icon props interface
 */
interface IconProps {
  /** Icon name (corresponds to the SVG path) */
  name: IconName;
  /** Icon size */
  size?: IconSize;
  /** Additional CSS classes */
  className?: string;
  /** Accessibility label */
  ariaHidden?: boolean;
}

/**
 * Size mapping to pixel values
 */
const sizeMap: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};

/**
 * SVG path definitions for each icon
 */
const iconPaths: Record<string, { path: string; viewBox?: string }> = {
  youtube: {
    path: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z",
  },
  twitter: {
    path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
  },
  home: {
    path: "M12 2L2 9.5V22h20V9.5L12 2zm0 15c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z",
  },
  profile: {
    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
  },
  "external-link": {
    path: "M10 6v2H5v11h11v-5h2v6a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z",
  },
};

/**
 * Icon component
 *
 * Renders SVG icons with consistent styling and accessibility
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  className = "",
  ariaHidden = true,
}) => {
  const iconData = iconPaths[name];

  if (!iconData) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const pixelSize = sizeMap[size];
  const viewBox = iconData.viewBox ?? "0 0 24 24";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={pixelSize}
      height={pixelSize}
      viewBox={viewBox}
      fill="currentColor"
      className={className}
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      <path d={iconData.path} />
    </svg>
  );
};

export default Icon;
