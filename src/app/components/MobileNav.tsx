"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
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
        className={`absolute top-12 right-0 w-64 z-50 bg-background rounded-lg shadow-lg border border-border overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <nav className="p-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                href="/"
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
