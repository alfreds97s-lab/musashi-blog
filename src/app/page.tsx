import { getAllPosts } from "@/lib/posts";
import Masthead from "@/components/Masthead";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import Footer from "@/components/Footer";

export default function HomePage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const sidebarPosts = rest.slice(0, 4);
  const gridPosts = rest.slice(0, 6);
  const trendingPosts = posts.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      <Masthead />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8">
        {posts.length === 0 ? (
          <div className="py-24 text-center">
            <p
              className="text-lg"
              style={{ fontFamily: "var(--font-merriweather)", color: "#4A4A4A" }}
            >
              No stories filed yet. The presses are warming up.
            </p>
          </div>
        ) : (
          <>
            {/* Front page — 3-column newspaper layout */}
            <div
              className="grid grid-cols-1 md:grid-cols-[1fr_2px_2fr_2px_1fr] gap-0 py-6"
              style={{ borderBottom: "1px solid #1A1A1A" }}
            >
              {/* Left sidebar: Latest */}
              <div className="pr-0 md:pr-6">
                <h2
                  className="text-xs font-black tracking-widest uppercase py-1 mb-3"
                  style={{
                    fontFamily: "var(--font-merriweather)",
                    borderBottom: "2px solid #1A1A1A",
                    color: "#1A1A1A",
                  }}
                >
                  Latest
                </h2>
                <div>
                  {sidebarPosts.length > 0
                    ? sidebarPosts.map((post) => (
                        <PostCard key={post.slug} post={post} variant="compact" />
                      ))
                    : featured && (
                        <PostCard post={featured} variant="compact" />
                      )}
                </div>
              </div>

              {/* Column divider */}
              <div className="hidden md:block" style={{ backgroundColor: "#1A1A1A" }} />

              {/* Center: Featured story */}
              {featured && (
                <div className="md:px-6">
                  <PostCard post={featured} variant="featured" />
                </div>
              )}

              {/* Column divider */}
              <div className="hidden md:block" style={{ backgroundColor: "#1A1A1A" }} />

              {/* Right sidebar: Trending */}
              <div className="pl-0 md:pl-6">
                <h2
                  className="text-xs font-black tracking-widest uppercase py-1 mb-3"
                  style={{
                    fontFamily: "var(--font-merriweather)",
                    borderBottom: "2px solid #1A1A1A",
                    color: "#1A1A1A",
                  }}
                >
                  Trending
                </h2>
                <div>
                  {trendingPosts.map((post, i) => (
                    <PostCard
                      key={post.slug}
                      post={post}
                      variant="numbered"
                      index={i + 1}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Below-fold grid: more posts */}
            {gridPosts.length > 0 && (
              <div className="py-8">
                <h2
                  className="text-xs font-black tracking-widest uppercase py-1 mb-6"
                  style={{
                    fontFamily: "var(--font-merriweather)",
                    borderBottom: "2px solid #1A1A1A",
                    color: "#1A1A1A",
                  }}
                >
                  All Stories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
                  {gridPosts.map((post) => (
                    <PostCard key={post.slug} post={post} variant="default" />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
