import Link from "next/link";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Effects } from "./Effects";
import { site } from "@/lib/site";

/** Nav + footer wrapper for every page other than the home page. */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <Effects />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((c) => (
        <span key={c.label} style={{ display: "contents" }}>
          <span className="sep">/</span>
          {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({ eyebrow, title, blurb, crumbs }: { eyebrow: string; title: string; blurb: string; crumbs?: { href?: string; label: string }[] }) {
  return (
    <header className="page-hero">
      <div className="wrap">
        <div className="sec-head">
          {crumbs && <Crumbs items={crumbs} />}
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="sec-title">{title}</h1>
          <p>{blurb}</p>
        </div>
      </div>
    </header>
  );
}

export function PostCta({ kind }: { kind: "hiring" | "developer" | "job" }) {
  const copy = {
    hiring: { h: "Hiring, outsourcing or exploring a partnership?", p: "I connect companies with vetted engineers and reliable development teams in Pakistan. I read the repo before you spend interview time.", cta: "Let's talk →", href: "/#contact" },
    developer: { h: "Want a second pair of eyes?", p: "I review developer résumés and LinkedIn profiles, and help you plan a job search that actually lands interviews.", cta: "Get in touch →", href: "/#contact" },
    job: { h: "Not quite the right fit?", p: `Tell me what you're looking for and I'll keep you in mind for the next role. Or email ${site.email} directly.`, cta: "Send a message →", href: "/#contact" },
  }[kind];
  return (
    <aside className="post-cta">
      <div>
        <h3>{copy.h}</h3>
        <p>{copy.p}</p>
      </div>
      <Link className="btn btn-gold" href={copy.href}>
        {copy.cta}
      </Link>
    </aside>
  );
}
