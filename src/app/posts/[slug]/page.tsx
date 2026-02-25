import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { ModeToggle } from "@/components/mode-toggle";
import { CalendarDays, ArrowLeft, Tag } from "lucide-react";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border h-12 flex items-center px-6 justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>dev.blog</span>
        </Link>
        <ModeToggle />
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        {/* Post Header */}
        <div className="mb-10 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight leading-tight">
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.content}
          </ReactMarkdown>
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
    </div>
  );
}
