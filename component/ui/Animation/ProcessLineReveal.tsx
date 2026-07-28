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
      const amplitude = 16; // ketinggian gelombang
      const cycles = 2; // jumlah naik-turun per segmen
      const segments = cycles * 2;

      let d = `M ${p0.x} ${p0.y}`;
      for (let s = 0; s < segments; s++) {
        const t0 = s / segments;
        const t1 = (s + 1) / segments;
        const x0 = p0.x + dx * t0;
        const x1 = p0.x + dx * t1;
        const yBase0 = p0.y + (p1.y - p0.y) * t0;
        const yBase1 = p0.y + (p1.y - p0.y) * t1;
        // arah gelombang selang-seling naik/turun tiap sub-segmen
        const dir = s % 2 === 0 ? -1 : 1;
        const cx = (x0 + x1) / 2;
        const cy = (yBase0 + yBase1) / 2 + dir * amplitude;
        d += ` Q ${cx} ${cy}, ${x1} ${yBase1}`;
      }
      return d;
    });
  }, [gridRef]);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const svg = svgRef.current!;
      const segmentDs = buildSegmentPaths();

      // Defs sekali aja: gradient + glow filter buat line
      const defs = `
  <defs>
    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.4" />
    </linearGradient>
    <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
`;

      svg.innerHTML =
        defs +
        segmentDs
          .map(
            (d, i) => `
        <path d="${d}" fill="none" stroke="white" stroke-opacity="0.12"
              stroke-width="1.5" stroke-dasharray="3 8" stroke-linecap="round" />
        <path data-segment="${i}" d="${d}" fill="none"
              stroke="url(#lineGradient)" stroke-width="2"
              stroke-linecap="round" filter="url(#lineGlow)" />
      `,
          )
          .join("");

      const progressPaths = Array.from(
        svg.querySelectorAll<SVGPathElement>("[data-segment]"),
      );

      // Sembunyikan tiap garis progress di awal
      progressPaths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      // Kondisi awal eksplisit lewat GSAP (menimpa inline style SSR agar konsisten)
      for (let s = 2; s <= totalSteps; s++) {
        gsap.set(getPart(s, "circle"), { scale: 0.8, opacity: 0.28 });
        gsap.set(getPart(s, "title"), { y: 16, opacity: 0 });
        gsap.set(getPart(s, "desc"), { opacity: 0 });
        gsap.set(getPart(s, "ring"), { opacity: 0 });
      }
      gsap.set(getPart(1, "ring"), { opacity: 1 });

      // ===== MASTER TIMELINE — scroll-driven, pinned =====
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end,
          scrub,
          pin: true,
          anticipatePin: 1,
          // Section otomatis unpin begitu playhead timeline ini mencapai
          // akhir — yaitu tepat setelah entrance step terakhir selesai,
          // karena scrub mengunci progress timeline 1:1 ke posisi scroll.
        },
      });

      for (let idx = 1; idx < totalSteps; idx++) {
        const stepNumber = idx + 1;
        const prevStepNumber = idx;
        const segPath = progressPaths[idx - 1];

        // FASE: garis menyambung dari step sebelumnya ke step ini
        tl.to(segPath, { strokeDashoffset: 0, ease: "none", duration: 1 })
          // step sebelumnya jadi "completed": ring hilang, sedikit redup
          // tapi tetap jelas terlihat (bukan dim penuh seperti upcoming)
          .to(
            getPart(prevStepNumber, "ring"),
            { opacity: 0, duration: 0.25, ease: "power2.out" },
            "<0.55",
          )
          .to(
            getPart(prevStepNumber, "circle"),
            { opacity: 0.85, duration: 0.3, ease: "power2.out" },
            "<",
          )
          // step ini masuk: scale halus, tanpa bounce
          .to(
            getPart(stepNumber, "circle"),
            { scale: 1, opacity: 1, duration: 0.7, ease: "power4.out" },
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
            "<0.2", // delay singkat setelah title
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
      return () => window.removeEventListener("resize", handleResize);
    }, sectionRef);

    console.log("ScrollTriggers registered:", ScrollTrigger.getAll().length);
    console.log("sectionRef:", sectionRef.current);
    console.log("gridRef:", gridRef.current);
    console.log("svgRef:", svgRef.current);
    console.log("ScrollTriggers registered:", ScrollTrigger.getAll().length);
    return () => ctx.revert();
  }, [sectionRef, gridRef, totalSteps, end, scrub, buildSegmentPaths, getPart]);

  return (
    <svg
      ref={svgRef}
      className="absolute top-10 left-0 w-full h-12 hidden md:block z-0 pointer-events-none overflow-visible"
      preserveAspectRatio="none"
    />
  );
}
