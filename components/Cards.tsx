import Link from "next/link";
import { formatDate, isJobOpen, type JobMeta, type PostMeta } from "@/lib/content";

export function PostCard({ meta }: { meta: PostMeta }) {
  const href = `/${meta.section}/${meta.slug}/`;
  return (
    <Link href={href} className={`post-card${meta.draft ? " is-draft" : ""}`}>
      <div className="meta">
        <b>{meta.section === "advice" ? "Advice" : "Article"}</b>
        <span>{formatDate(meta.date)}</span>
        <span>{meta.readingTime} min read</span>
        {meta.draft && <span className="draft-pill">Draft</span>}
      </div>
      <h3>{meta.title}</h3>
      <p>{meta.description}</p>
      {meta.tags.length > 0 && (
        <div className="tags">
          {meta.tags.slice(0, 3).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      )}
      <span className="more">Read more →</span>
    </Link>
  );
}

export function JobCard({ meta }: { meta: JobMeta }) {
  const open = isJobOpen(meta);
  return (
    <Link href={`/jobs/${meta.slug}/`} className={`post-card job-card${meta.draft ? " is-draft" : ""}`}>
      <div className="meta">
        <span className={`job-pill${open ? "" : " closed"}`}>{open ? "● Open" : "Closed"}</span>
        {meta.remote && <span className="job-pill remote">Remote</span>}
        <span>{formatDate(meta.date)}</span>
        {meta.draft && <span className="draft-pill">Draft</span>}
      </div>
      <h3>{meta.title}</h3>
      <div className="co-line">
        <b>{meta.company}</b>
        <span>· {meta.location}</span>
      </div>
      <p>{meta.description}</p>
      {meta.stack.length > 0 && (
        <div className="stack">
          {meta.stack.slice(0, 5).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      )}
      <span className="more">View role →</span>
    </Link>
  );
}
