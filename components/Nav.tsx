"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icons";

// Section anchors on the home page + standalone content routes.
const links = [
  { href: "/#about", label: "About", id: "about" },
  { href: "/#services", label: "Services", id: "services" },
  { href: "/#approach", label: "Why me", id: "approach" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/blog/", label: "Blog" },
  { href: "/advice/", label: "Advice" },
  { href: "/jobs/", label: "Jobs" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // condense on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scrollspy — only meaningful on the home page
  useEffect(() => {
    if (!isHome) {
      setActive(null);
      return;
    }
    const ids = links.map((l) => l.id).filter(Boolean) as string[];
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, [isHome]);

  // close the mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (l: (typeof links)[number]) => {
    if (l.id) return isHome && active === l.id;
    return pathname.startsWith(l.href.replace(/\/$/, ""));
  };

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="Jazzari Software Solutions home">
          <span className="brand-logo">
            <img src="/jazzari-logo.png" alt="Jazzari" width="48" height="48" />
          </span>
          <span className="brand-name">
            Jazzari<small>Software Solutions</small>
          </span>
        </Link>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={isActive(l) ? "active" : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <ThemeToggle />
          <Link href="/#contact" className="cta">
            Let&apos;s talk business →
          </Link>
          <button
            type="button"
            className="menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobileMenu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className="mobile-menu" id="mobileMenu" hidden={!open}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={isActive(l) ? "active" : undefined} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const light = root.getAttribute("data-theme") === "light";
    try {
      if (light) {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    } catch {
      /* storage unavailable — theme still toggles for this page */
    }
  };
  return (
    <button className="theme-toggle" type="button" aria-label="Toggle light and dark theme" title="Toggle theme" onClick={toggle}>
      <Icon name="i-sun" className="ic-sun" />
      <Icon name="i-moon" className="ic-moon" />
    </button>
  );
}
