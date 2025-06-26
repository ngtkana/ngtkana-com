"use client";

import { useEffect, useState } from "react";


// Define the sections to link to
const sections = [
    { id: "about", label: "About" },
    { id: "profile", label: "Profile" },
    { id: "friend-codes", label: "Friend Codes" },
    { id: "videos", label: "Videos" },
    { id: "connect", label: "Connect" },
    { id: "history", label: "History" },
    { id: "contact", label: "Contact" },
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
        <nav className="fixed top-4 right-4 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full shadow-lg p-2 border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-xl">
            <ul className="flex space-x-1">
                {sections.map(({ id, label }) => (
                    <li key={id}>
                        <a
                            href={`#${id}`}
                            className={`nav-link block px-4 py-2 text-sm font-medium transition-all duration-300 ${activeSection === id
                                ? "active-nav-link text-accent font-semibold"
                                : "text-gray-800 dark:text-gray-200"
                                }`}
                            aria-current={activeSection === id ? "page" : undefined}
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
