import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { SiteHeader } from "@/components/site-header";
import { TableOfContents } from "@/components/table-of-contents";
import { CalendarDays, ArrowLeft, Tag } from "lucide-react";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function createIdGenerator() {
  const counts = new Map<string, number>();
  return (text: string) => {
    const base = slugify(text);
    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}

function extractHeadings(content: string) {
  // 코드 블록(``` ... ```) 제거 후 헤딩 추출
  const withoutCode = content.replace(/^```[\s\S]*?^```[^\n]*/gm, "");
  const matches = [...withoutCode.matchAll(/^(#{1,3})\s+(.+)$/gm)];
  const genId = createIdGenerator();
  return matches.map(([, hashes, text]) => ({
    id: genId(text.trim()),
    text: text.trim(),
    level: hashes.length,
  }));
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugStr = slug.join("/");
  try {
    const post = getPostBySlug(slugStr);
    return {
      title: post.title,
      description: post.description,
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugStr = slug.join("/");

  let post;
  try {
    post = getPostBySlug(slugStr);
  } catch {
    notFound();
  }

  const headings = extractHeadings(post.content);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex gap-12">
          {/* Main Content */}
          <main className="min-w-0 flex-1">
            {/* Post Header */}
            <div className="mb-10 space-y-4">
              <h1 className="text-4xl font-bold tracking-tight leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {post.date && (
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {post.date}
                  </span>
                )}
                {post.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Tag className="h-3.5 w-3.5" />
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
              </div>

              {post.description && (
                <p className="text-muted-foreground leading-relaxed border-l-2 border-primary pl-4">
                  {post.description}
                </p>
              )}
            </div>

            <hr className="border-border mb-10" />

            {/* Post Content */}
            <article className="prose prose-neutral dark:prose-invert max-w-none">
              {(() => {
                const genId = createIdGenerator();
                return (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      h1: ({ children }) => <h1 id={genId(String(children))}>{children}</h1>,
                      h2: ({ children }) => <h2 id={genId(String(children))}>{children}</h2>,
                      h3: ({ children }) => <h3 id={genId(String(children))}>{children}</h3>,
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                );
              })()}
            </article>

            <hr className="border-border mt-16 mb-8" />

            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              글 목록으로
            </Link>
          </main>

          {/* TOC Sidebar */}
          {headings.length > 0 && (
            <aside className="hidden xl:block w-56 shrink-0">
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
