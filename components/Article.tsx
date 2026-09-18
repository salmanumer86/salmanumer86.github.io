import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Mdx } from "./Mdx";
import { Empty, PageHero, PostCta, Shell, Crumbs } from "./Shell";
import { PostCard } from "./Cards";
import { formatDate, getAll, getBySlug, sectionLabel, type Section } from "@/lib/content";
import { site, absoluteUrl } from "@/lib/site";

/* ---------- listing ---------- */

export function ListingPage({ section }: { section: Section }) {
  const posts = getAll(section);
  const label = sectionLabel[section];
  return (
    <Shell>
      <PageHero eyebrow={label.eyebrow} title={label.title} blurb={label.blurb} crumbs={[{ label: label.eyebrow }]} />
      <section className="section light" style={{ paddingTop: 48 }}>
        <div className="wrap">
          {posts.length === 0 ? (
            <Empty what={section === "advice" ? "Advice pieces" : "Articles"} />
          ) : (
            <div className="post-grid stagger-grid">
              {posts.map((p) => (
                <PostCard key={p.meta.slug} meta={p.meta} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Shell>
  );
}

export function listingMetadata(section: Section): Metadata {
  const label = sectionLabel[section];
  return {
    title: label.eyebrow,
    description: label.blurb,
    alternates: { canonical: `/${section}/` },
    openGraph: { type: "website", title: `${label.eyebrow} — ${site.name}`, description: label.blurb, url: absoluteUrl(`/${section}/`) },
  };
}

/* ---------- single post ---------- */

export function articleParams(section: Section) {
  return getAll(section).map((p) => ({ slug: p.meta.slug }));
}

export function articleMetadata(section: Section, slug: string): Metadata {
  const post = getBySlug(section, slug);
  if (!post) return {};
  const { meta } = post;
  const url = absoluteUrl(`/${section}/${slug}/`);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${section}/${slug}/` },
    keywords: meta.tags,
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url,
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
      authors: [site.url],
      tags: meta.tags,
      ...(meta.image ? { images: [{ url: meta.image }] } : {}),
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    robots: meta.draft ? { index: false, follow: false } : undefined,
  };
}

export function ArticlePage({ section, slug }: { section: Section; slug: string }) {
  const post = getBySlug(section, slug);
  if (!post) notFound();
  const { meta, content } = post;
  const label = sectionLabel[section];
  const url = absoluteUrl(`/${section}/${slug}/`);

  const all = getAll(section);
  const idx = all.findIndex((p) => p.meta.slug === slug);
  const newer = all[idx - 1];
  const older = all[idx + 1];
  const related = all.filter((p) => p.meta.slug !== slug && p.meta.tags.some((t) => meta.tags.includes(t))).slice(0, 3);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: url,
    url,
    keywords: meta.tags.join(", "),
    ...(meta.image ? { image: absoluteUrl(meta.image) } : {}),
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: label.eyebrow, item: absoluteUrl(`/${section}/`) },
      { "@type": "ListItem", position: 3, name: meta.title, item: url },
    ],
  };

  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }} />
      <article className="article">
        <header className="page-hero">
          <div className="wrap">
            <div className="article-head">
              <Crumbs items={[{ href: `/${section}/`, label: label.eyebrow }, { label: meta.title }]} />
              <span className="eyebrow">{meta.draft ? "Draft · not published" : label.eyebrow}</span>
              <h1>{meta.title}</h1>
              <p className="lede">{meta.description}</p>
              <div className="meta">
                <span className="by">
                  <img src="/headshot.jpg" alt="" width="34" height="34" />
                  {site.name}
                </span>
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                {meta.updated && <span>Updated {formatDate(meta.updated)}</span>}
                <span>{meta.readingTime} min read</span>
                {meta.tags.length > 0 && (
                  <span className="tags" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {meta.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="wrap">
          <div className="article-body">
            <Mdx source={content} />
          </div>
          <PostCta kind={section === "advice" ? "developer" : "hiring"} />
          {(newer || older) && (
            <nav className="post-nav" aria-label="Adjacent posts">
              {older ? <Link href={`/${section}/${older.meta.slug}/`}>← {older.meta.title}</Link> : <span />}
              {newer ? <Link href={`/${section}/${newer.meta.slug}/`}>{newer.meta.title} →</Link> : <span />}
            </nav>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="section light" style={{ paddingTop: 64 }}>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Related</span>
              <h2 className="sec-title" style={{ fontSize: 32 }}>Keep reading</h2>
            </div>
            <div className="post-grid stagger-grid">
              {related.map((p) => (
                <PostCard key={p.meta.slug} meta={p.meta} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Shell>
  );
}
