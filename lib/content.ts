import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Section = "blog" | "advice" | "jobs";

export type PostMeta = {
  slug: string;
  section: Section;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  updated?: string;
  tags: string[];
  draft: boolean;
  readingTime: number; // minutes
  /** Relative path under /public, or absolute URL */
  image?: string;
};

export type JobMeta = PostMeta & {
  company: string;
  companyUrl?: string;
  location: string; // e.g. "Lahore, Pakistan"
  remote: boolean;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN" | "TEMPORARY";
  stack: string[];
  salary?: { min?: number; max?: number; currency: string; unit: "MONTH" | "YEAR" | "HOUR" };
  applyUrl: string; // mailto:, https://, or wa.me
  validThrough: string; // ISO date the posting expires
};

export type Entry<M extends PostMeta = PostMeta> = { meta: M; content: string };

const CONTENT_DIR = path.join(process.cwd(), "content");
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

function readingTime(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function listFiles(section: Section) {
  const dir = path.join(CONTENT_DIR, section);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f));
}

function parse<M extends PostMeta>(section: Section, file: string): Entry<M> {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, section, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx?$/, "");
  const base: PostMeta = {
    slug,
    section,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? "1970-01-01"),
    updated: data.updated ? String(data.updated) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    readingTime: readingTime(content),
    image: data.image ? String(data.image) : undefined,
  };
  return { meta: { ...data, ...base } as M, content };
}

export function getAll<M extends PostMeta = PostMeta>(section: Section): Entry<M>[] {
  return listFiles(section)
    .map((f) => parse<M>(section, f))
    .filter((e) => SHOW_DRAFTS || !e.meta.draft)
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export function getBySlug<M extends PostMeta = PostMeta>(section: Section, slug: string): Entry<M> | null {
  const file = listFiles(section).find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!file) return null;
  const entry = parse<M>(section, file);
  if (entry.meta.draft && !SHOW_DRAFTS) return null;
  return entry;
}

export const getJobs = () => getAll<JobMeta>("jobs");
export const getJob = (slug: string) => getBySlug<JobMeta>("jobs", slug);

export function isJobOpen(job: JobMeta, now = new Date()) {
  return new Date(job.validThrough) >= now;
}

export const sectionLabel: Record<Section, { title: string; eyebrow: string; blurb: string }> = {
  blog: {
    title: "Articles on hiring, outsourcing and partnerships",
    eyebrow: "Blog",
    blurb: "Notes on business development, tech recruiting and building teams in Pakistan — written by someone who also ships React.",
  },
  advice: {
    title: "Career advice for developers",
    eyebrow: "Advice",
    blurb: "Practical guidance on résumés, LinkedIn, interviews, and job offers. No fluff, just what actually works.",
  },
  jobs: {
    title: "Open roles I'm hiring for",
    eyebrow: "Jobs",
    blurb: "Software engineering positions I'm currently sourcing for. Apply directly, or reach out if you're not sure it's a fit.",
  },
};

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
