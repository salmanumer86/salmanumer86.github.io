"use client";

import { useEffect } from "react";

/**
 * Scroll-driven effects for the marketing pages:
 * - .reveal / .stagger-grid fade in when they enter the viewport
 * - language meters fill on reveal
 * - .stats strip count-up numbers
 * Renders nothing; safe to mount anywhere.
 */
export function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          e.target.querySelectorAll<HTMLElement>(".meter i").forEach((bar) => {
            bar.style.width = bar.dataset.w ?? "0";
          });
          io.unobserve(e.target);
        });
      },
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal,.stagger-grid").forEach((el) => io.observe(el));

    function countUp(el: HTMLElement) {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? "";
      const dur = 1500;
      if (reduce) {
        el.textContent = target + suffix;
        return;
      }
      let start: number | null = null;
      const tick = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    const stats = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          e.target.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          stats.unobserve(e.target);
        });
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll(".stats").forEach((s) => stats.observe(s));

    return () => {
      io.disconnect();
      stats.disconnect();
    };
  }, []);

  return null;
}
