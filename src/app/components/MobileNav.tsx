"use client";

import { useState, useEffect, useRef } from "react";
import Icon from "@/app/components/Icon";
import { useBreakpoint } from "@/app/hooks/useMediaQuery";

/**
 * MobileNav component - Responsive navigation for mobile devices
 *
 * Provides a hamburger menu that expands to show navigation links.
 * Includes keyboard navigation support and proper ARIA attributes for accessibility.
 */
export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isMediumScreen = useBreakpoint("md");

  // Close menu when screen size changes to medium or larger
  useEffect(() => {
    if (isMediumScreen && isOpen) {
      setIsOpen(false);
    }
  }, [isMediumScreen, isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu when pressing Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none focus:ring-2 focus:ring-primary rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-xl"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span
          className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          aria-hidden="true"
        ></span>
        <span
          className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"
            }`}
          aria-hidden="true"
        ></span>
        <span
          className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          aria-hidden="true"
        ></span>
      </button>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Menu Dropdown */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`absolute top-12 right-0 w-64 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${isOpen
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
          }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="mobile-menu-button"
      >
        <nav className="p-4">
          <ul className="flex flex-col space-y-4">
            <li role="none">
              <a
                href="#about"
                className="flex items-center py-2 px-3 my-1 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary"
                onClick={() => { setIsOpen(false); }}
                role="menuitem"
              >
                <Icon name="profile" className="mr-2" />
                About
              </a>
            </li>
            <li role="none">
              <a
                href="#videos"
                className="flex items-center py-2 px-3 my-1 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary"
                onClick={() => { setIsOpen(false); }}
                role="menuitem"
              >
                <Icon name="youtube" className="mr-2" />
                Videos
              </a>
            </li>
            <li role="none">
              <a
                href="#connect"
                className="flex items-center py-2 px-3 my-1 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary"
                onClick={() => { setIsOpen(false); }}
                role="menuitem"
              >
                <Icon name="external-link" className="mr-2" />
                Connect
              </a>
            </li>
            <li role="none">
              <a
                href="#history"
                className="flex items-center py-2 px-3 my-1 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary"
                onClick={() => { setIsOpen(false); }}
                role="menuitem"
              >
                <Icon name="blog" className="mr-2" />
                History
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
