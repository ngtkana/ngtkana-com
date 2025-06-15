"use client";

import React from "react";

interface ProfileItemProps {
    /** Label for the profile item */
    label: string;
    /** Content/value of the profile item */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

/**
 * ProfileItem component
 * 
 * A component for displaying profile information in a consistent format
 */
export default function ProfileItem({
    label,
    children,
    className = "",
}: ProfileItemProps) {
    return (
        <div className={`flex flex-col md:flex-row ${className}`}>
            <dt className="font-semibold mr-2 min-w-24">{label}</dt>
            <dd>{children}</dd>
        </div>
    );
}
