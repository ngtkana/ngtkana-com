"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/app/components/Icon";
import { navLinks } from "@/app/constants/config";

/**
 * Navigation component
 *
 * Client component that handles the desktop navigation with active link highlighting
 */
export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block" aria-label="メインナビゲーション">
      <ul className="flex space-x-8">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`nav-link flex items-center ${
                pathname === link.path ? "active-nav-link" : ""
              }`}
            >
              <Icon name={link.icon} className="mr-2" size="sm" />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
