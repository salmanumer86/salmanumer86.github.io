import type { MetadataRoute } from "next";
import { getAll, getJobs, isJobOpen } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const blog = getAll("blog").filter((p) => !p.meta.draft);
  const advice = getAll("advice").filter((p) => !p.meta.draft);
  const jobs = getJobs().filter((j) => !j.meta.draft && isJobOpen(j.meta));

  const latest = (dates: string[]) => (dates.length ? new Date(dates.sort().at(-1)!) : new Date());

  return [
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/blog/"), lastModified: latest(blog.map((p) => p.meta.updated ?? p.meta.date)), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/advice/"), lastModified: latest(advice.map((p) => p.meta.updated ?? p.meta.date)), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/jobs/"), lastModified: latest(jobs.map((p) => p.meta.date)), changeFrequency: "daily", priority: 0.9 },
    ...[...blog, ...advice].map((p) => ({
      url: absoluteUrl(`/${p.meta.section}/${p.meta.slug}/`),
      lastModified: new Date(p.meta.updated ?? p.meta.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...jobs.map((j) => ({
      url: absoluteUrl(`/jobs/${j.meta.slug}/`),
      lastModified: new Date(j.meta.updated ?? j.meta.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
