import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import Masthead from "@/components/Masthead";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    category: cat.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${decodeURIComponent(category)} — Category`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);

  // Try to match category slug to actual category name
  const allCategories = getAllCategories();
  const matchedCategory = allCategories.find(
    (c) => c.toLowerCase().replace(/\s+/g, "-") === decoded.toLowerCase()
  );

  if (!matchedCategory) {
    notFound();
  }

  const posts = getPostsByCategory(matchedCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Masthead />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Category header */}
        <div className="mb-8 text-center py-6" style={{ borderBottom: "1px solid #1A1A1A" }}>
          <p
            className="text-xs tracking-widest uppercase mb-2"
            style={{ fontFamily: "var(--font-merriweather)", color: "#8B2500" }}
          >
            Category
          </p>
          <h1
            className="text-4xl md:text-6xl font-black"
            style={{ fontFamily: "var(--font-playfair)", color: "#1A1A1A" }}
          >
            {matchedCategory}
          </h1>
          <p
            className="text-sm mt-2"
            style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
          >
            {posts.length} {posts.length === 1 ? "story" : "stories"} filed
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <p
              className="text-lg"
              style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
            >
              No stories filed in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} variant="default" />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
