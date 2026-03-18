"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { InkTransitionLink } from "@/components/ink-transition-link";

const navItems = [
  { label: "실시간지하철", href: "/silsiganmetro", color: "rgba(152, 188, 76, 0.2)", glowColor: "#98BC4C40" },
  { label: "엘베인포", href: "/elevinfo", color: "rgba(32, 158, 173, 0.2)", glowColor: "#209EAD40" },
  { label: "블로그", href: "/blog" },
];

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  return (
    <header className={`sticky top-0 z-50 w-full h-12 ${transparent ? "" : "bg-background/95 backdrop-blur"}`}>
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold hover:text-primary transition-colors"
          >
            CPstudy
          </Link>
          <nav className="hidden sm:flex items-center gap-4">
            {navItems.map((item) =>
              item.color ? (
                <InkTransitionLink
                  key={item.href}
                  href={item.href}
                  color={item.color}
                  glowColor={item.glowColor!}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </InkTransitionLink>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
