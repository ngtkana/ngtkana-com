"use client";

import React from "react";
import { FaHome, FaUser, FaYoutube, FaTwitter, FaTwitch, FaGithub, FaDiscord, FaBlog, FaCode } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { SiNiconico } from "react-icons/si";

/**
 * Icon size options
 */
type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Icon name type
 */
export type IconName = "home" | "profile" | "youtube" | "twitter" | "external-link" | "twitch" | "niconico" | "blog" | "atcoder" | "github" | "discord";

/**
 * Icon props interface
 */
interface IconProps {
  /** Icon name (corresponds to the React Icons component) */
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
 * Map of icon names to React Icons components
 */
const iconComponents: Record<IconName, React.ElementType> = {
  home: FaHome,
  profile: FaUser,
  youtube: FaYoutube,
  twitter: FaTwitter,
  "external-link": FiExternalLink,
  twitch: FaTwitch,
  niconico: SiNiconico,
  blog: FaBlog,
  atcoder: FaCode,
  github: FaGithub,
  discord: FaDiscord,
};

/**
 * Icon component
 *
 * Renders icons from React Icons with consistent styling and accessibility
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  className = "",
  ariaHidden = true,
}) => {
  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const pixelSize = sizeMap[size];

  return (
    <IconComponent
      size={pixelSize}
      className={className}
      aria-hidden={ariaHidden ? "true" : undefined}
    />
  );
};

export default Icon;
