import Link from "next/link";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
  variant?: "default" | "featured" | "compact" | "numbered";
  index?: number;
}

export default function PostCard({ post, variant = "default", index }: PostCardProps) {
  const formattedDate = format(new Date(post.date), "MMM d, yyyy").toUpperCase();
  const categoryHref = `/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`;
  const postHref = `/blog/${post.slug}`;

  if (variant === "featured") {
    return (
      <article className="py-6 px-4 md:px-8 text-center">
        <Link
          href={categoryHref}
          className="text-xs font-bold tracking-widest uppercase block mb-3"
          style={{ color: "#8B2500", fontFamily: "var(--font-merriweather)" }}
        >
          — {post.category} —
        </Link>
        <Link href={postHref}>
          <h2
            className="text-4xl md:text-5xl font-black leading-tight mb-4 hover:opacity-75 transition-opacity"
            style={{ fontFamily: "var(--font-playfair)", color: "#1A1A1A" }}
          >
            {post.title}
          </h2>
        </Link>
        <p
          className="text-base leading-relaxed mb-4 max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
        >
          {post.excerpt}
        </p>
        <p
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
        >
          BY {post.author.toUpperCase()} &nbsp;·&nbsp; {formattedDate} &nbsp;·&nbsp; {post.readingTime.toUpperCase()}
        </p>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="py-3" style={{ borderBottom: "1px solid #EDE8D8" }}>
        <Link
          href={categoryHref}
          className="text-xs font-bold tracking-widest uppercase block mb-1"
          style={{ color: "#8B2500", fontFamily: "var(--font-merriweather)" }}
        >
          {post.category}
        </Link>
        <Link href={postHref}>
          <h3
            className="text-sm font-bold leading-snug mb-1 hover:opacity-75 transition-opacity"
            style={{ fontFamily: "var(--font-playfair)", color: "#1A1A1A" }}
          >
            {post.title}
          </h3>
        </Link>
        <p
          className="text-xs"
          style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
        >
          BY {post.author.toUpperCase()} &nbsp;·&nbsp; {formattedDate}
        </p>
      </article>
    );
  }

  if (variant === "numbered") {
    return (
      <article className="flex gap-3 py-3" style={{ borderBottom: "1px solid #EDE8D8" }}>
        <span
          className="text-3xl font-black leading-none flex-shrink-0 w-8"
          style={{ fontFamily: "var(--font-playfair)", color: "#8B2500" }}
        >
          {index}
        </span>
        <div>
          <Link href={postHref}>
            <h3
              className="text-sm font-bold leading-snug mb-1 hover:opacity-75 transition-opacity"
              style={{ fontFamily: "var(--font-playfair)", color: "#1A1A1A" }}
            >
              {post.title}
            </h3>
          </Link>
          <p
            className="text-xs"
            style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
          >
            BY {post.author.toUpperCase()}
          </p>
        </div>
      </article>
    );
  }

  // default card
  return (
    <article>
      <Link
        href={categoryHref}
        className="text-xs font-bold tracking-widest uppercase block mb-2"
        style={{ color: "#8B2500", fontFamily: "var(--font-merriweather)" }}
      >
        {post.category}
      </Link>
      <Link href={postHref}>
        <h2
          className="text-xl font-bold leading-snug mb-2 hover:opacity-75 transition-opacity"
          style={{ fontFamily: "var(--font-playfair)", color: "#1A1A1A" }}
        >
          {post.title}
        </h2>
      </Link>
      <p
        className="text-sm leading-relaxed mb-3"
        style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
      >
        {post.excerpt}
      </p>
      <p
        className="text-xs tracking-widest uppercase"
        style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
      >
        BY {post.author.toUpperCase()} &nbsp;·&nbsp; {post.readingTime.toUpperCase()}
      </p>
    </article>
  );
}
