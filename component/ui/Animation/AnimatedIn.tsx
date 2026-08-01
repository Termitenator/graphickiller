"use client";

import gsap from "gsap";
import { useRef, useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Direction = "up" | "down" | "left" | "right" | "fade";

interface AnimateInProps {
  children: React.ReactNode;
  direction?: Direction;
  distance?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  disableScrollReverse?: boolean;
  scrollTriggered?: boolean;
  className?: string;
}

const getOffset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    case "fade":
    default:
      return {};
  }
};

export default function AnimateIn({
  children,
  direction = "up",
  distance = 40,
  duration = 0.9,
  stagger = 0.12,
  delay = 0,
  disableScrollReverse = false,
  scrollTriggered = true,
  className,
}: AnimateInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const targets =
        container.querySelectorAll<HTMLElement>("[data-animated]");
      if (!targets.length) return;

      const offset = getOffset(direction, distance);

      // Set kondisi awal sebelum masuk viewport
      gsap.set(targets, {
        opacity: 0,
        ...offset,
        willChange: "transform, opacity",
      });

      if (scrollTriggered) {
        // Setiap elemen aktif SENDIRI-SENDIRI saat masuk viewport
        ScrollTrigger.batch(targets, {
          start: "top 85%",
          end: "bottom 15%",
          // markers: true, // aktifkan untuk debug posisi trigger

          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              y: 0,
              duration,
              stagger,
              delay,
              ease: "power3.out",
              overwrite: "auto",
            }),

          onLeave: disableScrollReverse
            ? undefined
            : (batch) =>
                gsap.to(batch, {
                  opacity: 0,
                  ...offset,
                  duration: duration * 0.6,
                  stagger: stagger * 0.5,
                  ease: "power2.inOut",
                  overwrite: "auto",
                }),

          onEnterBack: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              y: 0,
              duration,
              stagger,
              ease: "power3.out",
              overwrite: "auto",
            }),

          onLeaveBack: disableScrollReverse
            ? undefined
            : (batch) =>
                gsap.to(batch, {
                  opacity: 0,
                  ...offset,
                  duration: duration * 0.6,
                  stagger: stagger * 0.5,
                  ease: "power2.inOut",
                  overwrite: "auto",
                }),
        });
      } else {
        // Mode tanpa scroll trigger: langsung muncul saat mount (untuk Hero, dsb)
        requestAnimationFrame(() => {
          gsap.to(targets, {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            stagger,
            delay,
            ease: "power3.out",
          });
        });
      }
    }, container);

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, [
    direction,
    distance,
    duration,
    stagger,
    delay,
    disableScrollReverse,
    scrollTriggered,
  ]);

  return (
    <div ref={containerRef} className={className ?? "contents"}>
      {children}
    </div>
  );
}
