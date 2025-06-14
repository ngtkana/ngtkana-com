import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/app/components/Container";
import Icon from "@/app/components/Icon";
import { generateMetadata, siteConfig } from "@/app/components/SEO";
import PageNavigation from "@/app/components/PageNavigation";

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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Page navigation */}
      <PageNavigation />

      {/* Hero section with full viewport height */}
      <div className="w-full h-screen relative flex items-center justify-center">
        <Image
          src="/profile.png"
          alt="ながたかな"
          fill
          className="object-cover object-top md:object-contain md:object-center"
          priority
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/10 z-10"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-20 bg-gradient-to-t from-black/80 to-transparent">
          <Container size="lg">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {siteConfig.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-white/90 mb-6">
              歌い手 | Vocalist
            </h2>
            <p className="text-lg md:text-l text-white/50 max-w-2xl">
              {siteConfig.description}
            </p>
          </Container>
        </div>
      </div>

      {/* Main content */}
      <Container size="lg" className="py-16 md:py-24">
        {/* About section */}
        <section id="about" className="mb-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">About</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="mb-6 text-xl">
                2021年12月に、YouTubeにて活動を開始。
                ボカロ曲を中心に、歌ってみた動画を投稿しております。
                みんなの心に届くような歌声を目指して、これからも活動を続けていきたいです。
                よかったら遊びにきてね！
              </p>
            </div>
          </div>
        </section>

        {/* YouTube section */}
        <section id="videos" className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Latest Videos</h2>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
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

        {/* SNS section */}
        <section id="connect" className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <a
              href="https://www.youtube.com/@ngtkana"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="YouTube チャンネル @ngtkana"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4 text-red-500 text-4xl">
                  <Icon name="youtube" size="xl" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl group-hover:text-red-500 transition-colors">YouTube</h3>
                  <p className="text-gray-600 dark:text-gray-400">@ngtkana</p>
                </div>
              </div>
              <p className="text-lg">
                ボカロ曲を中心に、歌ってみた動画を投稿しております。
              </p>
            </a>

            <a
              href="https://x.com/ngtkana"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="X (Twitter) アカウント @ngtkana"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4 text-blue-500 text-4xl">
                  <Icon name="twitter" size="xl" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl group-hover:text-blue-500 transition-colors">X (Twitter)</h3>
                  <p className="text-gray-600 dark:text-gray-400">@ngtkana</p>
                </div>
              </div>
              <p className="text-lg">
                新作のダジャレを投稿しております。
              </p>
            </a>

            <a
              href="https://www.twitch.tv/ngtkana"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Twitch チャンネル ngtkana"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4 text-purple-500 text-4xl">
                  <Icon name="twitch" size="xl" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl group-hover:text-purple-500 transition-colors">Twitch</h3>
                  <p className="text-gray-600 dark:text-gray-400">ngtkana</p>
                </div>
              </div>
              <p className="text-lg">
                不定期でゲーム配信が行われているともっぱらの噂です。
              </p>
            </a>

            <a
              href="https://www.nicovideo.jp/user/97990641"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="ニコニコ動画 ユーザー"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4 text-teal-500 text-4xl">
                  <Icon name="niconico" size="xl" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl group-hover:text-teal-500 transition-colors">ニコニコ動画</h3>
                  <p className="text-gray-600 dark:text-gray-400">user/97990641</p>
                </div>
              </div>
              <p className="text-lg">
                なんとこちらにも歌ってみた動画が投稿されております。お得ですね。
              </p>
            </a>

            <a
              href="https://ngtkana.hatenablog.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="はてなブログ"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4 text-green-500 text-4xl">
                  <Icon name="blog" size="xl" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl group-hover:text-green-500 transition-colors">はてなブログ</h3>
                  <p className="text-gray-600 dark:text-gray-400">ngtkana</p>
                </div>
              </div>
              <p className="text-lg">
                実質ゴミ箱。しかし私くらい高貴な人物になるとゴミ箱さえ宝箱なのです。
              </p>
            </a>

            <a
              href="https://atcoder.jp/users/ngtkana"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="AtCoder プロフィール"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4 text-yellow-500 text-4xl">
                  <Icon name="atcoder" size="xl" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl group-hover:text-yellow-500 transition-colors">AtCoder</h3>
                  <p className="text-gray-600 dark:text-gray-400">ngtkana</p>
                </div>
              </div>
              <p className="text-lg">
                昔はワシも競プロをしておったのじゃ。
              </p>
            </a>

            <a
              href="https://github.com/ngtkana"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="GitHub プロフィール"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4 text-gray-700 dark:text-gray-300 text-4xl">
                  <Icon name="github" size="xl" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">GitHub</h3>
                  <p className="text-gray-600 dark:text-gray-400">ngtkana</p>
                </div>
              </div>
              <p className="text-lg">
                ac-adapter-rs という Rust 競プロライブラリがウリです。
              </p>
            </a>

            <a
              href="https://discord.com/invite/RmRCzPnFPc"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Discord サーバー"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4 text-indigo-500 text-4xl">
                  <Icon name="discord" size="xl" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl group-hover:text-indigo-500 transition-colors">kyoprusteseans</h3>
                  <p className="text-gray-600 dark:text-gray-400">Discord</p>
                </div>
              </div>
              <p className="text-lg">
                Rust で競プロをされる方、通称 kyoprustecean のみなさまの会です。このサーバーは public です。
              </p>
            </a>
          </div>
        </section>

        {/* Timeline section */}
        <section id="history">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">History</h2>
          <div className="max-w-2xl mx-auto">
            <div className="relative pl-8 pb-12 border-l-2 border-primary">
              <div className="absolute top-0 left-0 w-4 h-4 bg-primary rounded-full -translate-x-1/2"></div>
              <time className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                2021年12月
              </time>
              <h3 className="text-xl font-bold mb-2">YouTubeチャンネル開設</h3>
              <p className="text-gray-600 dark:text-gray-400">
                ボカロ曲を中心に、歌ってみた動画の投稿を開始しました。
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
