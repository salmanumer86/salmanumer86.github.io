import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "./Icons";

export function Footer() {
  return (
    <footer>
      <div className="foot-inner">
        <div className="foot-brand">
          <span className="brand-logo foot-logo">
            <img src="/jazzari-logo.png" alt="Jazzari" width="40" height="40" />
          </span>
          <div>
            © {new Date().getFullYear()} <b>{site.name}</b>
            <br />
            Tech Recruiter · {site.company}
          </div>
        </div>
        <nav className="foot-links" aria-label="Site">
          <Link href="/blog/">Blog</Link>
          <Link href="/advice/">Advice</Link>
          <Link href="/jobs/">Jobs</Link>
          <a href="/feed.xml">RSS</a>
        </nav>
        <div className="foot-social">
          <a href={site.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
            <Icon name="i-linkedin" />
          </a>
          <a href={`https://wa.me/${site.phone.replace("+", "")}`} target="_blank" rel="noopener" aria-label="WhatsApp">
            <Icon name="i-whatsapp" />
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email">
            <Icon name="i-gmail" />
          </a>
        </div>
      </div>
    </footer>
  );
}
