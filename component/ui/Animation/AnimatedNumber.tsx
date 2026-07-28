"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedNumberProps {
  /** Nomor tujuan, misal "01", "02", "12" */
  value: string;
  duration?: number;
  start?: string;
  className?: string;
}

export default function AnimatedNumber({
  value,
  duration = 1.2,
  start = "top 85%",
  className = "",
}: AnimatedNumberProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const target = parseInt(value, 10);
    const padLength = value.length; // pertahankan leading zero, misal "01"
    const counter = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: target,
        duration,
        ease: "power2.out",
        snap: "val",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
          once: true,
        },
        onUpdate: () => {
          el.textContent = String(Math.round(counter.val)).padStart(
            padLength,
            "0",
          );
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, duration, start]);

  return (
    <span ref={spanRef} className={className}>
      {String(0).padStart(value.length, "0")}
    </span>
  );
}
