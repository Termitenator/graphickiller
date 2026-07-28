import React from "react";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  stepIndex: number;
}

export default function ProcessStep({
  number,
  title,
  description,
  icon,
  stepIndex,
}: ProcessStepProps) {
  const isFirst = stepIndex === 1;

  return (
    <div
      data-step={stepIndex}
      className="flex flex-col items-center text-center relative">
      {/* Ring glow — radial, lebih soft & "hidup" dibanding box-shadow biasa */}
      {/* Ring glow — soft blurred light, no hard edge */}
      <div
        data-part="ring"
        className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full pointer-events-none"
        style={{
          opacity: isFirst ? 1 : 0,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 75%)",
          filter: "blur(8px)",
        }}
      />

      {/* Circle icon — subtle border ring + inner shadow biar ada depth */}
      <div
        data-part="circle"
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-6 bg-white text-black"
        style={{
          opacity: isFirst ? 1 : 0.28,
          transform: isFirst ? "scale(1)" : "scale(0.8)",
          boxShadow:
            "inset 0 -4px 10px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.35)",
        }}>
        <div className="w-8 h-8 md:w-10 md:h-10">{icon}</div>

        {/* Badge nomor — border gradient tipis biar gak flat */}
        <div
          data-part="badge"
          className="absolute -top-1 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold font-neue bg-black text-white"
          style={{
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}>
          {number}
        </div>
      </div>

      {/* Title */}
      <h3
        data-part="title"
        className="text-xl md:text-2xl font-bold text-white font-neue mb-3"
        style={{
          opacity: isFirst ? 1 : 0,
          transform: isFirst ? "translateY(0)" : "translateY(16px)",
        }}>
        {title}
      </h3>

      {/* Description */}
      <p
        data-part="desc"
        className="text-sm md:text-base text-white/60 font-neue leading-relaxed max-w-[250px]"
        style={{ opacity: isFirst ? 1 : 0 }}>
        {description}
      </p>
    </div>
  );
}
