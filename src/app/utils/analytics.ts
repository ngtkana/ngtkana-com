'use client';

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
    trackEvent('link_click', {
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
    trackEvent('video_link_click', {
        platform,
        link_name: linkName,
        link_url: linkUrl
    });
};

// Add TypeScript declaration for gtag
declare global {
    interface Window {
        gtag: (command: string, action: string, params?: any) => void;
        dataLayer: any[];
    }
}
