"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProcessStep from "@/component/ui/ProcessStep";

gsap.registerPlugin(ScrollTrigger);

interface StepData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function MobileProcessTimeline({
  steps,
}: {
  steps: StepData[];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapRef.current || !progressRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        const items = Array.from(
          wrapRef.current!.querySelectorAll<HTMLElement>("[data-mobile-step]"),
        );

        const wrapTop = wrapRef.current!.getBoundingClientRect().top;
        const firstCircle = items[0].querySelector('[data-part="circle"]')!;
        const lastCircle = items[items.length - 1].querySelector(
          '[data-part="circle"]',
        )!;
        const firstRect = firstCircle.getBoundingClientRect();
        const lastRect = lastCircle.getBoundingClientRect();

        const lineTop = firstRect.top + firstRect.height / 2 - wrapTop;
        const lineBottom = lastRect.top + lastRect.height / 2 - wrapTop;
        const lineHeight = lineBottom - lineTop;

        if (trackRef.current) {
          trackRef.current.style.top = `${lineTop}px`;
          trackRef.current.style.height = `${lineHeight}px`;
        }
        if (progressRef.current) {
          progressRef.current.style.top = `${lineTop}px`;
          progressRef.current.style.height = `${lineHeight}px`;
        }

        // 1. Set kondisi awal dulu
        items.forEach((item) => {
          const circle = item.querySelector('[data-part="circle"]');
          const badge = item.querySelector('[data-part="badge"]');
          const ring = item.querySelector('[data-part="ring"]');
          const title = item.querySelector('[data-part="title"]');
          const desc = item.querySelector('[data-part="desc"]');

          gsap.set(circle, { scale: 0.85, backgroundColor: "#1a1a1a" });
          gsap.set(badge, { color: "rgba(255,255,255,0.5)" });
          gsap.set(ring, { opacity: 0 });
          gsap.set(title, { y: 12, opacity: 0 });
          gsap.set(desc, { opacity: 0 });
        });

        // 2. BARU deklarasi tl di sini
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        });

        tl.fromTo(
          progressRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", duration: items.length },
          0,
        );

        // 3. BARU forEach yang makai tl, ini harus SETELAH const tl di atas
        items.forEach((item, i) => {
          const circle = item.querySelector('[data-part="circle"]');
          const badge = item.querySelector('[data-part="badge"]');
          const ring = item.querySelector('[data-part="ring"]');
          const title = item.querySelector('[data-part="title"]');
          const desc = item.querySelector('[data-part="desc"]');

          const at = i;

          tl.to(
            circle,
            {
              scale: 1,
              backgroundColor: "rgba(255,255,255,1)",
              duration: 0.4,
              ease: "power3.out",
            },
            at,
          )
            .to(
              badge,
              {
                color: "rgba(255,255,255,1)",
                duration: 0.35,
                ease: "power2.out",
              },
              at,
            )
            .to(
              ring,
              { opacity: 1, duration: 0.35, ease: "power2.out" },
              at + 0.05,
            )
            .to(
              title,
              { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
              at + 0.08,
            )
            .to(
              desc,
              { opacity: 1, duration: 0.35, ease: "power2.out" },
              at + 0.15,
            );
        });
      }, wrapRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [steps]);

  return (
    <div ref={wrapRef} className="relative md:hidden pl-1">
      <div
        ref={trackRef}
        className="absolute left-[30px] w-px bg-white/10"
        style={{ top: 0, height: 0 }}
      />

      <div
        ref={progressRef}
        className="absolute left-[30px] w-px origin-top"
        style={{
          top: 0,
          height: 0,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.3))",
          transform: "scaleY(0)",
        }}
      />

      <div className="flex flex-col gap-12">
        {steps.map((step, index) => (
          <div key={step.id} data-mobile-step={index + 1} className="relative">
            <ProcessStep
              variant="mobile"
              stepIndex={index + 1}
              number={step.id}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
