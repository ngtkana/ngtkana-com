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
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
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
          content="#ffaa55"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1a1410"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="canonical" href={siteConfig.url.toString()} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="skip-link"
        >
          コンテンツにスキップ
        </a>
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <footer className="py-12 bg-gray-100 dark:bg-gray-800 mt-0 relative z-[10]">
          <Container size="lg">
            <div className="text-center">
              <p className="text-base text-gray-600 dark:text-gray-400">
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
