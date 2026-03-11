"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Tag, FolderOpen, ChevronLeft, ChevronRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

const PAGE_SIZE = 10;

interface Props {
  posts: PostMeta[];
  categories: [string, number][];
  tags: [string, number][];
}

export function PostList({ posts, categories, tags }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = posts.filter((post) => {
    if (activeCategory && post.category !== activeCategory) return false;
    if (activeTag && !post.tags.includes(activeTag)) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleCategory(name: string) {
    if (name === "__all__") {
      setActiveCategory(null);
    } else {
      setActiveCategory((prev) => (prev === name ? null : name));
    }
    setActiveTag(null);
    setPage(1);
  }

  function toggleTag(name: string) {
    setActiveTag((prev) => (prev === name ? null : name));
    setActiveCategory(null);
    setPage(1);
  }

  const listTitle = activeCategory ?? activeTag ?? "전체";

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">{listTitle}</h1>
        <p className="text-muted-foreground text-sm">{filtered.length}개의 포스트</p>
      </div>
    <div className="flex gap-8 items-start">
      {/* 포스트 목록 */}
      <div className="flex-1 min-w-0">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg mb-2">해당하는 포스트가 없습니다.</p>
          </div>
        ) : (
          <>
          <ul className="space-y-px">
            {paged.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex flex-col gap-2 rounded-3xl px-4 py-5 -mx-4 hover:bg-muted/50 active:bg-muted/80 active:scale-95 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2 min-w-0">
                      {post.category && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded shrink-0">
                          {post.category}
                        </span>
                      )}
                      <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug truncate">
                        {post.title}
                      </h2>
                    </div>
                    {post.date && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 mt-0.5">
                        <CalendarDays className="h-3 w-3" />
                        {post.date}
                      </span>
                    )}
                  </div>

                  {post.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  )}

                  {post.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-10">
              <button
                onClick={() => { setPage((p) => p - 1); window.scrollTo(0, 0); }}
                disabled={page === 1}
                className="p-1.5 rounded-3xl hover:brightness-110 active:brightness-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="이전 페이지"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => { setPage(p); window.scrollTo(0, 0); }}
                  className={`min-w-[2rem] h-8 px-2 rounded-3xl text-sm font-bold transition-all cursor-pointer active:scale-95 ${
                    p === page
                      ? "bg-primary text-primary-foreground hover:brightness-110 active:brightness-90"
                      : "hover:bg-muted active:bg-muted/70 text-muted-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => { setPage((p) => p + 1); window.scrollTo(0, 0); }}
                disabled={page === totalPages}
                className="p-1.5 rounded-3xl hover:brightness-110 active:brightness-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="다음 페이지"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
          </>
        )}
      </div>

      {/* 사이드바 */}
      <aside className="w-56 shrink-0 space-y-4 hidden lg:block">
        {/* 카테고리 카드 */}
        {categories.length > 0 && (
          <div className="rounded-3xl bg-muted/50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">카테고리</span>
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => toggleCategory("__all__")}
                  className={`w-full flex items-center justify-between rounded-3xl px-4 py-2 text-left transition-all cursor-pointer font-bold active:scale-95 ${
                    activeCategory === null
                      ? "bg-primary text-primary-foreground hover:brightness-110 active:brightness-90"
                      : "hover:bg-muted active:bg-muted/70"
                  }`}
                >
                  <span className="text-sm">전체</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeCategory === null
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {posts.length}
                  </span>
                </button>
              </li>
              {categories.map(([name, count]) => (
                <li key={name}>
                  <button
                    onClick={() => toggleCategory(name)}
                    className={`w-full flex items-center justify-between rounded-3xl px-4 py-2 text-left transition-all cursor-pointer font-bold active:scale-95 ${
                      activeCategory === name
                        ? "bg-primary text-primary-foreground hover:brightness-110 active:brightness-90"
                        : "hover:bg-muted active:bg-muted/70"
                    }`}
                  >
                    <span className="text-sm">{name}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        activeCategory === name
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 태그 카드 */}
        {tags.length > 0 && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">태그</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map(([name, count]) => (
                <button
                  key={name}
                  onClick={() => toggleTag(name)}
                  className={`text-xs px-2 py-0.5 rounded-full transition-all cursor-pointer active:scale-95 ${
                    activeTag === name
                      ? "bg-primary text-primary-foreground hover:brightness-110 active:brightness-90"
                      : "text-primary bg-primary/10 hover:brightness-110 active:brightness-90"
                  }`}
                >
                  {name}
                  <span className="ml-1 opacity-70">{count}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
    </div>
  );
}
