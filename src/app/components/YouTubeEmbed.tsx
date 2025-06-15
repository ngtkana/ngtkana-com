"use client";

import React, { useEffect, useRef } from "react";
import { trackEvent } from "@/app/utils/analytics";
import { GA_EVENTS, VIDEO_PLATFORMS } from "@/app/constants/analytics";

interface YouTubeEmbedProps {
    src: string;
    title: string;
    className?: string;
}

/**
 * YouTubeEmbed component
 * 
 * A wrapper for YouTube iframes that tracks interactions with GA4
 */
const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
    src,
    title,
    className = "",
}) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        // Track when the component is mounted (video is shown)
        trackEvent(GA_EVENTS.VIDEO_IMPRESSION, {
            platform: VIDEO_PLATFORMS.YOUTUBE,
            video_url: src,
            video_title: title,
        });

        // Add message listener for YouTube iframe API events
        const handleMessage = (event: MessageEvent) => {
            // Only process messages from YouTube
            if (
                event.origin !== "https://www.youtube.com" &&
                event.origin !== "https://youtube.com"
            ) {
                return;
            }

            try {
                // Try to parse the message data safely
                let data;
                if (typeof event.data === "string") {
                    try {
                        data = JSON.parse(event.data);
                    } catch {
                        // Invalid JSON, ignore this message
                        return;
                    }
                } else {
                    data = event.data;
                }

                // Validate the data structure before using it
                if (!data || typeof data !== 'object') {
                    return;
                }

                // Type guard function to validate YouTube event data
                const isYouTubePlayerStateEvent = (
                    obj: unknown
                ): obj is { event: string; info: number } => {
                    return (
                        typeof obj === 'object' &&
                        obj !== null &&
                        'event' in obj &&
                        typeof (obj as { event: unknown }).event === 'string' &&
                        (obj as { event: string }).event === "onStateChange" &&
                        'info' in obj &&
                        typeof (obj as { info: unknown }).info === 'number'
                    );
                };

                // Check if this is a YouTube player event
                if (isYouTubePlayerStateEvent(data)) {
                    // Track different player states
                    switch (data.info) {
                        case 0: // ended
                            trackEvent(GA_EVENTS.VIDEO_COMPLETE, {
                                platform: VIDEO_PLATFORMS.YOUTUBE,
                                video_url: src,
                                video_title: title,
                            });
                            break;
                        case 1: // playing
                            trackEvent(GA_EVENTS.VIDEO_PLAY, {
                                platform: VIDEO_PLATFORMS.YOUTUBE,
                                video_url: src,
                                video_title: title,
                            });
                            break;
                        case 2: // paused
                            trackEvent(GA_EVENTS.VIDEO_PAUSE, {
                                platform: VIDEO_PLATFORMS.YOUTUBE,
                                video_url: src,
                                video_title: title,
                            });
                            break;
                    }
                }
            } catch (error) {
                // Silently fail if we can't parse the message
                console.debug("Error processing YouTube message", error);
            }
        };

        // Add event listener
        window.addEventListener("message", handleMessage);

        // Clean up
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [src, title]);

    return (
        <iframe
            ref={iframeRef}
            className={className}
            src={`${src}${src.includes("?") ? "&" : "?"}enablejsapi=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
        ></iframe>
    );
};

export default YouTubeEmbed;
