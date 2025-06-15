import type { Metadata } from "next";
import { Container } from "@/app/components/Container";
import { generateMetadata, siteConfig } from "@/app/components/SEO";
import PageNavigation from "@/app/components/PageNavigation";
import MobileNav from "@/app/components/MobileNav";
import Hero from "@/app/components/Hero";
import Section from "@/app/components/Section";
import SocialLinkCard, { SocialLinkData } from "@/app/components/SocialLinkCard";
import TimelineEntry, { TimelineEntryData } from "@/app/components/TimelineEntry";
import YouTubeEmbed from "@/app/components/YouTubeEmbed";
import ProfileItem from "@/app/components/ProfileItem";

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      {/* Integrated navigation */}
      <div className="fixed top-4 right-4 z-50">
        <div className="hidden md:block">
          <PageNavigation />
        </div>
        <div className="block md:hidden">
          <MobileNav />
        </div>
      </div>

      {/* Hero section */}
      <Hero
        title={siteConfig.name}
        subtitle="歌い手 | Vocalist"
        description={siteConfig.description}
        imageSrc="/profile.png"
        imageAlt="ながたかな"
      />

      {/* Main content */}
      <Container size="lg" className="py-12 md:py-16">
        {/* About section */}
        <Section id="about" title="About">
          <div className="max-w-3xl mx-auto">
            <div className="prose max-w-none dark:prose-invert">
              <p className="mb-4 text-base">
                2021年12月 YouTubeにて活動を開始。
                ボカロ曲を中心に歌ってみた動画の投稿を続けております。
                みなさまの心に届くような歌声を目指して、これからも活動を続けていきたいです。
                よかったら遊びにきてくださいね！
              </p>
            </div>
          </div>
        </Section>

        {/* Profile section */}
        <Section id="profile" title="Profile" animationDelay="animate-delay-50">
          <div className="max-w-3xl mx-auto">
            <div className="prose max-w-none dark:prose-invert">
              <dl className="space-y-2">
                <ProfileItem label="身長">ながいです。</ProfileItem>
                <ProfileItem label="体重">浮力に負けます。</ProfileItem>
                <ProfileItem label="年齢">私のいない宇宙って、それ存在しないも同然なのですよね。従って、おそらく150億年以上です。</ProfileItem>
                <ProfileItem label="お誕生日">4/11です。プレゼントお待ちしております。</ProfileItem>
                <ProfileItem label="得意なこと">お歌と数学です。</ProfileItem>
                <ProfileItem label="星座">ピザ</ProfileItem>
              </dl>
            </div>
          </div>
        </Section>

        {/* YouTube section */}
        <Section id="videos" title="Latest Videos" animationDelay="animate-delay-100">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
            <YouTubeEmbed
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?si=7C_sU_ZCgZmRAY8p&amp;list=PLthQZA1nE6DLzxQZfPr4LHaUFHOe3zt71"
              title="YouTube プレイリスト"
            />
          </div>
        </Section>

        {/* SNS section */}
        <Section id="connect" title="Connect" animationDelay="animate-delay-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialLinks.map((link, index) => (
              <SocialLinkCard
                key={index}
                link={link}
                className={`opacity-0 animate-fade-in animate-delay-${String((index % 5) + 1)}00`}
              />
            ))}
          </div>
        </Section>

        {/* Timeline section */}
        <Section id="history" title="History" animationDelay="animate-delay-300">
          <div className="max-w-2xl mx-auto">
            <TimelineEntry
              title="今日"
              description="みなさまが私と出会えた記念すべき日である可能性が高いわけですね。"
              useDynamicDate
              className="opacity-0 animate-slide-in animate-delay-100"
            />
            {timelineEntries.map((entry, index) => (
              <TimelineEntry
                key={index}
                entry={entry}
                isLast={index === timelineEntries.length - 1}
                className={`opacity-0 animate-slide-in animate-delay-${String((index % 5) + 1)}00`}
              />
            ))}
          </div>
        </Section>

        {/* Contact section */}
        <Section id="contact" title="Contact" animationDelay="animate-delay-400">
          <div className="max-w-3xl mx-auto">
            <div className="prose max-w-none dark:prose-invert">
              <p className="mb-4 text-base text-center">
                コラボのお誘いは、X の DM までぜひです。
              </p>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
