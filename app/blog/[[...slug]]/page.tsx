import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage, ListingPage, articleMetadata, articleParams, listingMetadata } from "@/components/Article";

// Optional catch-all: /blog/ is the listing, /blog/<slug>/ is a post.
// (A plain [slug] route can't be statically exported when there are no posts yet.)
type Props = { params: Promise<{ slug?: string[] }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: [] }, ...articleParams("blog").map((p) => ({ slug: [p.slug] }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return slug?.length ? articleMetadata("blog", slug[0]) : listingMetadata("blog");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!slug?.length) return <ListingPage section="blog" />;
  if (slug.length > 1) notFound();
  return <ArticlePage section="blog" slug={slug[0]} />;
}
