"use client";

import React, { useEffect, useRef } from "react";
import { trackEvent } from "@/app/utils/analytics";

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
        trackEvent("video_impression", {
            platform: "YouTube",
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
                // Try to parse the message data
                const data = typeof event.data === "string"
                    ? JSON.parse(event.data)
                    : event.data;

                // Check if this is a YouTube player event
                if (data.event === "onStateChange") {
                    // Track different player states
                    switch (data.info) {
                        case 0: // ended
                            trackEvent("video_complete", {
                                platform: "YouTube",
                                video_url: src,
                                video_title: title,
                            });
                            break;
                        case 1: // playing
                            trackEvent("video_play", {
                                platform: "YouTube",
                                video_url: src,
                                video_title: title,
                            });
                            break;
                        case 2: // paused
                            trackEvent("video_pause", {
                                platform: "YouTube",
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
