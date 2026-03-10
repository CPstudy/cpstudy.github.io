/**
 * Discord-inspired color tokens
 * CSS 변수는 globals.css의 :root / .dark 에서 정의됨
 * 이 파일은 토큰 이름과 의미를 문서화하는 참조용
 */

export const colors = {
  // Brand
  blurple: "#5865f2",

  // Semantic (CSS 변수와 매핑)
  background: "var(--background)",
  foreground: "var(--foreground)",
  primary: "var(--primary)",
  primaryForeground: "var(--primary-foreground)",
  secondary: "var(--secondary)",
  secondaryForeground: "var(--secondary-foreground)",
  muted: "var(--muted)",
  mutedForeground: "var(--muted-foreground)",
  accent: "var(--accent)",
  accentForeground: "var(--accent-foreground)",
  destructive: "var(--destructive)",
  border: "var(--border)",
  input: "var(--input)",
  ring: "var(--ring)",
  card: "var(--card)",
  cardForeground: "var(--card-foreground)",
  popover: "var(--popover)",
  popoverForeground: "var(--popover-foreground)",

  // Discord raw palette (light)
  light: {
    background: "#ffffff",
    foreground: "#060607",
    card: "#f2f3f5",
    secondary: "#e3e5e8",
    muted: "#ebedef",
    mutedForeground: "#4f5660",
    border: "#e3e5e8",
    destructive: "#da373c",
  },

  // Discord raw palette (dark)
  dark: {
    background: "#313338",
    foreground: "#dbdee1",
    card: "#2b2d31",
    popover: "#1e1f22",
    secondary: "#404249",
    muted: "#383a40",
    mutedForeground: "#949ba4",
    accent: "#3f4147",
    border: "#1e1f22",
    input: "#1e1f22",
    destructive: "#da373c",
  },
} as const;
