/**
 * Google Analytics 4 configuration
 */

/**
 * GA4 Measurement ID
 *
 * Stored in .env as PUBLIC_GA_MEASUREMENT_ID
 */
export const GA_MEASUREMENT_ID: string =
  import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? "G-WHPBCWQ4HE";

/**
 * Google AdSense Publisher ID
 *
 * Stored in .env as PUBLIC_ADSENSE_PUBLISHER_ID
 */
export const ADSENSE_PUBLISHER_ID: string =
  import.meta.env.PUBLIC_ADSENSE_PUBLISHER_ID ?? "ca-pub-1006790879288401";

/**
 * Event names used for tracking
 */
export const GA_EVENTS = {
  LINK_CLICK: "link_click",
  VIDEO_LINK_CLICK: "video_link_click",
  VIDEO_IMPRESSION: "video_impression",
  VIDEO_PLAY: "video_play",
  VIDEO_PAUSE: "video_pause",
  VIDEO_COMPLETE: "video_complete",
} as const;

/**
 * Video platforms
 */
export const VIDEO_PLATFORMS = {
  YOUTUBE: "YouTube",
  TWITCH: "Twitch",
  NICONICO: "ニコニコ動画",
} as const;

/**
 * Check if a platform is a video platform
 */
export const isVideoPlatform = (platform: string): boolean => {
  return Object.values(VIDEO_PLATFORMS).includes(
    platform as (typeof VIDEO_PLATFORMS)[keyof typeof VIDEO_PLATFORMS],
  );
};
