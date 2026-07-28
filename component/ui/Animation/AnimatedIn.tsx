"use client";

import gsap from "gsap";
import { useRef, useEffect } from "react"; // Ubah ke useEffect untuk Next.js
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
  // 1. Ubah default menjadi true agar semua elemen otomatis pakai efek viewport
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

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const targets =
        container.querySelectorAll<HTMLElement>("[data-animated]");
      if (!targets.length) return;

      const offset = getOffset(direction, distance);

      // Set awal sebelum masuk viewport
      gsap.set(targets, {
        opacity: 0,
        ...offset,
        willChange: "transform, opacity",
      });
      console.log("enterAnim called");

      // 2. Animasi Masuk (Tampil)
      const enterAnim = () => console.log("enterAnim called");
      return gsap.to(targets, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        stagger,
        ease: "power3.out",
        onComplete() {
          targets.forEach((el) => {
            console.log(
              el.dataset.animated,
              "opacity:",
              gsap.getProperty(el, "opacity"),
              "y:",
              gsap.getProperty(el, "y"),
            );
          });
        },
      });

      // 3. Animasi Keluar/Reverse (Menghilang)
      const leaveAnim = () =>
        gsap.to(targets, {
          opacity: 0,
          ...offset,
          duration: duration * 0.6, // Sedikit lebih lambat agar transisi baliknya mulus
          stagger: stagger * 0.5,
          ease: "power2.inOut",
          overwrite: "auto",
        });

      if (scrollTriggered) {
        ScrollTrigger.create({
          trigger: container,
          // 4. Titik picu: Mulai saat elemen masuk 85% dari atas layar (lebih responsif)
          start: "top 85%",
          // Titik akhir: Saat elemen menyentuh 15% layar bagian atas
          end: "bottom 15%",
          // markers: true, // Hapus atau comment baris ini jika sudah masuk ke production

          // --- LOGIKA REVERSE SCROLL ---
          onEnter: enterAnim, // Scroll ke bawah (elemen masuk layar) -> Tampil
          onLeave: disableScrollReverse ? undefined : leaveAnim, // Scroll terus ke bawah (elemen keluar atas) -> Hilang
          onEnterBack: enterAnim, // Scroll balik ke atas (elemen masuk lagi dari atas) -> Tampil
          onLeaveBack: disableScrollReverse ? undefined : leaveAnim, // Scroll balik ke atas (elemen keluar bawah) -> Hilang
        });
      } else {
        // Mode tanpa scrollTrigger (Langsung muncul saat dimuat)
        // Berguna khusus untuk elemen di bagian paling atas halaman (Hero)
        requestAnimationFrame(() => enterAnim());

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
      //   targets.forEach((el) => {
      //     console.log(el.dataset.animated, el.tagName, el.className);
      //   });
      //   console.log("Targets : ", targets);
    }, container);

    // Refresh ScrollTrigger sesudah DOM dimuat sempurna untuk akurasi posisi
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
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
