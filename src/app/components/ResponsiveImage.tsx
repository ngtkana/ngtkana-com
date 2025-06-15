"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface ResponsiveImageProps extends Omit<ImageProps, 'src'> {
    /** Base image source path without extension */
    baseSrc: string;
    /** Image extension */
    ext?: string;
    /** Mobile image width */
    mobileWidth?: number;
    /** Desktop image width */
    desktopWidth?: number;
    /** Image alt text */
    alt: string;
}

/**
 * ResponsiveImage component
 * 
 * A component that loads different image sizes based on viewport width
 * and provides optimized loading with placeholders
 */
export default function ResponsiveImage({
    baseSrc,
    ext = "webp",
    mobileWidth = 480,
    desktopWidth = 720,
    alt,
    priority = false,
    quality = 85,
    ...props
}: ResponsiveImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    // Simple effect to ensure image is shown even if onLoad doesn't fire
    useEffect(() => {
        if (priority && !isLoaded) {
            const timer = setTimeout(() => {
                setIsLoaded(true);
            }, 1000); // Force loaded state after 1 second for priority images

            return () => {
                clearTimeout(timer);
            };
        }
    }, [priority, isLoaded]);

    // Generate the appropriate image source
    const getImageSrc = () => {
        // If it's already a full path with extension, use it as is
        if (baseSrc.includes('.')) {
            return baseSrc;
        }

        // Otherwise, construct the path with the extension
        return `${baseSrc}.${ext}`;
    };

    const src = getImageSrc();

    return (
        <>
            <Image
                src={src}
                alt={alt}
                className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${props.className ?? ''}`}
                priority={priority}
                fetchPriority={priority ? "high" : "auto"}
                sizes={`(max-width: ${String(mobileWidth)}px) ${String(mobileWidth)}px, ${String(desktopWidth)}px`}
                quality={quality}
                onLoad={() => {
                    setIsLoaded(true);
                }}
                {...props}
            />
        </>
    );
}
