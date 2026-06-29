import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import Masthead from "@/components/Masthead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const formattedDate = format(new Date(post.date), "MMMM d, yyyy").toUpperCase();
  const categoryHref = `/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Masthead />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_65ch_2px_1fr] gap-0">
          {/* Left spacer */}
          <div />
          <div className="hidden md:block" style={{ backgroundColor: "#1A1A1A" }} />

          {/* Article */}
          <article className="md:px-10 py-4">
            {/* Category + back link */}
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/"
                className="text-xs tracking-widest uppercase"
                style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
              >
                ← Home
              </Link>
              <span style={{ color: "#4A4A4A" }}>/</span>
              <Link
                href={categoryHref}
                className="text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-merriweather)", color: "#8B2500" }}
              >
                {post.category}
              </Link>
            </div>

            {/* Headline */}
            <h1
              className="text-3xl md:text-5xl font-black leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)", color: "#1A1A1A" }}
            >
              {post.title}
            </h1>

            {/* Ornamental rule */}
            <div className="flex items-center gap-3 mb-4">
              <div style={{ flex: 1, height: "1px", backgroundColor: "#1A1A1A" }} />
              <span style={{ color: "#8B2500", fontSize: "0.75rem" }}>✦</span>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#1A1A1A" }} />
            </div>

            {/* Byline */}
            <p
              className="text-xs tracking-widest uppercase text-center mb-4"
              style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
            >
              BY {post.author.toUpperCase()} &nbsp;·&nbsp; {formattedDate} &nbsp;·&nbsp; {post.readingTime.toUpperCase()}
            </p>

            {/* Bottom rule */}
            <div style={{ borderBottom: "1px solid #1A1A1A" }} className="mb-6" />

            {/* Excerpt */}
            {post.excerpt && (
              <p
                className="text-base italic mb-6 leading-relaxed"
                style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
              >
                {post.excerpt}
              </p>
            )}

            {/* MDX content */}
            <div className="prose-newspaper">
              <MDXRemote source={post.content} />
            </div>

            {/* Bottom rule + back link */}
            <div style={{ borderTop: "1px solid #1A1A1A" }} className="mt-8 pt-6">
              <Link
                href="/"
                className="text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-merriweather)", color: "#8B2500" }}
              >
                ← Back to all stories
              </Link>
            </div>
          </article>

          <div className="hidden md:block" style={{ backgroundColor: "#1A1A1A" }} />
          {/* Right spacer */}
          <div />
        </div>
      </main>

      <Footer />
    </div>
  );
}
