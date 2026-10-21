import {
  BarChart3,
  BookA,
  BookOpen,
  BookText,
  Home,
  Languages,
  Layers,
  PenLine,
  type LucideIcon,
} from "lucide-react";

export type NavTo =
  | "/"
  | "/hiragana"
  | "/vocabulary"
  | "/kanji"
  | "/grammar"
  | "/reading"
  | "/cards"
  | "/progress";

export type NavItem = { to: NavTo; label: string; icon: LucideIcon };

export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/hiragana", label: "Kana", icon: Languages },
  { to: "/vocabulary", label: "Vocab", icon: BookOpen },
  { to: "/kanji", label: "Kanji", icon: BookA },
  { to: "/grammar", label: "Grammar", icon: PenLine },
  { to: "/reading", label: "Read", icon: BookText },
  { to: "/cards", label: "Cards", icon: Layers },
  { to: "/progress", label: "Progress", icon: BarChart3 },
];

/** Shown directly in the phone bottom bar; the rest live under "More". */
export const PRIMARY_NAV: NavTo[] = ["/", "/hiragana", "/vocabulary", "/kanji", "/grammar"];

export function isNavActive(to: NavTo, pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (to === "/") return path === "/";
  if (to === "/hiragana") return path.startsWith("/hiragana") || path.startsWith("/katakana");
  return path === to || path.startsWith(`${to}/`);
}
