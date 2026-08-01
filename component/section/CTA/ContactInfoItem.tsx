"use client";

import React, { useRef } from "react";
import gsap from "gsap";

interface ContactInfoItemProps {
  label: string;
  value: string;
  href?: string;
}

export default function ContactInfoItem({
  label,
  value,
  href,
}: ContactInfoItemProps) {
  const textRef = useRef<HTMLAnchorElement | HTMLParagraphElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const handleMouseEnter = () => {
    if (!href) return;

    // Teks digeser jauh ke kanan (24px) untuk memberi ruang pada panah
    gsap.to(textRef.current, {
      x: 24,
      color: "#ffffff",
      duration: 0.4,
      ease: "power3.out",
    });

    // Panah muncul ke titik awal (0)
    gsap.to(arrowRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!href) return;

    // Teks kembali ke posisi semula (0)
    gsap.to(textRef.current, {
      x: 0,
      color: "rgba(255, 255, 255, 0.6)",
      duration: 0.4,
      ease: "power3.out",
    });

    // Panah bersembunyi lagi ke arah kiri (-16px)
    gsap.to(arrowRef.current, {
      x: -16,
      opacity: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <div
      className="border-b border-white/10 pb-4 cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <h4 className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-2">
        {label}
      </h4>

      <div className="flex items-center relative overflow-hidden">
        {/* Panah Tersembunyi */}
        {href && (
          <svg
            ref={arrowRef}
            className="w-4 h-4 text-white absolute left-0 opacity-0 -translate-x-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        )}

        {/* Teks/Link */}
        {href ? (
          <a
            ref={textRef as React.RefObject<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base text-white/60 block relative transition-none">
            {value}
          </a>
        ) : (
          <p
            ref={textRef as React.RefObject<HTMLParagraphElement>}
            className="text-sm md:text-base text-white block relative">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
