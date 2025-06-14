import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/app/components/Container";
import Icon from "@/app/components/Icon";
import { generateMetadata } from "@/app/components/SEO";

// Define page-specific metadata
export const metadata: Metadata = generateMetadata({
  title: "Profile",
  description:
    "ながたかなのプロフィールページです。活動履歴やSNSリンクをご覧いただけます。",
  keywords: ["プロフィール", "活動履歴", "SNS"],
});

/**
 * ProfilePage component
 *
 * Displays the artist's profile information, social media links, and activity history.
 */
export default function ProfilePage() {
  return (
    <Container className="py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 pb-4 border-b border-border">
        Profile
      </h1>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="w-full md:w-1/3">
          <div className="relative w-full aspect-9/16 rounded-lg overflow-hidden bg-muted mb-6 shadow-md">
            <Image
              src="/profile.png"
              alt="ながたかなのプロフィール画像"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">ながたかな</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="mb-4">
                2021年12月に、YouTubeにて活動を開始。
                ボカロ曲を中心に、歌ってみた動画を投稿しております。
                みんなの心に届くような歌声を目指して、これからも活動を続けていきたいです。
              </p>
              <p>よかったら遊びにきてね！</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">SNS</h2>
            <div className="flex flex-col space-y-4">
              <a
                href="https://www.youtube.com/@ngtkana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-wrap sm:flex-nowrap items-start sm:items-center p-4 bg-muted rounded-lg hover:bg-opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="flex flex-wrap sm:flex-nowrap items-start sm:items-center p-4 bg-muted rounded-lg hover:bg-opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
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

          <section>
            <h2 className="text-2xl font-bold mb-4">活動履歴</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4 py-2">
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  2021年12月
                </time>
                <div className="font-medium">YouTubeチャンネル開設</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}
