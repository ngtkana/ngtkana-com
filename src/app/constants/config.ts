/**
 * Site configuration constants
 *
 * This file contains global configuration values used throughout the application.
 * Centralizing these values makes it easier to maintain and update the site.
 */

/**
 * Social media links
 */
export const socialLinks = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/@ngtkana",
    icon: "youtube",
    color: "text-red-500",
    hoverColor: "hover:text-red-600",
    ariaLabel: "YouTube チャンネルを開く",
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/ngtkana",
    icon: "twitter",
    color: "text-blue-500",
    hoverColor: "hover:text-blue-600",
    ariaLabel: "X (Twitter) アカウントを開く",
  },
];

/**
 * Site metadata
 */
export const siteMetadata = {
  title: "ながたかな",
  titleTemplate: "%s | ながたかな",
  description: "広がるお歌の世界を、私の声で繋いでいきたいです。",
  siteUrl: "https://ngtkana.com",
  language: "ja",
  locale: "ja_JP",
  twitterHandle: "@ngtkana",
  twitterCardType: "summary_large_image",
};

/**
 * Theme configuration
 */
export const themeConfig = {
  // Light mode colors
  light: {
    background: "#fffaf5",
    foreground: "#4a3f35",
    primary: "#ffaa55",
    secondary: "#ffd6aa",
    accent: "#ff8a3c",
    muted: "#fff0e6",
    border: "#ffe6d1",
  },
  // Dark mode colors
  dark: {
    background: "#1a1410",
    foreground: "#fff0e6",
    primary: "#ffaa55",
    secondary: "#cc8844",
    accent: "#ff8a3c",
    muted: "#2d241e",
    border: "#3d2e24",
  },
};

/**
 * Date formatting options
 */
export const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

/**
 * Animation durations
 */
export const animationDurations = {
  fast: 150,
  medium: 300,
  slow: 500,
};
