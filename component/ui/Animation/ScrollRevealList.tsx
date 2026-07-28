"use client";

import { useLayoutEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealListProps {
  children: ReactNode;
  /** Jarak trigger dari viewport, misal "top 85%" */
  start?: string;
  /** Offset posisi awal sebelum reveal (px) */
  y?: number;
  duration?: number;
  ease?: string;
  /** Class tambahan untuk wrapper luar */
  className?: string;
}

export default function ScrollRevealList({
  children,
  start = "top 85%",
  y = 60,
  duration = 0.9,
  ease = "power3.out",
  className = "",
}: ScrollRevealListProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = wrapRef.current?.querySelectorAll("[data-reveal-item]");
      if (!items) return;

      items.forEach((item) => {
        gsap.set(item, { y, opacity: 0 });

        gsap.to(item, {
          y: 0,
          opacity: 1,
          duration,
          ease,
          scrollTrigger: {
            trigger: item,
            start,
            toggleActions: "play none none none",
            once: true,
          },
        });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [start, y, duration, ease]);

  return (
    <div ref={wrapRef} className={className}>
      {children}
    </div>
  );
}
