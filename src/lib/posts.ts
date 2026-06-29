import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  published: boolean;
  coverImage?: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    author: data.author ?? "Alfred",
    category: data.category ?? "General",
    excerpt: data.excerpt ?? "",
    published: data.published ?? false,
    coverImage: data.coverImage,
    readingTime: rt.text,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post || !post.published) return null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content: _content, ...meta } = post;
      return meta;
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const cats = new Set(posts.map((p) => p.category));
  return Array.from(cats).sort();
}

export function getDaysSinceLastPost(): number {
  const posts = getAllPosts();
  if (posts.length === 0) return 0;
  const latest = new Date(posts[0].date);
  const now = new Date();
  const diff = Math.floor((now.getTime() - latest.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}
