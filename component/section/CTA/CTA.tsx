"use client";

import React, { useState } from "react";
import AnimateIn from "@/component/ui/Animation/AnimatedIn";
import Button from "@/component/ui/Button"; // Menggunakan UI Button milikmu
import ContactInfoItem from "./ContactInfoItem";
import SolidInput from "@/component/ui/Form/SolidInput";
import UnderlineInput from "@/component/ui/Form/UnderlineInput";
import BudgetSelector from "@/component/ui/Form/BudgetSelector";

const BUDGET_OPTIONS = ["$5k-$10k", "$10k-$28k", "$28k-$50k", "50k+"];

export default function ContactSection() {
  const [selectedBudget, setSelectedBudget] = useState<string>("");

  return (
    <section className="relative w-full bg-[#050505] text-white py-20 overflow-hidden z-20">
      {/* EFEK GLOW / SPHERE BACKGROUND */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] bg-white/[0.03] rounded-full blur-[100px] md:blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* SISI KIRI: Typography & Informasi Kontak */}
          <div className="flex flex-col justify-between">
            <AnimateIn
              direction="up"
              stagger={0.1}
              scrollTriggered={true}
              disableScrollReverse={true}>
              <div data-animated>
                <h2 className="text-[3.5rem] md:text-[5.5rem] lg:text-[6rem] font-extrabold uppercase leading-[0.9] tracking-tighter font-neue mb-8">
                  Let's Create
                  <br />
                  Something
                  <br />
                  Exceptional
                </h2>

                <p className="text-white/60 text-lg max-w-md leading-relaxed mb-16 md:mb-24">
                  We transform ideas into memorable visual identities that help
                  businesses stand out.
                </p>
              </div>

              {/* GRID INFO KONTAK */}
              <div
                data-animated
                className="grid grid-cols-2 gap-x-8 gap-y-12 w-full max-w-lg">
                <ContactInfoItem
                  label="Email"
                  value="hello@graphickiller.com"
                  href="mailto:hello@graphickiller.com"
                />
                <ContactInfoItem
                  label="WhatsApp"
                  value="+62 xxx xxxx xxxx"
                  href="https://wa.me/6281234567890"
                />
                <ContactInfoItem
                  label="Instagram"
                  value="@graphickiller"
                  href="https://instagram.com/graphickiller"
                />
                <ContactInfoItem label="Office" value="Denpasar, Bali" />
              </div>
            </AnimateIn>
          </div>

          {/* SISI KANAN: Form Kontak */}
          <AnimateIn
            direction="up"
            delay={0.2}
            scrollTriggered={true}
            className="w-full"
            disableScrollReverse={true}>
            {/* WRAPPER FORM DENGAN GLASSMORPHISM */}
            <div
              data-animated
              className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 p-8 md:p-12 w-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col w-full">
                {/* Inputs (Sekarang menggunakan desain dark/glassy) */}
                <div className="flex flex-col gap-4 mb-10">
                  <SolidInput type="text" placeholder="Name" required />
                  <SolidInput type="email" placeholder="Email" required />
                  <SolidInput type="text" placeholder="Company (Optional)" />
                </div>

                <div className="mb-10">
                  <UnderlineInput label="What are you building?" type="text" />
                </div>

                <div className="mb-10">
                  <BudgetSelector
                    label="Estimated Budget"
                    options={BUDGET_OPTIONS}
                    selected={selectedBudget}
                    onSelect={setSelectedBudget}
                  />
                </div>

                <div className="mb-12">
                  <UnderlineInput
                    placeholder="Tell us about your project"
                    type="text"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full !bg-white !text-black font-bold uppercase tracking-[0.2em] text-xs md:text-sm !py-5 flex justify-center items-center gap-3 hover:!bg-neutral-200 transition-colors group !rounded-none border-none">
                  Start Your Project
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform transition-transform duration-300 group-hover:translate-x-1">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>

                <p className="text-center text-white/30 text-[10px] md:text-xs mt-6 font-mono">
                  Usually replies within 1 hour.
                </p>
              </form>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
