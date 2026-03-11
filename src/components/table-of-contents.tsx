"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

const HEADER_OFFSET = 88;

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + HEADER_OFFSET + 4;

      let current = headings[0]?.id ?? "";
      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        목차
      </p>
      <ul className="space-y-1.5 text-sm border-l border-border pl-3">
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ paddingLeft: `${(level - 1) * 12}px` }}>
            <a
              href={`#${id}`}
              className={`block leading-snug transition-colors hover:text-foreground ${
                activeId === id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
