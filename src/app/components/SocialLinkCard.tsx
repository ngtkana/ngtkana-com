"use client";

import React from "react";
import Icon, { IconName } from "@/app/components/Icon";
import { trackLinkClick, trackLinkIfVideo } from "@/app/utils/analytics";

// Social media link data type
export type SocialLinkData = {
    name: string;
    username: string;
    url: string;
    iconName: IconName;
    iconColor: string;
    description: string;
    ariaLabel: string;
};

// Map of platform names to their hover color classes
const hoverColorMap: Record<string, string> = {
    "YouTube": "group-hover:text-red-500",
    "X (Twitter)": "group-hover:text-blue-500",
    "Twitch": "group-hover:text-purple-500",
    "ニコニコ動画": "group-hover:text-teal-500",
    "はてなブログ": "group-hover:text-green-500",
    "AtCoder": "group-hover:text-yellow-500",
    "GitHub": "group-hover:text-gray-700 dark:group-hover:text-gray-300",
    "kyoprusteseans": "group-hover:text-indigo-500",
};

/**
 * SocialLinkCard component
 * 
 * Renders a social media link card with appropriate styling and hover effects
 */
export const SocialLinkCard: React.FC<{ link: SocialLinkData, className?: string }> = ({ link, className = "" }) => {
    // Get the appropriate hover color class for this platform
    const hoverColorClass = hoverColorMap[link.name] ?? "";

    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-300 ${className}`}
            aria-label={link.ariaLabel}
            onClick={() => {
                // Track all social links
                trackLinkClick('social', link.name, link.url);

                // Additionally track video platform links if applicable
                trackLinkIfVideo(link.name, link.username, link.url);
            }}
        >
            <div className="flex items-center mb-3">
                <div className={`mr-3 ${link.iconColor} text-3xl`}>
                    <Icon name={link.iconName} size="lg" />
                </div>
                <div>
                    <h3 className={`font-bold text-xl ${hoverColorClass} transition-colors`}>{link.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{link.username}</p>
                </div>
            </div>
            <p className="text-base text-gray-800 dark:text-gray-200">
                {link.description}
            </p>
        </a>
    );
};

export default SocialLinkCard;
