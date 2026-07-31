"use client";
import React, { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  pauseOnHover: boolean;
  className?: string;
}

export default function Marquee({
  children,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      {/* TRACK 1 */}
      <div
        className={`flex min-w-full shrink-0 items-stretch gap-6 md:gap-8 pr-6 md:pr-8 ${animationClass} ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}>
        {children}
      </div>

      {/* TRACK 2 (Duplikat untuk Looping tanpa jeda) */}
      <div
        aria-hidden="true"
        className={`flex min-w-full shrink-0 items-stretch gap-6 md:gap-8 pr-6 md:pr-8 ${animationClass} ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}>
        {children}
      </div>
    </div>
  );
}
