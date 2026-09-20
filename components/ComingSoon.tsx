import Link from "next/link";
import { Icon } from "./Icons";
import { site } from "@/lib/site";
import type { Section } from "@/lib/content";

const copy: Record<
  Section,
  { kicker: string; title: React.ReactNode; body: string; topics: string[]; cta: { label: string; href: string }; alt: string }
> = {
  blog: {
    kicker: "First articles in progress",
    title: (
      <>
        Notes from <span className="gold">both sides</span> of the hiring table.
      </>
    ),
    body: "I'm writing about hiring and partnerships the way they actually happen: how to choose an outsourcing partner, what companies get wrong in the first month with a remote team, and how I screen the engineers who end up on your shortlist.",
    topics: ["Choosing an outsourcing partner in Pakistan", "How I screen React developers", "Warm introductions vs cold outreach", "What a good partnership looks like"],
    cta: { label: "Follow on LinkedIn for updates", href: site.linkedin },
    alt: "Hiring right now? Skip the reading and",
  },
  advice: {
    kicker: "Career advice in progress",
    title: (
      <>
        Practical guidance for developers, <span className="gold">without the fluff</span>.
      </>
    ),
    body: "Résumés that clear the screening bar, LinkedIn profiles that get recruiter messages, and how to read a job offer. Written by someone who reads hundreds of developer CVs a month.",
    topics: ["The developer résumé that gets read", "LinkedIn for engineers", "Interview follow-up questions", "Evaluating an offer"],
    cta: { label: "Follow on LinkedIn for updates", href: site.linkedin },
    alt: "Want feedback on your CV today?",
  },
  jobs: {
    kicker: "First roles opening soon",
    title: (
      <>
        Open roles are <span className="gold">on the way</span>.
      </>
    ),
    body: "I'm lining up the first React, Next.js and full-stack positions with companies in Pakistan and abroad. Send your CV now and I'll match you before the roles go public.",
    topics: ["React / Next.js", "React Native", "Full-stack", "Lahore · Remote"],
    cta: { label: "Send me your CV", href: `mailto:${site.email}?subject=${encodeURIComponent("CV for upcoming roles")}` },
    alt: "Hiring and want to list a role here?",
  },
};

export function ComingSoon({ section }: { section: Section }) {
  const c = copy[section];
  const external = /^https?:/.test(c.cta.href);
  return (
    <div className="soon reveal">
      <div className="soon-orbit" aria-hidden="true">
        <span className="soon-ring" />
        <span className="soon-ring r2" />
        <span className="soon-core">
          <span className="soon-dot" />
        </span>
      </div>
      <div className="soon-body">
        <span className="eyebrow">
          <span className="live-dot" />
          {c.kicker}
        </span>
        <h2 className="soon-title">{c.title}</h2>
        <p className="soon-text">{c.body}</p>
        <div className="soon-topics">
          <small>What to expect</small>
          <div className="chips">
            {c.topics.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="soon-actions">
          {external ? (
            <a className="btn btn-gold" href={c.cta.href} target="_blank" rel="noopener">
              {section === "jobs" ? <Icon name="i-gmail" /> : <Icon name="i-linkedin" />}
              {c.cta.label}
            </a>
          ) : (
            <a className="btn btn-gold" href={c.cta.href}>
              <Icon name="i-gmail" />
              {c.cta.label}
            </a>
          )}
          <Link className="btn btn-ghost" href="/#contact">
            {c.alt} Get in touch →
          </Link>
        </div>
        {section !== "jobs" && (
          <p className="soon-rss">
            Prefer a reader? Subscribe to the <a href="/feed.xml">RSS feed</a> and new posts will show up automatically.
          </p>
        )}
      </div>
    </div>
  );
}
