/**
 * Base site configuration, shared across pages
 */
export const siteConfig = {
  name: "ながたかな",
  description: "広がるお歌の世界を、私の声で繋いでいきたいです。",
  url: "https://ngtkana.com",
  ogImage: "/og-image.jpg",
  twitterHandle: "@ngtkana",
};

export interface PageMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

export interface ResolvedPageMeta {
  fullTitle: string;
  description: string;
  keywords: string[];
  ogImageUrl: string;
}

/**
 * Resolve page-specific metadata against the site defaults
 */
export function resolvePageMeta({
  title,
  description = siteConfig.description,
  keywords = [],
  ogImage = siteConfig.ogImage,
}: PageMeta = {}): ResolvedPageMeta {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | 歌い手`;

  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${siteConfig.url}${ogImage}`;

  return {
    fullTitle,
    description,
    keywords: ["ながたかな", "歌い手", "ボカロ", "歌ってみた", ...keywords],
    ogImageUrl,
  };
}
