import Link from "next/link";
import { getAllCategories } from "@/lib/posts";

const NAV_LINKS = [
  { label: "Latest", href: "/" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const categories = getAllCategories();

  return (
    <>
      <style>{`
        .nav-link { color: #1A1A1A; transition: color 0.15s; }
        .nav-link:hover { color: #8B2500; }
      `}</style>
      <nav
        style={{ borderBottom: "2px solid #1A1A1A" }}
        className="px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-x-6 gap-y-1 py-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-xs font-bold tracking-widest uppercase py-1"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              {link.label}
            </Link>
          ))}

          {categories.length > 0 && (
            <span style={{ color: "#4A4A4A", fontSize: "0.6rem" }}>·</span>
          )}

          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="nav-link text-xs font-bold tracking-widest uppercase py-1"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
