import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobsListing, jobsListingMetadata } from "@/components/Jobs";
import { JobPage, jobMetadata } from "@/components/JobPage";
import { getJobs } from "@/lib/content";

// Optional catch-all: /jobs/ is the listing, /jobs/<slug>/ is a posting.
type Props = { params: Promise<{ slug?: string[] }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: [] }, ...getJobs().map((j) => ({ slug: [j.meta.slug] }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return slug?.length ? jobMetadata(slug[0]) : jobsListingMetadata;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!slug?.length) return <JobsListing />;
  if (slug.length > 1) notFound();
  return <JobPage slug={slug[0]} />;
}
