import React from "react";

interface AmbientBackgroundProps {
  className?: string;
  imageUrl?: string;
}

const GRAIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <filter id="n">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0" />
  </filter>
  <rect width="100%" height="100%" filter="url(#n)" />
</svg>
`;
const GRAIN_DATA_URI = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

export default function AmbientBackground({
  className = "-top-32 md:-top-48 -bottom-24 md:-bottom-40",
  imageUrl = "/background/background-ambient.jpeg",
}: AmbientBackgroundProps) {
  return (
    <div
      className={`absolute inset-x-0 -z-10 overflow-hidden bg-[#050505] ${className}`}
      style={{
        isolation: "isolate",
        contain: "paint",
        transform: "translateZ(0)",
      }}
      aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 transform-gpu blur-3xl scale-110"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          filter: "brightness(1.05) saturate(1.2) contrast(1.05)",
        }}
      />
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl backdrop-saturate-150" />

      {/* SCRIM RADIAL */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 40%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0) 75%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{
          backgroundImage: GRAIN_DATA_URI,
          backgroundRepeat: "repeat",
        }}
      />

      {/* 
        PERUBAHAN 3: FADE ATAS
        Diganti dari "black" menjadi "#050505" agar match dengan background section lain.
        Tingginya ditambah menjadi h-48 md:h-64 agar transisinya lebih panjang.
      */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 md:h-64 bg-gradient-to-b from-[#050505] via-[#050505]/60 to-transparent" />

      {/* 
        PERUBAHAN 4: FADE BAWAH
        Sama seperti atas, dibuat lebih tinggi (h-64 md:h-80) dan dipastikan mulainya dari solid #050505.
      */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 md:h-80 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
    </div>
  );
}
