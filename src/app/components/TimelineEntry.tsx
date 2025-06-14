"use client";

import React, { useEffect, useState } from "react";

// Timeline entry data type
export type TimelineEntryData = {
    date: string;
    title: string;
    description: string;
};

/**
 * Formats the current date as yyyy年mm月dd日
 */
export const formatCurrentDate = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // getMonth() returns 0-11
    const day = now.getDate();

    return `${String(year)}年${String(month)}月${String(day)}日`;
};

/**
 * TimelineEntry component
 * 
 * Renders a timeline entry with date, title, and description in a simple two-column layout
 * Supports both static dates and dynamic (current) date that updates automatically
 */
export const TimelineEntry: React.FC<{
    entry?: TimelineEntryData;
    title?: string;
    description?: string;
    useDynamicDate?: boolean;
    isLast?: boolean;
    className?: string
}> = ({
    entry,
    title,
    description,
    useDynamicDate = false,
    isLast = false,
    className = ""
}) => {
        const [currentDate, setCurrentDate] = useState<string>("");

        // Use entry properties if provided, otherwise use direct props
        const displayTitle = entry?.title ?? title ?? "";
        const displayDescription = entry?.description ?? description ?? "";

        useEffect(() => {
            if (useDynamicDate) {
                // Set initial date
                setCurrentDate(formatCurrentDate());

                // Update date every hour (sufficient for date changes)
                const timer = setInterval(() => {
                    setCurrentDate(formatCurrentDate());
                }, 1000 * 60 * 60);

                return () => {
                    clearInterval(timer);
                };
            }
            return undefined
        }, [useDynamicDate]);

        // Determine which date to display
        const displayDate = useDynamicDate ? currentDate : entry?.date ?? "";

        return (
            <div className={`flex mb-8 ${isLast ? 'mb-0' : ''} ${className}`}>
                <div className="w-1/4 pr-4">
                    <time className="text-sm text-gray-700 dark:text-gray-300 block font-medium">
                        {displayDate}
                    </time>
                </div>
                <div className="w-3/4">
                    <h3 className="text-lg font-bold mb-2">{displayTitle}</h3>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                        {displayDescription}
                    </p>
                </div>
            </div>
        );
    };

export default TimelineEntry;
