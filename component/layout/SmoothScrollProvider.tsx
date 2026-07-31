"use client";

import { useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/libs/lenis-instance";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      autoRaf: false, // kita drive manual lewat gsap.ticker
    });
    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // expose ke window buat debugging (opsional, bisa dihapus nanti)
    // @ts-expect-error debug only
    window.lenis = lenis;

    lenis.scrollTo(0, { immediate: true });

    // sync: kasih tau ScrollTrigger tiap kali Lenis update posisi scroll
    lenis.on("scroll", ScrollTrigger.update);

    // drive Lenis dari GSAP ticker (biar 1 render loop, gak dobel rAF)
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
