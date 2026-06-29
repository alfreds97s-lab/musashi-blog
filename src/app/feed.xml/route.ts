import { getAllPosts } from "@/lib/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://musashiblog.com";
const SITE_TITLE = "Musashi Blog";
const SITE_DESCRIPTION = "Workflows sharpened to perfection. Deep dives into n8n, Make.com, and the art of automation — by Alfred.";
const AUTHOR_EMAIL = "alfreds.quocho97z@gmail.com";
const AUTHOR_NAME = "Alfred";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();
  const lastBuildDate = posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const postUrl = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(AUTHOR_EMAIL)} (${escapeXml(AUTHOR_NAME)})</author>
      <category>${escapeXml(post.category)}</category>
    </item>`.trim();
    })
    .join("\n    ");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>${escapeXml(AUTHOR_EMAIL)} (${escapeXml(AUTHOR_NAME)})</managingEditor>
    <webMaster>${escapeXml(AUTHOR_EMAIL)} (${escapeXml(AUTHOR_NAME)})</webMaster>
    <ttl>60</ttl>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
