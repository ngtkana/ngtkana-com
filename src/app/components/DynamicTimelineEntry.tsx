"use client";

import React, { useEffect, useState } from "react";

/**
 * DynamicTimelineEntry component
 * 
 * Renders a timeline entry with the current date that updates in real-time
 */
export const DynamicTimelineEntry: React.FC<{
    title: string;
    description: string;
    isLast?: boolean;
    className?: string
}> = ({
    title,
    description,
    isLast = false,
    className = ""
}) => {
        const [currentDate, setCurrentDate] = useState<string>("");

        useEffect(() => {
            // Function to format date as yyyy年mm月dd日
            const formatDate = () => {
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1; // getMonth() returns 0-11
                const day = now.getDate();

                return `${String(year)}年${String(month)}月${String(day)}日`;
            };

            // Set initial date
            setCurrentDate(formatDate());

            // Update date every day at midnight
            const timer = setInterval(() => {
                setCurrentDate(formatDate());
            }, 1000 * 60 * 60); // Check every hour (sufficient for date changes)

            return () => {
                clearInterval(timer);
            };
        }, []);

        return (
            <div className={`flex mb-8 ${isLast ? 'mb-0' : ''} ${className}`}>
                <div className="w-1/4 pr-4">
                    <time className="text-sm text-gray-700 dark:text-gray-300 block font-medium">
                        {currentDate}
                    </time>
                </div>
                <div className="w-3/4">
                    <h3 className="text-lg font-bold mb-2">{title}</h3>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                        {description}
                    </p>
                </div>
            </div>
        );
    };

export default DynamicTimelineEntry;
