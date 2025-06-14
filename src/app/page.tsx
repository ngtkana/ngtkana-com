import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/app/components/Container";
import { generateMetadata, siteConfig } from "@/app/components/SEO";
import PageNavigation from "@/app/components/PageNavigation";
import SocialLinkCard, { SocialLinkData } from "@/app/components/SocialLinkCard";
import TimelineEntry, { TimelineEntryData } from "@/app/components/TimelineEntry";

// Define page-specific metadata
export const metadata: Metadata = generateMetadata({
  description:
    "ながたかなの公式ウェブサイトへようこそ。歌い手として活動しています。",
});

// Social media links data
const socialLinks: SocialLinkData[] = [
  {
    name: "YouTube",
    username: "@ngtkana",
    url: "https://www.youtube.com/@ngtkana",
    iconName: "youtube",
    iconColor: "text-red-500",
    description: "ボカロ曲を中心に、歌ってみた動画を投稿しております。",
    ariaLabel: "YouTube チャンネル @ngtkana",
  },
  {
    name: "X (Twitter)",
    username: "@ngtkana",
    url: "https://x.com/ngtkana",
    iconName: "twitter",
    iconColor: "text-blue-500",
    description: "新作のダジャレを投稿しております。",
    ariaLabel: "X (Twitter) アカウント @ngtkana",
  },
  {
    name: "Twitch",
    username: "ngtkana",
    url: "https://www.twitch.tv/ngtkana",
    iconName: "twitch",
    iconColor: "text-purple-500",
    description: "不定期でゲーム配信が行われているともっぱらの噂です。",
    ariaLabel: "Twitch チャンネル ngtkana",
  },
  {
    name: "ニコニコ動画",
    username: "user/97990641",
    url: "https://www.nicovideo.jp/user/97990641",
    iconName: "niconico",
    iconColor: "text-teal-500",
    description: "なんとこちらにも歌ってみた動画が投稿されております。お得ですね。",
    ariaLabel: "ニコニコ動画 ユーザー",
  },
  {
    name: "はてなブログ",
    username: "ngtkana",
    url: "https://ngtkana.hatenablog.com/",
    iconName: "blog",
    iconColor: "text-green-500",
    description: "実質ゴミ箱。しかし私くらい高貴な人物になるとゴミ箱さえ宝箱なのです。",
    ariaLabel: "はてなブログ",
  },
  {
    name: "AtCoder",
    username: "ngtkana",
    url: "https://atcoder.jp/users/ngtkana",
    iconName: "atcoder",
    iconColor: "text-yellow-500",
    description: "昔はワシも競プロをしておったのじゃ。",
    ariaLabel: "AtCoder プロフィール",
  },
  {
    name: "GitHub",
    username: "ngtkana",
    url: "https://github.com/ngtkana",
    iconName: "github",
    iconColor: "text-gray-700 dark:text-gray-300",
    description: "ac-adapter-rs という Rust 競プロライブラリがウリです。",
    ariaLabel: "GitHub プロフィール",
  },
  {
    name: "kyoprusteseans",
    username: "Discord",
    url: "https://discord.com/invite/RmRCzPnFPc",
    iconName: "discord",
    iconColor: "text-indigo-500",
    description: "競プロにおける Rust に興味がある人のための Discord サーバーです。",
    ariaLabel: "Discord サーバー",
  },
];

// Timeline entries data
const timelineEntries: TimelineEntryData[] = [
  {
    date: "2024年8月1日",
    title: "カービィ使いになりました",
    description: "スマブラSPはこの子と一緒に戦っていきます。",
  },
  {
    date: "2023年9月28日",
    title: "3Dデビューしました",
    description: "実は初配信はツイキャス。",
  },
  {
    date: "2023年7月27日",
    title: "Twitch でゲーム配信を初めました",
    description: "当初は様々なゲームをしておりました。",
  },
  {
    date: "2021年12月4日",
    title: "YouTubeチャンネル開設",
    description: "ボカロ曲を中心に、歌ってみた動画の投稿を開始しました。",
  },
];

/**
 * HomePage component
 *
 * Integrated landing page featuring profile information, YouTube embed,
 * and social media links.
 */
export default function HomePage() {
  // Common section heading style
  const sectionHeadingClass = "text-2xl md:text-3xl font-bold mb-6 text-center";

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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
              {siteConfig.name}
            </h1>
            <h2 className="text-xl md:text-2xl text-white/90 mb-4">
              歌い手 | Vocalist
            </h2>
            <p className="text-base text-white/50 max-w-2xl">
              {siteConfig.description}
            </p>
          </Container>
        </div>
      </div>

      {/* Main content */}
      <Container size="lg" className="py-12 md:py-16">
        {/* About section */}
        <section id="about" className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className={sectionHeadingClass}>About</h2>
            <div className="prose max-w-none dark:prose-invert">
              <p className="mb-4 text-base">
                2021年12月 YouTubeにて活動を開始。
                ボカロ曲を中心に歌ってみた動画の投稿を続けております。
                みなさまの心に届くような歌声を目指して、これからも活動を続けていきたいです。
                よかったら遊びにきてくださいね！
              </p>
            </div>
          </div>
        </section>

        {/* YouTube section */}
        <section id="videos" className="mb-16">
          <h2 className={sectionHeadingClass}>Latest Videos</h2>
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
        <section id="connect" className="mb-16">
          <h2 className={sectionHeadingClass + " mb-8"}>Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialLinks.map((link, index) => (
              <SocialLinkCard key={index} link={link} />
            ))}
          </div>
        </section>

        {/* Timeline section */}
        <section id="history">
          <h2 className={sectionHeadingClass + " mb-8"}>History</h2>
          <div className="max-w-2xl mx-auto">
            {timelineEntries.map((entry, index) => (
              <TimelineEntry
                key={index}
                entry={entry}
                isLast={index === timelineEntries.length - 1}
              />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
