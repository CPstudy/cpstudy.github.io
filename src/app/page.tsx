"use client";

import * as React from "react";
import {
  Github,
  Mail,
  ExternalLink,
  BriefcaseBusiness,
  User,
  FolderGit2,
  CalendarDays,
  FileText,
  Hash,
  Disc,
} from "lucide-react";
import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Portfolio() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#5865F2] selection:text-white">
      {/* Navbar (Notion-like top bar with Discord colors) */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border h-12 flex items-center px-4 justify-between transition-colors">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <span
            className="flex items-center gap-1 hover:text-foreground hover:bg-muted/50 px-2 py-1 rounded-sm cursor-pointer transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Disc className="h-4 w-4" />
            <span>hong-portfolio</span>
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-foreground flex items-center gap-1">
            <Hash className="h-3 w-3 text-muted-foreground" />
            home
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-16">
        {/* Header / Cover Area */}
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Cover Image: Discord Blurple */}
          <div className="w-full h-32 md:h-48 bg-[#5865F2] rounded-lg shadow-md mb-[-60px]" />

          <div className="px-4">
            {/* Icon */}
            <div className="relative mb-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-[6px] border-background shadow-sm text-4xl bg-background">
                <AvatarImage src="/placeholder-user.jpg" alt="Hong Gil-dong" />
                <AvatarFallback className="text-5xl bg-[#ebedef] dark:bg-[#1e1f22]">
                  🎮
                </AvatarFallback>
              </Avatar>
              <div
                className="absolute bottom-1 right-1 h-6 w-6 md:h-8 md:w-8 bg-[#23a559] border-4 border-background rounded-full"
                title="Online"
              ></div>
            </div>

            {/* Title */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Hong Gil-dong
              </h1>

              {/* Properties / Meta Info (Notion style list) */}
              <div className="flex flex-col gap-1 text-sm text-foreground/80">
                <div className="flex items-center gap-4 h-8">
                  <span className="w-24 flex items-center gap-2 text-muted-foreground">
                    <BriefcaseBusiness className="h-4 w-4" /> Role
                  </span>
                  <span className="bg-[#5865F2]/10 text-[#5865F2] px-2 py-0.5 rounded text-xs font-medium dark:bg-[#5865F2]/20 dark:text-[#5865F2]">
                    App Developer
                  </span>
                </div>
                <div className="flex items-center gap-4 h-8">
                  <span className="w-24 flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" /> Email
                  </span>
                  <a
                    href="mailto:hong@example.com"
                    className="hover:underline hover:text-[#00A8FC] transition-colors decoration-2 underline-offset-4"
                  >
                    hong@example.com
                  </a>
                </div>
                <div className="flex items-center gap-4 h-8">
                  <span className="w-24 flex items-center gap-2 text-muted-foreground">
                    <Github className="h-4 w-4" /> Github
                  </span>
                  <a
                    href="https://github.com"
                    target="_blank"
                    className="hover:underline hover:text-[#00A8FC] transition-colors decoration-2 underline-offset-4"
                  >
                    github.com/hong
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section id="intro" className="space-y-4 px-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b border-border text-foreground">
            Introduction
          </h2>
          <div className="prose dark:prose-invert max-w-none text-muted-foreground font-medium">
            <p className="leading-7">
              Hello! I&apos;m a passionate App Developer dedicated to crafting
              beautiful and functional digital experiences. I specialize in
              React Native and Next.js, bridging the gap between mobile and web.
            </p>
            {/* Discord/Notion Hybrid Callout */}
            <div className="p-4 bg-card rounded-[4px] border border-l-4 border-l-[#5865F2] flex gap-3 my-6 shadow-sm">
              <span className="text-xl">👋</span>
              <p className="m-0 self-center text-foreground font-medium">
                Currently open to new opportunities and interesting
                collaborations.
              </p>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="career" className="space-y-6 px-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b border-border text-foreground">
            Experience
          </h2>

          <div className="space-y-8 pl-1">
            {/* Experience Item 1 */}
            <div className="group relative border-l-2 border-border pl-6 pb-2">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-muted-foreground group-hover:bg-[#5865F2] transition-colors"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-foreground">
                  Senior App Developer
                </h3>
                <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                  2021 - Present
                </span>
              </div>
              <div className="text-sm text-[#00A8FC] font-medium mb-3">
                Tech Solutions Inc.
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1.5 text-muted-foreground text-sm leading-relaxed">
                <li>
                  Led a team of 5 developers in building cross-platform mobile
                  applications using{" "}
                  <span className="font-mono text-xs text-foreground bg-muted px-1 rounded">
                    React Native
                  </span>
                  .
                </li>
                <li>
                  Improved app performance by 40% through code optimization and
                  efficient state management.
                </li>
                <li>
                  Collaborated with UX/UI designers to implement pixel-perfect
                  interfaces.
                </li>
              </ul>
            </div>

            {/* Experience Item 2 */}
            <div className="group relative border-l-2 border-border pl-6 pb-2">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-muted-foreground group-hover:bg-[#5865F2] transition-colors"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-foreground">
                  Junior Web Developer
                </h3>
                <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                  2019 - 2021
                </span>
              </div>
              <div className="text-sm text-[#00A8FC] font-medium mb-3">
                Creative Agency
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1.5 text-muted-foreground text-sm leading-relaxed">
                <li>
                  Developed responsive websites for various clients using{" "}
                  <span className="font-mono text-xs text-foreground bg-muted px-1 rounded">
                    HTML/CSS/JS
                  </span>
                  .
                </li>
                <li>
                  Assisted in the migration of legacy sites to modern frameworks
                  like Next.js.
                </li>
                <li>Maintained and updated existing client codebases.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Portfolio / Projects */}
        <section id="portfolio" className="space-y-6 px-4">
          <h2 className="text-xl font-bold flex items-center gap-2 pb-2 border-b border-border text-foreground">
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project 1 */}
            <div className="bg-card rounded-[8px] p-4 hover:shadow-md transition-all cursor-pointer group border border-border hover:border-[#5865F2]/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl p-2 bg-background rounded-md">
                    🛍️
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-[#5865F2] transition-colors">
                      E-Commerce App
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Mobile Application
                    </p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                A full-featured shopping application built with React Native.
                Includes secure checkout, product search, and user reviews.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="font-medium text-[11px] bg-background text-muted-foreground/80 hover:bg-muted"
                >
                  React Native
                </Badge>
                <Badge
                  variant="secondary"
                  className="font-medium text-[11px] bg-background text-muted-foreground/80 hover:bg-muted"
                >
                  Redux
                </Badge>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-card rounded-[8px] p-4 hover:shadow-md transition-all cursor-pointer group border border-border hover:border-[#5865F2]/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl p-2 bg-background rounded-md">
                    ✅
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-[#5865F2] transition-colors">
                      Task Manager
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Web Dashboard
                    </p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                Productivity dashboard for teams with real-time updates via
                Socket.io. Features drag-and-drop kanban boards.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="font-medium text-[11px] bg-background text-muted-foreground/80 hover:bg-muted"
                >
                  Next.js
                </Badge>
                <Badge
                  variant="secondary"
                  className="font-medium text-[11px] bg-background text-muted-foreground/80 hover:bg-muted"
                >
                  Socket.io
                </Badge>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-card rounded-[8px] p-4 hover:shadow-md transition-all cursor-pointer group border border-border hover:border-[#5865F2]/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl p-2 bg-background rounded-md">
                    🏃
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-[#5865F2] transition-colors">
                      Fitness Tracker
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Mobile Application
                    </p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                Mobile app for tracking workouts, steps, and calories.
                Integrates with HealthKit and provides weekly reports.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="font-medium text-[11px] bg-background text-muted-foreground/80 hover:bg-muted"
                >
                  Flutter
                </Badge>
                <Badge
                  variant="secondary"
                  className="font-medium text-[11px] bg-background text-muted-foreground/80 hover:bg-muted"
                >
                  Firebase
                </Badge>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-4xl mx-auto px-6 py-10 border-t border-border mt-12 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2024 Hong Gil-dong. Built with Next.js & Discord Theme.</p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="hover:text-foreground transition-colors hover:underline"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors hover:underline"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors hover:underline"
            >
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
