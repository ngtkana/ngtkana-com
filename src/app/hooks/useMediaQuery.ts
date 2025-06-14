"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook for responsive design
 *
 * @param query Media query string
 * @returns Boolean indicating if the media query matches
 *
 * @example
 * // Check if screen is at least medium size
 * const isMediumScreen = useMediaQuery('(min-width: 768px)');
 *
 * // Check if user prefers dark mode
 * const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
  // Default to false on the server
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);

      // Set initial value
      setMatches(media.matches);

      // Define listener function
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      // Add listener
      media.addEventListener("change", listener);

      // Clean up
      return () => {
        media.removeEventListener("change", listener);
      };
    }
    return undefined;
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoints for common screen sizes
 */
export const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
  dark: "(prefers-color-scheme: dark)",
  light: "(prefers-color-scheme: light)",
  portrait: "(orientation: portrait)",
  landscape: "(orientation: landscape)",
};

/**
 * Custom hook for responsive design with predefined breakpoints
 *
 * @param breakpoint Predefined breakpoint key
 * @returns Boolean indicating if the breakpoint matches
 *
 * @example
 * // Check if screen is at least medium size
 * const isMedium = useBreakpoint('md');
 *
 * // Check if user prefers dark mode
 * const isDarkMode = useBreakpoint('dark');
 */
export function useBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  return useMediaQuery(breakpoints[breakpoint]);
}

export default useMediaQuery;
