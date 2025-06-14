"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface YouTubeEmbedProps {
    /** YouTube video or playlist ID */
    id: string;
    /** Whether this is a playlist or a single video */
    isPlaylist: boolean;
    /** Title for accessibility */
    title: string;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Optimized YouTube embed component
 * 
 * Displays a thumbnail first and loads the actual iframe only when clicked
 * This improves initial page load performance
 */
export default function YouTubeEmbed({
    id,
    isPlaylist = false,
    title,
    className = "",
}: YouTubeEmbedProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Generate the appropriate YouTube URL
    const youtubeUrl = isPlaylist
        ? `https://www.youtube.com/embed/videoseries?list=${id}`
        : `https://www.youtube.com/embed/${id}`;

    // Generate the thumbnail URL
    // For playlists, we use the first video's thumbnail or a fallback color
    const thumbnailUrl = isPlaylist
        ? `https://i.ytimg.com/vi_webp/${id.split('?')[0] ?? ""}/maxresdefault.webp`
        : `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

    const loadVideo = () => {
        setIsLoaded(true);
        // Focus on the iframe for better accessibility
        if (iframeRef.current) {
            iframeRef.current.focus();
        }
    };

    return (
        <div className={`relative w-full aspect-video rounded-xl overflow-hidden shadow-xl ${className}`}>
            {!isLoaded ? (
                // Thumbnail with play button overlay
                <button
                    onClick={loadVideo}
                    className="w-full h-full flex items-center justify-center group"
                    aria-label={`${title}を再生する`}
                >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                    <Image
                        src={thumbnailUrl}
                        alt={`${title}のサムネイル`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </button>
            ) : (
                // YouTube iframe (only loaded after clicking the thumbnail)
                <iframe
                    ref={iframeRef}
                    className="absolute top-0 left-0 w-full h-full"
                    src={youtubeUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    tabIndex={0}
                ></iframe>
            )}
        </div>
    );
}
