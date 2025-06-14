"use client";

import React from "react";

// Timeline entry data type
export type TimelineEntryData = {
    date: string;
    title: string;
    description: string;
};

/**
 * TimelineEntry component
 * 
 * Renders a timeline entry with date, title, and description in a simple two-column layout
 */
export const TimelineEntry: React.FC<{ entry: TimelineEntryData; isLast?: boolean }> = ({
    entry,
    isLast = false
}) => {
    return (
        <div className={`flex mb-8 ${isLast ? 'mb-0' : ''}`}>
            <div className="w-1/4 pr-4">
                <time className="text-sm text-gray-500 dark:text-gray-400 block">
                    {entry.date}
                </time>
            </div>
            <div className="w-3/4">
                <h3 className="text-lg font-bold mb-2">{entry.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {entry.description}
                </p>
            </div>
        </div>
    );
};

export default TimelineEntry;
