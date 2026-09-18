import { getAll } from "@/lib/content";
import { site, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const posts = [...getAll("blog"), ...getAll("advice")]
    .filter((p) => !p.meta.draft)
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
    .slice(0, 30);

  const items = posts
    .map(({ meta }) => {
      const url = absoluteUrl(`/${meta.section}/${meta.slug}/`);
      return `    <item>
      <title>${esc(meta.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(meta.date + "T00:00:00Z").toUTCString()}</pubDate>
      <description>${esc(meta.description)}</description>
${meta.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — Blog &amp; Career Advice</title>
    <link>${site.url}</link>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>
    <description>${esc("Articles on tech hiring and career advice for developers, by " + site.name + ".")}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
