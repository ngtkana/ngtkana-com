import type { IconName } from "@/components/Icon.astro";

export interface NavSection {
  id: string;
  label: string;
  icon: IconName;
}

/** Section order must match the actual DOM order in src/pages/index.astro */
export const navSections: NavSection[] = [
  { id: "about", label: "About", icon: "info" },
  { id: "connect", label: "Connect", icon: "external-link" },
  { id: "videos", label: "Videos", icon: "youtube" },
  { id: "profile", label: "Profile", icon: "profile" },
  { id: "friend-codes", label: "Friend Codes", icon: "hash" },
  { id: "history", label: "History", icon: "clock" },
  { id: "contact", label: "Contact", icon: "mail" },
];
