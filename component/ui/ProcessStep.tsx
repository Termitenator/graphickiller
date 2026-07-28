import React from "react";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  stepIndex: number;
  variant?: "desktop" | "mobile";
}

export default function ProcessStep({
  number,
  title,
  description,
  icon,
  stepIndex,
  variant = "desktop",
}: ProcessStepProps) {
  const isFirst = stepIndex === 1;

  if (variant === "mobile") {
    return (
      <div data-step={stepIndex} className="flex items-start gap-5 w-full">
        <div className="relative shrink-0">
          <div
            data-part="ring"
            className="absolute -inset-2 rounded-full pointer-events-none"
            style={{
              opacity: 0,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 70%)",
              filter: "blur(3px)",
            }}
          />
          <div
            data-part="circle"
            className="relative w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#1a1a1a",
              transform: "scale(0.85)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
            }}>
            <div data-part="icon" className="w-6 h-6 text-black">
              {icon}
            </div>
            <div
              data-part="badge"
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold font-neue bg-black text-white/50"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
              {number}
            </div>
          </div>
        </div>

        <div className="pt-2">
          <h3
            data-part="title"
            className="text-lg font-bold text-white font-neue mb-1"
            style={{ opacity: 0 }}>
            {title}
          </h3>
          <p
            data-part="desc"
            className="text-sm text-white/60 font-neue leading-relaxed"
            style={{ opacity: 0 }}>
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-step={stepIndex}
      className="flex flex-col items-center text-center relative">
      <div
        data-part="ring"
        className="absolute w-32 h-32 md:w-36 md:h-36 rounded-full pointer-events-none"
        style={{
          opacity: isFirst ? 1 : 0,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 65%)",
          filter: "blur(3px)",
        }}
      />

      {/* Circle icon — solid background, opacity di-drive lewat warna, bukan div opacity */}
      <div
        data-part="circle"
        className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-6"
        style={{
          backgroundColor: isFirst ? "#ffffff" : "#3a3a3a",
          transform: isFirst ? "scale(1)" : "scale(0.8)",
          boxShadow:
            "inset 0 -4px 10px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.35)",
        }}>
        <div
          data-part="icon"
          className="w-8 h-8 md:w-10 md:h-10"
          style={{ color: isFirst ? "#000000" : "#000000" }}>
          {icon}
        </div>

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

      <h3
        data-part="title"
        className="text-xl md:text-2xl font-bold text-white font-neue mb-3"
        style={{
          opacity: isFirst ? 1 : 0,
          transform: isFirst ? "translateY(0)" : "translateY(16px)",
        }}>
        {title}
      </h3>

      <p
        data-part="desc"
        className="text-sm md:text-base text-white/60 font-neue leading-relaxed max-w-[250px]"
        style={{ opacity: isFirst ? 1 : 0 }}>
        {description}
      </p>
    </div>
  );
}
