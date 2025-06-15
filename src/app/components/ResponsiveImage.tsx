"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

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
    /** Optional placeholder image for LQIP */
    placeholderSrc?: string;
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
    placeholderSrc,
    priority = false,
    quality = 85,
    ...props
}: ResponsiveImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    // Determine the appropriate image source based on the path
    const getOptimizedSrc = () => {
        // If it's already a full path with extension, use it as is
        if (baseSrc.includes('.')) {
            return baseSrc;
        }

        // Otherwise, construct the path with the desktop width
        return `${baseSrc}.${ext}`;
    };

    // Generate the appropriate image URLs for different sizes
    const getImageUrls = () => {
        // If it's already a full path with extension, we can't generate responsive images
        if (baseSrc.includes('.')) {
            return {
                src: baseSrc,
                mobileImageUrl: baseSrc,
                desktopImageUrl: baseSrc
            };
        }

        const desktopImageUrl = `${baseSrc}.${ext}`;
        const mobileImageUrl = `${baseSrc}-${mobileWidth}.${ext}`;

        return {
            src: desktopImageUrl,
            mobileImageUrl,
            desktopImageUrl
        };
    };

    const { src, mobileImageUrl, desktopImageUrl } = getImageUrls();

    return (
        <>
            <Image
                src={src}
                alt={alt}
                className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${props.className || ''}`}
                priority={priority}
                fetchPriority={priority ? "high" : "auto"}
                sizes={`(max-width: ${mobileWidth}px) ${mobileWidth}px, ${desktopWidth}px`}
                quality={quality}
                onLoad={() => setIsLoaded(true)}
                blurDataURL={placeholderSrc}
                placeholder={placeholderSrc ? "blur" : undefined}
                {...props}
            />

            {/* Low quality placeholder image for immediate display */}
            {placeholderSrc && !isLoaded && (
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
                    style={{
                        backgroundImage: `url(${placeholderSrc})`,
                        opacity: 0.7,
                        zIndex: (props.style?.zIndex as number || 0) - 1
                    }}
                />
            )}
        </>
    );
}
