import { Metadata } from "next";

/**
 * Base metadata for the entire site
 */
export const siteConfig = {
  name: "ながたかな",
  description: "広がるお歌の世界を、私の声で繋いでいきたいです。",
  url: "https://ngtkana.com",
  ogImage: "/og-image.jpg",
  links: {
    youtube: "https://www.youtube.com/@ngtkana",
    twitter: "https://x.com/ngtkana",
  },
};

/**
 * SEO metadata interface
 */
interface SEOProps {
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
  /** Page-specific keywords */
  keywords?: string[];
  /** Open Graph image */
  ogImage?: string;
  /** Twitter card type */
  twitterCard?: "summary" | "summary_large_image";
}

/**
 * Generate metadata for a page
 *
 * @param props SEO properties
 * @returns Next.js Metadata object
 */
export function generateMetadata({
  title,
  description = siteConfig.description,
  keywords = [],
  ogImage = siteConfig.ogImage,
  twitterCard = "summary_large_image",
}: SEOProps): Metadata {
  // Construct full title
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | 歌い手`;

  // Construct full URL for OG image
  const ogImageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${siteConfig.url}${ogImage}`;

  return {
    title: fullTitle,
    description,
    keywords: ["ながたかな", "歌い手", "ボカロ", "歌ってみた", ...keywords],
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: siteConfig.url,
      title: fullTitle,
      description: description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description: description,
      creator: "@ngtkana",
    },
    metadataBase: new URL(siteConfig.url),
  };
}
