import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ModeToggle } from "@/components/mode-toggle";
import { CalendarDays, Tag } from "lucide-react";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border h-12 flex items-center px-6 justify-between">
        <Link
          href="/"
          className="text-sm font-semibold hover:text-primary transition-colors"
        >
          dev.blog
        </Link>
        <ModeToggle />
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-2">글 목록</h1>
          <p className="text-muted-foreground text-sm">
            {posts.length}개의 포스트
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg mb-2">아직 작성된 포스트가 없습니다.</p>
            <p className="text-sm">
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                posts/
              </code>{" "}
              폴더에 .md 파일을 추가해보세요.
            </p>
          </div>
        ) : (
          <ul className="space-y-px">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex flex-col gap-2 rounded-lg px-4 py-5 -mx-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h2>
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
        )}
      </main>
    </div>
  );
}
