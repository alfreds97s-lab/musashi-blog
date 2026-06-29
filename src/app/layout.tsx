import type { Metadata } from "next";
import { Playfair_Display, Merriweather } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Musashi Blog",
    template: "%s | Musashi Blog",
  },
  description:
    "Workflows sharpened to perfection. Deep dives into n8n, Make.com, and the art of automation — by Alfred.",
  openGraph: {
    siteName: "Musashi Blog",
    type: "website",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${merriweather.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F0E8", color: "#1A1A1A" }}>
        {children}
      </body>
    </html>
  );
}
