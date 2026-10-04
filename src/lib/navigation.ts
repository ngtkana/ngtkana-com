import type { IconName } from "@/components/Icon.astro";

export interface NavSection {
  id: string;
  label: string;
  icon: IconName;
}

/** Section order must match the actual DOM order in src/pages/index.astro */
export const navSections: NavSection[] = [
  { id: "about", label: "ごあいさつ", icon: "info" },
  { id: "connect", label: "リンク", icon: "external-link" },
  { id: "videos", label: "動画", icon: "youtube" },
  { id: "profile", label: "プロフィール", icon: "profile" },
  { id: "friend-codes", label: "フレンドコード", icon: "hash" },
  { id: "history", label: "あゆみ", icon: "clock" },
  { id: "contact", label: "お問い合わせ", icon: "mail" },
];
