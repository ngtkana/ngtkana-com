import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Components
import { Container } from "@/app/components/Container";
import { siteConfig } from "@/app/components/SEO";

// Font configuration
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap", // Improves performance by allowing text to display in fallback font while custom font loads
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// SEO and metadata configuration
export const metadata: Metadata = {
  metadataBase: siteConfig.url,
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} | 歌い手`,
  },
  description: siteConfig.description,
  keywords: ["ながたかな", "歌い手", "ボカロ", "歌ってみた"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | 歌い手`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ngtkana",
    title: `${siteConfig.name} | 歌い手`,
    description: siteConfig.description,
  },
};

// Type definition for layout props
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout component that wraps all pages
 * Provides common header, navigation, and footer
 */
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="ja" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Add theme color meta tags directly */}
        <meta
          name="theme-color"
          content="#fffaf5"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1a1410"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          コンテンツにスキップ
        </a>
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <footer className="border-t border-border py-6 mt-8 md:mt-12">
          <Container>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} {siteConfig.name} All Rights
                Reserved.
              </p>
            </div>
          </Container>
        </footer>
      </body>
    </html>
  );
}
