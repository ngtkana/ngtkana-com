"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
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

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span
          className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
          aria-hidden="true"
        ></span>
        <span
          className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        ></span>
        <span
          className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
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
        className={`absolute top-12 right-0 w-64 z-50 bg-background rounded-lg shadow-lg border border-border overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
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
              <Link
                href="/"
                className={`flex items-center py-2 transition-colors ${
                  pathname === "/"
                    ? "text-primary font-medium"
                    : "hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <Icon name="home" className="mr-2" />
                Home
              </Link>
            </li>
            <li role="none">
              <Link
                href="/profile"
                className={`flex items-center py-2 transition-colors ${
                  pathname === "/profile"
                    ? "text-primary font-medium"
                    : "hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <Icon name="profile" className="mr-2" />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
