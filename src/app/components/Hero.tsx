"use client";

import { Container } from "@/app/components/Container";
import { useState } from "react";
import ResponsiveImage from "@/app/components/ResponsiveImage";

interface HeroProps {
    /** Title text for the hero section */
    title: string;
    /** Subtitle text */
    subtitle?: string;
    /** Description text */
    description?: string;
    /** Image source */
    imageSrc: string;
    /** Image alt text */
    imageAlt: string;
}

/**
 * Hero component
 * 
 * A reusable hero section component that can be used on multiple pages
 * with different content.
 */
export default function Hero({
    title,
    subtitle,
    description,
    imageSrc,
    imageAlt,
}: HeroProps) {
    // Prepare image paths for the ResponsiveImage component
    const getImageBasePath = () => {
        if (imageSrc === "/profile.png") {
            return "/images/profile";
        }
        return imageSrc.replace(/\.[^/.]+$/, ""); // Remove extension if any
    };
    return (
        <div
            className="w-full h-[90vh] relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#fffaf5] to-[#ffd6aa] dark:from-[#1a1410] dark:to-[#3d2e24]"
            role="banner"
            aria-labelledby="hero-title"
        >
            {/* Circular accent element */}
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-[rgba(255,170,85,0.3)] dark:bg-[rgba(255,138,60,0.2)] z-[1]"></div>

            <ResponsiveImage
                baseSrc={getImageBasePath()}
                alt={imageAlt}
                fill
                className="object-cover object-top md:object-contain md:object-center z-[2]"
                priority
                mobileWidth={480}
                desktopWidth={720}
                quality={85}
                style={{ zIndex: 2 }}
            />
            <div className="absolute inset-0 bg-black/5 z-[3]"></div>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-[4] bg-gradient-to-t from-black/80 to-transparent">
                <Container size="lg">
                    <h1 id="hero-title" className="text-4xl md:text-6xl font-bold text-white mb-3">
                        {title}
                    </h1>
                    {subtitle && (
                        <h2 className="text-xl md:text-2xl text-white/90 mb-4">
                            {subtitle}
                        </h2>
                    )}
                    {description && (
                        <p className="text-base text-white/70 max-w-2xl">
                            {description}
                        </p>
                    )}
                </Container>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
