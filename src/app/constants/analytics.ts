/**
 * Google Analytics 4 configuration
 */

/**
 * GA4 Measurement ID
 * 
 * This should be in the format G-XXXXXXXX
 * Stored in .env.local as NEXT_PUBLIC_GA_MEASUREMENT_ID
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-WHPBCWQ4HE';

/**
 * Event names used for tracking
 */
export const GA_EVENTS = {
    // Link events
    LINK_CLICK: 'link_click',
    VIDEO_LINK_CLICK: 'video_link_click',

    // Video events
    VIDEO_IMPRESSION: 'video_impression',
    VIDEO_PLAY: 'video_play',
    VIDEO_PAUSE: 'video_pause',
    VIDEO_COMPLETE: 'video_complete',
};

/**
 * Video platforms
 */
export const VIDEO_PLATFORMS = {
    YOUTUBE: 'YouTube',
    TWITCH: 'Twitch',
    NICONICO: 'ニコニコ動画',
};

/**
 * Check if a platform is a video platform
 */
export const isVideoPlatform = (platform: string): boolean => {
    return Object.values(VIDEO_PLATFORMS).includes(platform);
};
