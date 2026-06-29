import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "3px solid #1A1A1A", backgroundColor: "#1A1A1A", color: "#F5F0E8" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3
              className="text-xl font-black mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Musashi Blog
            </h3>
            <p
              className="text-sm leading-relaxed opacity-70"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              Workflows sharpened to perfection. Deep dives into n8n, Make.com,
              and the art of automation.
            </p>
          </div>

          <div>
            <h4
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: "var(--font-merriweather)", color: "#8B2500" }}
            >
              Navigate
            </h4>
            <ul className="space-y-1">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "n8n", href: "/category/n8n" },
                { label: "Make.com", href: "/category/make.com" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                    style={{ fontFamily: "var(--font-merriweather)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: "var(--font-merriweather)", color: "#8B2500" }}
            >
              Contact
            </h4>
            <p
              className="text-sm opacity-70"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              Written by Alfred
            </p>
            <a
              href="mailto:alfreds.quocho97z@gmail.com"
              className="text-sm opacity-70 hover:opacity-100 transition-opacity block mt-1"
              style={{ fontFamily: "var(--font-merriweather)", color: "#F5F0E8" }}
            >
              alfreds.quocho97z@gmail.com
            </a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #4A4A4A" }} className="pt-4">
          <p
            className="text-xs text-center opacity-50 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            © {year} Musashi Blog · All Rights Reserved · Alfred
          </p>
        </div>
      </div>
    </footer>
  );
}
