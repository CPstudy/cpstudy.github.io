"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="group relative">
      {/* 트리거 아이콘 */}
      <button className="relative flex h-8 w-8 cursor-pointer items-center justify-center text-foreground">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </button>

      {/* 드롭다운 패널 */}
      <div className="absolute right-0 top-full pt-1 hidden group-hover:block z-50">
        <div
          className="rounded-[10px] border border-border bg-popover p-1 shadow-md"
          style={{ minWidth: "8rem" }}
        >
          {(["Light", "Dark", "System"] as const).map((label) => (
            <button
              key={label}
              onClick={() => setTheme(label.toLowerCase())}
              className="
                w-full rounded-[8px] px-4 py-2
                text-left text-xs font-bold text-popover-foreground
                cursor-pointer select-none
                transition-colors
                hover:bg-accent hover:text-accent-foreground
                active:scale-95 active:bg-accent/70
              "
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
