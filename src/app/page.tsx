import { getAllPosts } from "@/lib/posts";
import { SiteHeader } from "@/components/site-header";
import { PostList } from "@/components/post-list";

export default function Home() {
  const posts = getAllPosts();

  const categories = Array.from(
    posts.reduce((acc, post) => {
      if (post.category) {
        acc.set(post.category, (acc.get(post.category) ?? 0) + 1);
      }
      return acc;
    }, new Map<string, number>())
  ).sort((a, b) => b[1] - a[1]);

  const tags = Array.from(
    posts.reduce((acc, post) => {
      for (const tag of post.tags) {
        acc.set(tag, (acc.get(tag) ?? 0) + 1);
      }
      return acc;
    }, new Map<string, number>())
  ).sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <PostList posts={posts} categories={categories} tags={tags} />
      </main>
    </div>
  );
}
