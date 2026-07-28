"use client";

import { useRef } from "react";
import AnimateIn from "@/component/ui/Animation/AnimatedIn";
import ProcessLineReveal from "@/component/ui/Animation/ProcessLineReveal";
import ProcessStep from "@/component/ui/ProcessStep";

const PROCESS_DATA = [
  {
    id: "01",
    title: "Konsultasi",
    description:
      "Pemahaman visi, target audiens, dan skala proyek secara mendalam.",
    icon: (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Desain",
    description:
      "Eksplorasi visual dan persetujuan konsep struktural yang presisi.",
    icon: (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
        />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Produksi",
    description:
      "Manufaktur fisik atau persiapan finalisasi digital dengan standar tinggi.",
    icon: (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
        />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Serah Terima",
    description: "Instalasi akhir dan dokumentasi panduan brand komprehensif.",
    icon: (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
        />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full h-screen text-white flex items-center px-6">
      <div className="max-w-7xl mx-auto w-full">
        {/* HEADER SECTION */}
        <AnimateIn
          direction="up"
          stagger={0.1}
          scrollTriggered={true}
          className="w-full"
          disableScrollReverse={true}>
          <div data-animated className="mb-20">
            <h2 className="text-5xl md:text-7xl font-extrabold font-neue tracking-tighter leading-none">
              Proses
              <br />
              <span className="text-white/40">Metodologi</span>
            </h2>
          </div>
        </AnimateIn>

        {/* GRID STEPS + LINE ANIMATION (terpisah penuh) */}
        <div className="relative">
          <ProcessLineReveal
            sectionRef={sectionRef}
            gridRef={gridRef}
            totalSteps={PROCESS_DATA.length}
          />

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative z-10">
            {PROCESS_DATA.map((step, index) => (
              <ProcessStep
                key={step.id}
                stepIndex={index + 1}
                number={step.id}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
