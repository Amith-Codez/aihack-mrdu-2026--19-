"use client";

import { useEffect, useRef, type ReactNode } from "react";

// A red-pen loop drawn round its child, like a teacher circling a mark. Draws once (CSS), still under reduced motion.
export function PenCircle({ children, delay = 600, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <span className={`mm-circled ${className}`} style={{ ["--d" as string]: `${delay}ms` }}>
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
        <path
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          d="M80 7C62-1 20 1 7 20-4 38 20 58 52 57 84 56 101 40 95 21 91 9 70 3 50 5"
        />
      </svg>
      {children}
    </span>
  );
}

// Counts up to a real number once, on mount. The server renders the final value, so no-JS readers see it too.
export function CountUp({ value, decimals = 0, suffix = "", ms = 1100 }: { value: number; decimals?: number; suffix?: string; ms?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (value * eased).toFixed(decimals) + suffix;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    // Count only once the number is on screen, so nobody misses it.
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.textContent = (0).toFixed(decimals) + suffix;
        start = performance.now();
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, decimals, suffix, ms]);
  return <span ref={ref}>{value.toFixed(decimals) + suffix}</span>;
}

// Adds `is-in` once the block is half on screen (starts its one-shot CSS animations).
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.classList.add("is-in");
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
