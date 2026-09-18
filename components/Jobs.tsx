import type { Metadata } from "next";
import { Shell, PageHero } from "@/components/Shell";
import { ComingSoon } from "@/components/ComingSoon";
import { JobCard } from "@/components/Cards";
import { getJobs, isJobOpen, sectionLabel } from "@/lib/content";
import { site, absoluteUrl } from "@/lib/site";

const label = sectionLabel.jobs;

export const jobsListingMetadata: Metadata = {
  title: "Jobs",
  description: label.blurb,
  alternates: { canonical: "/jobs/" },
  openGraph: { type: "website", title: `Jobs — ${site.name}`, description: label.blurb, url: absoluteUrl("/jobs/") },
};

export function JobsListing() {
  const jobs = getJobs();
  const open = jobs.filter((j) => isJobOpen(j.meta));
  const closed = jobs.filter((j) => !isJobOpen(j.meta));

  return (
    <Shell>
      <PageHero eyebrow={label.eyebrow} title={label.title} blurb={label.blurb} crumbs={[{ label: "Jobs" }]} />
      <section className="section light" style={{ paddingTop: 48 }}>
        <div className="wrap">
          {jobs.length === 0 ? (
            <ComingSoon section="jobs" />
          ) : (
            <>
              {open.length === 0 && (
                <div className="empty" style={{ marginBottom: 40 }}>
                  <b>No open roles right now.</b>
                  <br />
                  Send me your CV anyway — I keep a shortlist for upcoming positions.
                </div>
              )}
              {open.length > 0 && (
                <div className="post-grid stagger-grid">
                  {open.map((j) => (
                    <JobCard key={j.meta.slug} meta={j.meta} />
                  ))}
                </div>
              )}
              {closed.length > 0 && (
                <>
                  <div className="sec-head" style={{ margin: "64px 0 24px" }}>
                    <span className="eyebrow">Filled or expired</span>
                  </div>
                  <div className="post-grid">
                    {closed.map((j) => (
                      <JobCard key={j.meta.slug} meta={j.meta} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </Shell>
  );
}
