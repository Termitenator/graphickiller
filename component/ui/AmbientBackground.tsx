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
    // top-0 + bottom negatif = boleh "nembus" ke bawah section, tapi tetap overflow-hidden
    // di sini saja (bukan di parent section) supaya blur/grain nggak bocor ke seluruh page.
    <div
      className="absolute inset-x-0 top-0 -bottom-24 md:-bottom-40 -z-10 overflow-hidden bg-[#050505]"
      aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 transform-gpu max-md:blur-2xl"
        style={{
          backgroundImage: "url('/background/background-ambient.jpeg')",
          filter: "brightness(1.05) saturate(1.2) contrast(1.05)",
        }}
      />

      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-2xl backdrop-saturate-150 transform-gpu" />

      {/* SCRIM RADIAL — kunci utama supaya teks tetap kebaca apapun kondisi gambarnya */}
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

      {/* FADE ATAS */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

      {/* FADE BAWAH — dipanjangin biar transisi ke section berikutnya halus & sedikit bleed */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 md:h-72 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
    </div>
  );
}
