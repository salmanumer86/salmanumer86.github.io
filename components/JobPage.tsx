import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "./Mdx";
import { Shell, Crumbs, PostCta } from "./Shell";
import { formatDate, getJob, isJobOpen, type JobMeta } from "@/lib/content";
import { site, absoluteUrl } from "@/lib/site";

export function jobMetadata(slug: string): Metadata {
  const job = getJob(slug);
  if (!job) return {};
  const { meta } = job;
  const title = `${meta.title} at ${meta.company}`;
  const description = meta.description || `${meta.title} at ${meta.company}, ${meta.location}.`;
  return {
    title,
    description,
    alternates: { canonical: `/jobs/${slug}/` },
    keywords: [...meta.stack, meta.location, "jobs", "hiring"],
    openGraph: { type: "website", title: `${title} | ${site.name}`, description, url: absoluteUrl(`/jobs/${slug}/`) },
    robots: meta.draft || !isJobOpen(meta) ? { index: false, follow: true } : undefined,
  };
}

const employmentLabel: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERN: "Internship",
  TEMPORARY: "Temporary",
};

function salaryText(s: JobMeta["salary"]) {
  if (!s) return null;
  const fmt = (n: number) => n.toLocaleString("en-US");
  const range = s.min && s.max ? `${fmt(s.min)} – ${fmt(s.max)}` : s.min ? `from ${fmt(s.min)}` : s.max ? `up to ${fmt(s.max)}` : null;
  if (!range) return null;
  const unit = { MONTH: "/ month", YEAR: "/ year", HOUR: "/ hour" }[s.unit];
  return `${s.currency} ${range} ${unit}`;
}

export function JobPage({ slug }: { slug: string }) {
  const job = getJob(slug);
  if (!job) notFound();
  const { meta, content } = job;
  const open = isJobOpen(meta);
  const url = absoluteUrl(`/jobs/${slug}/`);
  const [city, country] = meta.location.split(",").map((s) => s.trim());

  // https://developers.google.com/search/docs/appearance/structured-data/job-posting
  const ld = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: meta.title,
    description: meta.description,
    datePosted: meta.date,
    validThrough: `${meta.validThrough}T23:59:59`,
    employmentType: meta.employmentType,
    hiringOrganization: { "@type": "Organization", name: meta.company, ...(meta.companyUrl ? { sameAs: meta.companyUrl } : {}) },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: city, ...(country ? { addressCountry: country } : {}) } },
    ...(meta.remote ? { jobLocationType: "TELECOMMUTE" } : {}),
    ...(meta.salary && (meta.salary.min || meta.salary.max)
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: meta.salary.currency,
            value: {
              "@type": "QuantitativeValue",
              ...(meta.salary.min ? { minValue: meta.salary.min } : {}),
              ...(meta.salary.max ? { maxValue: meta.salary.max } : {}),
              unitText: meta.salary.unit,
            },
          },
        }
      : {}),
    skills: meta.stack.join(", "),
    directApply: true,
    url,
    identifier: { "@type": "PropertyValue", name: meta.company, value: slug },
  };

  const salary = salaryText(meta.salary);

  return (
    <Shell>
      {open && !meta.draft && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
      <article className="article">
        <header className="page-hero">
          <div className="wrap">
            <div className="article-head" style={{ maxWidth: 1100 }}>
              <Crumbs items={[{ href: "/jobs/", label: "Jobs" }, { label: meta.title }]} />
              <span className="eyebrow">{meta.draft ? "Draft · not published" : open ? "Now hiring" : "Position closed"}</span>
              <h1>{meta.title}</h1>
              <p className="lede">
                <strong style={{ color: "var(--text)" }}>{meta.company}</strong> · {meta.location}
                {meta.remote && " · Remote"}
              </p>
              <div className="meta" style={{ borderTop: "none", paddingTop: 0 }}>
                <span className={`job-pill${open ? "" : " closed"}`}>{open ? "● Open" : "Closed"}</span>
                <span>Posted {formatDate(meta.date)}</span>
                <span>
                  {open ? "Apply by" : "Closed on"} {formatDate(meta.validThrough)}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="wrap">
          <div className="job-layout">
            <div>
              <Mdx source={content} />
              <div style={{ marginTop: 40 }}>
                <PostCta kind="job" />
              </div>
            </div>
            <aside className="job-side">
              <h3>Role summary</h3>
              <div className="row"><span>Company</span><b>{meta.company}</b></div>
              <div className="row"><span>Location</span><b>{meta.location}{meta.remote ? " · Remote" : ""}</b></div>
              <div className="row"><span>Type</span><b>{employmentLabel[meta.employmentType] ?? meta.employmentType}</b></div>
              {salary && <div className="row"><span>Salary</span><b>{salary}</b></div>}
              {meta.stack.length > 0 && <div className="row"><span>Stack</span><b>{meta.stack.join(" · ")}</b></div>}
              <div className="row"><span>Deadline</span><b>{formatDate(meta.validThrough)}</b></div>
              {open ? (
                <a className="btn btn-gold" href={meta.applyUrl} target={/^https?:/.test(meta.applyUrl) ? "_blank" : undefined} rel="noopener">
                  Apply now →
                </a>
              ) : (
                <span className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 18, opacity: 0.6, cursor: "not-allowed" }}>
                  Applications closed
                </span>
              )}
              <p className="note">Applications go directly to me. I reply to every candidate who applies, whether or not it&apos;s a fit.</p>
              <p className="alt">
                Questions? <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Question about: ${meta.title}`)}`}>Email me</a>
              </p>
            </aside>
          </div>
        </div>
      </article>
    </Shell>
  );
}
