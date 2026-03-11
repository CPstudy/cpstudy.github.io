import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border h-12">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold hover:text-primary transition-colors"
        >
          dev.blog
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}
