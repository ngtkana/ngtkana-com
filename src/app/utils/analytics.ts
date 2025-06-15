'use client';

import { GA_EVENTS, GA_MEASUREMENT_ID, isVideoPlatform } from '@/app/constants/analytics';

/**
 * Track an event with Google Analytics 4
 * 
 * @param eventName The name of the event to track
 * @param eventParams Additional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
    // Check if gtag is available (only in browser and after GA has loaded)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, eventParams);
    } else {
        // For development environments, log to console
        console.log(`[GA Event]: ${eventName}`, eventParams);
    }
};

/**
 * Track a link click event
 * 
 * @param linkType The type of link (e.g., 'social', 'video', 'external')
 * @param linkName The name of the link (e.g., 'YouTube', 'Twitter')
 * @param linkUrl The URL of the link
 */
export const trackLinkClick = (linkType: string, linkName: string, linkUrl: string) => {
    trackEvent(GA_EVENTS.LINK_CLICK, {
        link_type: linkType,
        link_name: linkName,
        link_url: linkUrl
    });
};

/**
 * Track a video link click
 * 
 * @param platform The video platform (e.g., 'YouTube', 'Twitch', 'Niconico')
 * @param linkName The name or description of the link
 * @param linkUrl The URL of the link
 */
export const trackVideoLinkClick = (platform: string, linkName: string, linkUrl: string) => {
    trackEvent(GA_EVENTS.VIDEO_LINK_CLICK, {
        platform,
        link_name: linkName,
        link_url: linkUrl
    });
};

/**
 * Check if a link is for a video platform and track it appropriately
 * 
 * @param linkName The name of the link (platform)
 * @param username The username or identifier
 * @param url The URL of the link
 * @returns true if the link was tracked as a video link
 */
export const trackLinkIfVideo = (linkName: string, username: string, url: string): boolean => {
    if (isVideoPlatform(linkName)) {
        trackVideoLinkClick(linkName, username, url);
        return true;
    }
    return false;
};

// Add TypeScript declaration for gtag
declare global {
    interface Window {
        gtag: (command: string, action: string, params?: any) => void;
        dataLayer: any[];
    }
}
