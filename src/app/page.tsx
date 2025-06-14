import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/app/components/Container";
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
 * Integrated landing page featuring profile information, YouTube embed,
 * and social media links.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/home.png"
              alt="バックグラウンド画像"
              fill
              className="object-cover opacity-30"
              priority
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {siteConfig.name}
          </h1>
          <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto">
            {siteConfig.description}
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Profile Section */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="sticky top-24">
              <div className="relative aspect-9/16 rounded-lg overflow-hidden bg-muted mb-6 shadow-md">
                <Image
                  src="/profile.png"
                  alt="プロフィール画像"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="space-y-4">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p>
                    2021年12月に、YouTubeにて活動を開始。
                    ボカロ曲を中心に、歌ってみた動画を投稿しております。
                  </p>
                  <p>よかったら遊びにきてね！</p>
                </div>

                <div className="border-t border-border pt-4 mt-6">
                  <h2 className="text-lg font-bold mb-3">活動履歴</h2>
                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4 py-1">
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        2021年12月
                      </time>
                      <div className="font-medium">YouTubeチャンネル開設</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-7 lg:col-span-8">
            {/* YouTube embed */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border">最新の動画</h2>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/videoseries?si=7C_sU_ZCgZmRAY8p&amp;list=PLthQZA1nE6DLzxQZfPr4LHaUFHOe3zt71"
                  title="YouTube プレイリスト"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </section>

            {/* SNS Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border">SNS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="https://www.youtube.com/@ngtkana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-wrap sm:flex-nowrap items-start sm:items-center p-4 bg-muted rounded-lg hover:bg-opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-primary h-full"
                  aria-label="YouTube チャンネル @ngtkana"
                >
                  <div className="mr-4 text-red-500 mb-2 sm:mb-0">
                    <Icon name="youtube" size="lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">YouTube</h3>
                    <p className="text-gray-600 dark:text-gray-400">@ngtkana</p>
                    <p className="text-sm mt-1">
                      ボカロ曲を中心に、歌ってみた動画を投稿しております。
                    </p>
                  </div>
                </a>

                <a
                  href="https://x.com/ngtkana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-wrap sm:flex-nowrap items-start sm:items-center p-4 bg-muted rounded-lg hover:bg-opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-primary h-full"
                  aria-label="X (Twitter) アカウント @ngtkana"
                >
                  <div className="mr-4 text-blue-500 mb-2 sm:mb-0">
                    <Icon name="twitter" size="lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">X (Twitter)</h3>
                    <p className="text-gray-600 dark:text-gray-400">@ngtkana</p>
                    <p className="text-sm mt-1">
                      新作のダジャレを投稿しております。
                    </p>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
