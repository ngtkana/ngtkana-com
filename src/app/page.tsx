import Image from "next/image";
import type { Metadata } from "next";
import { LinkButton } from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import { generateMetadata, siteConfig } from "@/app/components/SEO";

// Define page-specific metadata
export const metadata: Metadata = generateMetadata({
  description:
    "ながたかなの公式ウェブサイトへようこそ。歌い手として活動しています。",
});

/**
 * HomePage component
 *
 * Landing page featuring background image, introduction, YouTube embed,
 * and social media links.
 */
export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/home.png"
            alt="ながたかな バックグラウンド画像"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {siteConfig.name}
        </h1>
        <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-2xl mx-auto">
          {siteConfig.description}
        </p>

        {/* YouTube embed */}
        <div className="relative w-full max-w-3xl mx-auto aspect-video mb-12 rounded-lg overflow-hidden shadow-2xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/videoseries?si=7C_sU_ZCgZmRAY8p&amp;list=PLthQZA1nE6DLzxQZfPr4LHaUFHOe3zt71"
            title="ながたかな YouTube プレイリスト"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-wrap justify-center gap-4 px-2">
          <LinkButton
            href={siteConfig.links.youtube}
            external
            variant="primary"
            className="bg-red-600 hover:bg-red-700 focus:ring-red-400"
            ariaLabel="YouTube チャンネルを開く"
            icon={<Icon name="youtube" />}
          >
            YouTube
          </LinkButton>

          <LinkButton
            href={siteConfig.links.twitter}
            external
            variant="primary"
            className="bg-black hover:bg-gray-800 focus:ring-blue-400"
            ariaLabel="X (Twitter) アカウントを開く"
            icon={<Icon name="twitter" />}
          >
            X (Twitter)
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
