"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Testimonial = {
  quote: string[];
  name: string;
  role: string;
  relation: string;
  avatar: string;
};

const AUTOPLAY = 5500;

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const [height, setHeight] = useState<number | undefined>();
  const rootRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduce = useRef(false);

  const go = useCallback((n: number) => setI(((n % items.length) + items.length) % items.length), [items.length]);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);
  const start = useCallback(() => {
    if (reduce.current) return;
    stop();
    timer.current = setInterval(() => setI((v) => (v + 1) % items.length), AUTOPLAY);
  }, [items.length, stop]);
  const restart = useCallback(() => {
    stop();
    start();
  }, [start, stop]);

  // measure active slide so the viewport animates height
  const measure = useCallback(() => {
    const el = slidesRef.current[i];
    if (el) setHeight(el.offsetHeight);
  }, [i]);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    start();
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 120);
    return () => {
      stop();
      clearTimeout(t);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", measure);
    };
  }, [start, stop, measure]);

  useEffect(measure, [measure]);

  // touch swipe
  const x0 = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    x0.current = e.touches[0].clientX;
    stop();
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (x0.current === null) return;
    const dx = e.changedTouches[0].clientX - x0.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
    x0.current = null;
    restart();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      go(i - 1);
      restart();
    } else if (e.key === "ArrowRight") {
      go(i + 1);
      restart();
    }
  };

  return (
    <div
      ref={rootRef}
      className="tst-carousel reveal"
      aria-roledescription="carousel"
      aria-label="Recommendations"
      onMouseEnter={stop}
      onMouseLeave={start}
      onFocus={stop}
      onBlur={start}
      onKeyDown={onKey}
    >
      <div className="tst-viewport" style={{ height }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="tst-track" style={{ transform: `translateX(${-i * 100}%)` }}>
          {items.map((t, idx) => (
            <div
              key={t.name}
              ref={(el) => {
                slidesRef.current[idx] = el;
              }}
              className={`tst-slide${idx === i ? " is-active" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${items.length}`}
              aria-hidden={idx !== i}
            >
              <div className="tst">
                <div className="quote">
                  {t.quote.map((p, k) => (
                    <p key={k}>{p}</p>
                  ))}
                </div>
                <div className="who">
                  <img className="ava" src={t.avatar} alt={t.name} width="52" height="52" loading="lazy" />
                  <span>
                    <span className="rel">{t.relation}</span>
                    <span className="nm">{t.name}</span>
                    <span className="rl">{t.role}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="tst-controls">
        <button
          className="tst-arrow"
          type="button"
          aria-label="Previous recommendation"
          onClick={() => {
            go(i - 1);
            restart();
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="tst-dots" role="tablist" aria-label="Choose recommendation">
          {items.map((t, idx) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={idx === i}
              aria-label={`Recommendation ${idx + 1}`}
              className={`tst-dot${idx === i ? " active" : ""}`}
              onClick={() => {
                go(idx);
                restart();
              }}
            />
          ))}
        </div>
        <button
          className="tst-arrow"
          type="button"
          aria-label="Next recommendation"
          onClick={() => {
            go(i + 1);
            restart();
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
