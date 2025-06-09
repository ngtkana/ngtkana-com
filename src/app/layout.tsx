import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "ながたかな | 歌い手",
  description: "広がるお歌の世界を、私の声で繋いでいきたいです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-border py-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              ながたかな
            </Link>
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Link href="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-border py-6 mt-12">
          <div className="container mx-auto text-center">
            <p className="text-sm text-gray-500">
              © 2025 ながたかな All Rights Reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
