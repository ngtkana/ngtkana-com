"use client";

import { useEffect, useState } from "react";


// Define the sections to link to
const sections = [
    { id: "about", label: "About" },
    { id: "videos", label: "Videos" },
    { id: "connect", label: "Connect" },
    { id: "history", label: "History" },
];


/**
 * PageNavigation component
 *
 * Provides in-page navigation links that are fixed to the top-right corner
 * of the viewport. Links scroll to the corresponding sections on the page.
 */
export default function PageNavigation() {
    const [activeSection, setActiveSection] = useState<string>("");

    // Handle intersection observer to highlight active section
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        // Create an observer for each section
        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (!element) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(id);
                        }
                    });
                },
                { threshold: 0.3 } // Trigger when 30% of the section is visible
            );

            observer.observe(element);
            observers.push(observer);
        });

        // Cleanup observers on unmount
        return () => {
            observers.forEach((observer) => { observer.disconnect(); });
        };
    }, []);

    return (
        <nav className="fixed top-4 right-4 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-lg p-2">
            <ul className="flex space-x-2">
                {sections.map(({ id, label }) => (
                    <li key={id}>
                        <a
                            href={`#${id}`}
                            className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === id
                                ? "bg-primary text-white"
                                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
