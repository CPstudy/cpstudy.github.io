import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
  { label: "실시간지하철", href: "/silsiganmetro" },
  { label: "엘베인포", href: "/elevinfo" },
  { label: "블로그", href: "/blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur h-12">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold hover:text-primary transition-colors"
          >
            CPstudy
          </Link>
          <nav className="hidden sm:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
