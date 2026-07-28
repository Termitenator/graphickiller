"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProcessLineRevealProps {
  /** Elemen yang akan di-pin & jadi scroll trigger (biasanya <section>) */
  sectionRef: React.RefObject<HTMLElement | null>;
  /** Container grid berisi step-step dengan data-step & data-part */
  gridRef: React.RefObject<HTMLElement | null>;
  totalSteps: number;
  /** Jarak scroll untuk scrub seluruh timeline, mis. "+=300%" */
  end?: string;
  scrub?: number | boolean;
}

export default function ProcessLineReveal({
  sectionRef,
  gridRef,
  totalSteps,
  end = "+=300%",
  scrub = 1,
}: ProcessLineRevealProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const getPart = useCallback(
    (step: number, part: string) =>
      gridRef.current?.querySelector(
        `[data-step="${step}"] [data-part="${part}"]`,
      ) ?? null,
    [gridRef],
  );

  const buildSegmentPaths = useCallback(() => {
    const grid = gridRef.current;
    const svg = svgRef.current;
    if (!grid || !svg) return [];

    const gridRect = grid.getBoundingClientRect();
    const circles = Array.from(
      grid.querySelectorAll<HTMLElement>('[data-part="circle"]'),
    );

    const centers = circles.map((c) => {
      const r = c.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - gridRect.left,
        y: r.top + r.height / 2 - gridRect.top,
      };
    });

    svg.setAttribute("viewBox", `0 0 ${gridRect.width} ${gridRect.height}`);

    // Wave sinusoidal sungguhan: tiap segmen dipecah jadi beberapa
    // bezier curve kecil yang naik-turun, biar terasa seperti gelombang
    // beneran (bukan cuma satu lengkungan tunggal per segmen).
    return centers.slice(0, -1).map((p0, i) => {
      const p1 = centers[i + 1];
      const dx = p1.x - p0.x;

      // Penentu arah awal gelombang
      const dir = i % 2 === 0 ? -1 : 1;
      const amplitude = 125;

      // 1. Tentukan Titik Tengah persis di antara p0 dan p1
      const midX = p0.x + dx * 0.5;
      const midY = p0.y + (p1.y - p0.y) * 0.5;

      /* 2. Sesuaikan Panjang Tuas (Control Point)
         Karena jarak kurvanya sekarang dibagi dua (p0 ke mid, lalu mid ke p1),
         angka rasio emas 0.36 kita kalikan setengah (dx * 0.5 * 0.36 = dx * 0.18).
      */
      const cpX = dx * 0.18;

      return `
        M ${p0.x} ${p0.y}

       
        C
          ${p0.x + cpX} ${p0.y + amplitude * dir},
          ${midX - cpX} ${midY + amplitude * dir},
          ${midX} ${midY}

        
        C
          ${midX + cpX} ${midY + amplitude * -dir},
          ${p1.x - cpX} ${p1.y + amplitude * -dir},
          ${p1.x} ${p1.y}
      `;
    });
  }, [gridRef]);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current || !svgRef.current) return;

    // Pin + scrub timeline cuma relevan di layar md ke atas.
    // Di mobile kita pakai MobileProcessTimeline (natural scroll, no pin).
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const svg = svgRef.current!;
      const segmentDs = buildSegmentPaths();

      const defs = `
<defs>

  <linearGradient
      id="lineGradient"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%">

      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15"/>
      <stop offset="25%" stop-color="#f5f5f5" stop-opacity="0.75"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="75%" stop-color="#f5f5f5" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.15"/>

  </linearGradient>

  <filter
      id="lineGlow"
      x="-50%"
      y="-50%"
      width="200%"
      height="200%">

      <feGaussianBlur
          stdDeviation="3.5"
          result="blur"/>

      <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
      </feMerge>

  </filter>

</defs>
`;

      svg.innerHTML =
        defs +
        segmentDs
          .map(
            (d, i) => `
        <path d="${d}" fill="none" stroke="white" stroke-opacity="0.25"
              stroke-width="2" stroke-dasharray="2 8" stroke-linecap="round" />
        <path data-segment="${i}" d="${d}" fill="none"
              stroke="url(#lineGradient)" stroke-width="2.5"
              stroke-linecap="round" filter="url(#lineGlow)" />
      `,
          )
          .join("");

      const progressPaths = Array.from(
        svg.querySelectorAll<SVGPathElement>("[data-segment]"),
      );

      progressPaths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      for (let s = 2; s <= totalSteps; s++) {
        gsap.set(getPart(s, "circle"), {
          scale: 0.8,
          backgroundColor: "#3a3a3a",
        });
        gsap.set(getPart(s, "title"), { y: 16, opacity: 0 });
        gsap.set(getPart(s, "desc"), { opacity: 0 });
        gsap.set(getPart(s, "ring"), { opacity: 0 });
      }
      gsap.set(getPart(1, "ring"), { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end,
          scrub,
          pin: true,
          anticipatePin: 1,
        },
      });

      for (let idx = 1; idx < totalSteps; idx++) {
        const stepNumber = idx + 1;
        const prevStepNumber = idx;
        const segPath = progressPaths[idx - 1];

        tl.to(segPath, { strokeDashoffset: 0, ease: "none", duration: 1 })
          .to(
            getPart(prevStepNumber, "ring"),
            { opacity: 0, duration: 0.2, ease: "power2.out" },
            "<0.3",
          )
          .to(
            getPart(prevStepNumber, "circle"),
            { backgroundColor: "#5a5a5a", duration: 0.3, ease: "power2.out" }, // completed: sedikit lebih terang dari upcoming
            "<",
          )
          .to(
            getPart(stepNumber, "circle"),
            {
              scale: 1,
              backgroundColor: "#ffffff",
              duration: 0.7,
              ease: "power4.out",
            },
            "<0.15",
          )
          .to(
            getPart(stepNumber, "title"),
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "<0.1",
          )
          .to(
            getPart(stepNumber, "desc"),
            { opacity: 1, duration: 0.6, ease: "power2.out" },
            "<0.2",
          )
          .to(
            getPart(stepNumber, "ring"),
            { opacity: 1, duration: 0.4, ease: "power2.out" },
            "<0.1",
          );
      }

      const handleResize = () => {
        const newDs = buildSegmentPaths();
        progressPaths.forEach((p, i) => {
          p.setAttribute("d", newDs[i]);
          gsap.set(p, { strokeDasharray: p.getTotalLength() });
        });
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      // cleanup khusus buat media query ini — dipanggil otomatis
      // pas breakpoint berubah atau component unmount
      return () => window.removeEventListener("resize", handleResize);
    });

    return () => mm.revert();
  }, [sectionRef, gridRef, totalSteps, end, scrub, buildSegmentPaths, getPart]);

  return (
    <svg
      ref={svgRef}
      className="absolute top-10 left-0 w-full h-12 hidden md:block z-[5] pointer-events-none overflow-visible"
      preserveAspectRatio="none"
    />
  );
}
