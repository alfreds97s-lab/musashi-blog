import Masthead from "@/components/Masthead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Alfred and Musashi Blog — a blog about automation, n8n, and Make.com.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Masthead />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_65ch_2px_1fr] gap-0">
          <div />
          <div className="hidden md:block" style={{ backgroundColor: "#1A1A1A" }} />

          <article className="md:px-10 py-4">
            {/* Header */}
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: "var(--font-merriweather)", color: "#8B2500" }}
            >
              About
            </p>
            <h1
              className="text-4xl md:text-5xl font-black leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)", color: "#1A1A1A" }}
            >
              The man behind the blade
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div style={{ flex: 1, height: "1px", backgroundColor: "#1A1A1A" }} />
              <span style={{ color: "#8B2500", fontSize: "0.75rem" }}>✦</span>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#1A1A1A" }} />
            </div>

            <div className="prose-newspaper">
              <p>
                My name is <strong>Alfred</strong>. I spend a disproportionate amount of time
                thinking about how to make computers do things automatically so I do not have
                to do them manually.
              </p>

              <p>
                Musashi Blog is where I document that obsession. Named after Miyamoto Musashi —
                the legendary Japanese swordsman who believed that mastery comes from relentless
                refinement of technique — this blog applies that same philosophy to workflow
                automation.
              </p>

              <blockquote>
                &ldquo;Do nothing that is of no use.&rdquo; — Miyamoto Musashi
              </blockquote>

              <p>
                That is the test every automation must pass. If it does not save time, reduce
                errors, or free up mental energy for more important work, it does not belong in
                the stack.
              </p>

              <h2>What I write about</h2>

              <p>
                The primary focus is <strong>n8n</strong> and <strong>Make.com</strong> — two
                of the most powerful automation platforms available today. I cover:
              </p>

              <ul>
                <li>Step-by-step workflow tutorials from real use cases</li>
                <li>Deep comparisons between automation tools and platforms</li>
                <li>Tips for working with APIs, webhooks, and data transformation</li>
                <li>Self-hosting strategies for n8n and other open-source tools</li>
              </ul>

              <h2>Get in touch</h2>

              <p>
                If you have a workflow problem you are trying to solve, a topic you want me
                to cover, or just want to say hello — reach out at{" "}
                <a href="mailto:alfreds.quocho97z@gmail.com">
                  alfreds.quocho97z@gmail.com
                </a>
                .
              </p>
            </div>
          </article>

          <div className="hidden md:block" style={{ backgroundColor: "#1A1A1A" }} />
          <div />
        </div>
      </main>

      <Footer />
    </div>
  );
}
