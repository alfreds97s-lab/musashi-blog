import Link from "next/link";
import { getAllPosts, getDaysSinceLastPost } from "@/lib/posts";

export default function Masthead() {
  const posts = getAllPosts();
  const daysSince = getDaysSinceLastPost();
  const storyCount = posts.length;

  const lastFiledText =
    daysSince === 0
      ? "TODAY"
      : daysSince === 1
      ? "1 DAY AGO"
      : `${daysSince} DAYS AGO`;

  return (
    <header>
      {/* Top meta bar */}
      <div
        style={{ borderBottom: "1px solid #1A1A1A", borderTop: "3px solid #1A1A1A" }}
        className="px-4 md:px-8 py-1"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
          >
            EST. 2026 &nbsp;·&nbsp; {storyCount} {storyCount === 1 ? "STORY" : "STORIES"} IN PRINT
          </span>
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
          >
            LAST FILED &nbsp;·&nbsp; {lastFiledText}
          </span>
        </div>
      </div>

      {/* Masthead name */}
      <div className="px-4 md:px-8 py-6 text-center" style={{ borderBottom: "1px solid #1A1A1A" }}>
        <Link href="/" className="group inline-block">
          <h1
            className="text-6xl md:text-8xl font-black tracking-tight leading-none"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
            }}
          >
            Musashi Blog
          </h1>
        </Link>
        <p
          className="mt-2 text-sm tracking-widest uppercase"
          style={{ fontFamily: "var(--font-merriweather)", color: "#8B2500" }}
        >
          Workflows Sharpened to Perfection
        </p>
      </div>
    </header>
  );
}
