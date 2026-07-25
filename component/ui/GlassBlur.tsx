interface GlassBlurProps {
  height?: number;
  blur?: number;
  fadeStart?: number;
  tintFrom?: string;
  tintVia?: string;
  className?: string;
}

export default function GlassBlur({
  height = 250,
  blur = 20,
  fadeStart = 25,
  tintFrom = "white/5",
  tintVia = "white/[0.02]",
  className = "",
}: GlassBlurProps) {
  return (
    <div
      className={`absolute inset-x-0 top-0 pointer-events-none ${className}`}
      style={{ height: `${height}px` }}>
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          maskImage: `linear-gradient(to bottom, black 0%, black ${fadeStart}%, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${fadeStart}%, transparent 100%)`,
        }}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-b from-${tintFrom} via-${tintVia} to-transparent`}
      />
    </div>
  );
}
