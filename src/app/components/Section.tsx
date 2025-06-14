"use client";

import React from "react";

interface SectionProps {
    /** Section ID for navigation */
    id: string;
    /** Section title */
    title: string;
    /** Section content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Animation delay class (e.g., "animate-delay-100") */
    animationDelay?: string;
}

/**
 * Section component
 * 
 * A reusable section component with consistent styling and animations
 */
export default function Section({
    id,
    title,
    children,
    className = "",
    animationDelay = "",
}: SectionProps) {
    // Common section heading style
    const headingClass = "text-2xl md:text-3xl font-bold mb-6 text-center";

    // Base animation classes
    const animationClass = "opacity-0 animate-slide-up";

    return (
        <section
            id={id}
            className={`mb-16 ${animationClass} ${animationDelay} ${className}`}
            aria-labelledby={`${id}-heading`}
        >
            <h2 id={`${id}-heading`} className={headingClass}>
                {title}
            </h2>
            {children}
        </section>
    );
}
