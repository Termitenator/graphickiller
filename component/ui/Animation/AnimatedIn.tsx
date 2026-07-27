"use client";

import gsap from "gsap";
import { useRef, useLayoutEffect } from "react";
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
  scrollTriggered = false,
  className,
}: AnimateInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    console.log("container: ", container);
    if (!container) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const targets =
        container.querySelectorAll<HTMLElement>("[data-animated]");
      console.log("targets found:", targets.length);
      if (!targets.length) return;

      const offset = getOffset(direction, distance);

      gsap.set(targets, {
        opacity: 0,
        ...offset,
        willChange: "transform, opacity",
      });

      const enterAnim = () =>
        gsap.to(targets, {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          stagger,
          delay,
          ease: "power3.out",
          overwrite: "auto",
        });

      const leaveAnim = () =>
        gsap.to(targets, {
          opacity: 0,
          ...offset,
          duration: duration * 0.55,
          stagger: stagger * 0.4,
          ease: "power2.in",
          overwrite: "auto",
        });

      if (scrollTriggered) {
        ScrollTrigger.create({
          trigger: container,
          start: "top 80%",
          markers: true,
          onEnter: enterAnim,
          onEnterBack: enterAnim,
          onLeave: disableScrollReverse ? undefined : leaveAnim,
          onLeaveBack: disableScrollReverse ? undefined : leaveAnim,
        });
      } else {
        enterAnim();

        if (!disableScrollReverse) {
          mm.add({ isDesktop: "(min-width: 1024px)" }, (context) => {
            const { isDesktop } = context.conditions as { isDesktop: boolean };
            ScrollTrigger.create({
              trigger: container,
              start: "top top",
              end: "bottom top",
              scrub: isDesktop ? 0.6 : false,
              onLeave: leaveAnim,
              onEnterBack: enterAnim,
            });
          });
        }
      }
    }, container);

    return () => {
      ctx.revert();
      mm.revert();
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
