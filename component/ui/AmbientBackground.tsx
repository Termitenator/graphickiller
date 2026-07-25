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

export default function AmbientBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-[#050505]"
      aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-55 transform-gpu max-md:blur-2xl"
        style={{
          backgroundImage: "url('/background/background-ambient.jpeg')",
          filter: "brightness(1.25) saturate(1.35) contrast(1.05)",
        }}
      />

      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl backdrop-saturate-150 transform-gpu" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: GRAIN_DATA_URI,
          backgroundRepeat: "repeat",
        }}
      />

      {/* 4. FADE GRADIENT ATAS */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

      {/* 5. FADE GRADIENT BAWAH */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
    </div>
  );
}
