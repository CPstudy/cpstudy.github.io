import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail?: string;
}

export interface Post extends PostMeta {
  content: string;
}

function ensurePostsDir() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

function getAllMdFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

function pathToSlug(fullPath: string): string {
  return path
    .relative(postsDirectory, fullPath)
    .replace(/\.md$/, "")
    .replace(/\\/g, "/");
}

export function getAllPosts(): PostMeta[] {
  ensurePostsDir();

  const files = getAllMdFiles(postsDirectory);

  const posts = files.map((fullPath) => {
    const slug = pathToSlug(fullPath);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: (data.title as string) || slug,
      date: (data.date as string) || "",
      description: (data.description as string) || "",
      category: slug.split("/")[0] ?? "",
      tags: (data.tags as string[]) || [],
      thumbnail: (data.thumbnail as string) || undefined,
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: (data.title as string) || slug,
    date: (data.date as string) || "",
    description: (data.description as string) || "",
    category: slug.split("/")[0] ?? "",
    tags: (data.tags as string[]) || [],
    thumbnail: (data.thumbnail as string) || undefined,
    content,
  };
}

export function getAllSlugs(): string[] {
  ensurePostsDir();
  return getAllMdFiles(postsDirectory).map(pathToSlug);
}
