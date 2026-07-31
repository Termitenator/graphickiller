"use client";

import React, { useState, useEffect } from "react";
import AnimateIn from "@/component/ui/Animation/AnimatedIn";
import Marquee from "@/component/ui/Animation/Marquee";
import { TestimonialCard, Testimonial } from "@/component/ui/TestimonialCard";

const DUMMY_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "Hasil desain yang sangat luar biasa. Detailnya presisi dan benar-benar mengangkat citra brand kami.",
    name: "A. S.",
    title: "Marketing Director",
  },
  {
    id: 2,
    quote:
      "Komunikasi yang responsif dan eksekusi produksi neon sign yang sangat rapi. Sangat direkomendasikan.",
    name: "B. T.",
    title: "Founder, Aurora Cafe",
  },
  {
    id: 3,
    quote: "Tim kreatif brilian untuk proyek identitas korporat kami.",
    name: "CEO",
    title: "Lumina",
  },
  {
    id: 4,
    quote:
      "Dari konsep hingga instalasi interior hotel, tim GraphicKiller bekerja dengan sangat profesional.",
    name: "M. W.",
    title: "GM, Hotel XYZ",
  },
  {
    id: 5,
    quote:
      "Pendekatan minimalis yang mereka terapkan sangat sesuai dengan visi modern kami.",
    name: "R. D.",
    title: "Creative Head",
  },
  {
    id: 6,
    quote:
      "Signage yang mereka produksi tidak hanya indah tapi juga fungsional dan tahan lama. Investasi terbaik.",
    name: "J. M.",
    title: "Owner, The Grand Azure",
  },
  // Tambahan data agar lebih panjang saat dibagi 2
  {
    id: 7,
    quote:
      "Mereka mengerti visi kami dan mengeksekusinya dengan sempurna. Brand identity kami jadi jauh lebih modern.",
    name: "K. L.",
    title: "Product Manager",
  },
  {
    id: 8,
    quote:
      "Pengalaman bekerja sama yang memuaskan dari awal hingga akhir. Sangat solutif dan kreatif.",
    name: "D. R.",
    title: "Creative Director",
  },
];

export default function TestimonialSection() {
  // 2. STATE UNTUK MENYIMPAN DATA DARI API
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. SIMULASI FETCH API
  useEffect(() => {
    // Fungsi ini nanti tinggal diganti dengan fetch dari endpoint API sungguhan
    // contoh: fetch('/api/testimonials').then(res => res.json()).then(data => setTestimonials(data))
    const fetchTestimonials = async () => {
      try {
        // Simulasi delay jaringan selama 1 detik
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setTestimonials(DUMMY_TESTIMONIALS);
      } catch (error) {
        console.error("Gagal mengambil data testimoni:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // 4. MEMBAGI DATA MENJADI DUA BARIS (Tengah-tengah)
  // Menghindari error jika data masih kosong
  const middleIndex = Math.ceil(testimonials.length / 2);
  const firstRow = testimonials.slice(0, middleIndex);
  const secondRow = testimonials.slice(middleIndex);

  return (
    <section className="relative z-20 w-full py-20 overflow-hidden">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6">
        <AnimateIn
          direction="up"
          stagger={0.1}
          scrollTriggered={true}
          className="w-full"
          disableScrollReverse={true}>
          <div data-animated className="mb-10 md:mb-16">
            <h2 className="text-5xl md:text-7xl font-extrabold font-neue tracking-tighter leading-none">
              <span className="text-white/20">Klien</span>
              <br />
              <span className="text-white">Testimoni</span>
            </h2>
          </div>
        </AnimateIn>
      </div>

      {/* AREA MARQUEE KIRI & KANAN */}
      <AnimateIn
        direction="up"
        stagger={0.15}
        scrollTriggered={true}
        className="w-full"
        disableScrollReverse={true}>
        <div data-animated className="w-full flex flex-col gap-6 md:gap-8">
          {isLoading ? (
            // Tampilan sementara saat loading API
            <div className="w-full text-center text-white/50 py-10">
              Memuat testimoni...
            </div>
          ) : (
            <>
              {/* BARIS PERTAMA: Bergerak ke Kiri */}
              {firstRow.length > 0 && (
                <Marquee direction="left" pauseOnHover={true}>
                  {firstRow.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-[320px] md:w-[450px] shrink-0 h-full">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </Marquee>
              )}

              {/* BARIS KEDUA: Bergerak ke Kanan */}
              {secondRow.length > 0 && (
                <Marquee direction="right" pauseOnHover={true}>
                  {secondRow.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-[320px] md:w-[450px] shrink-0 h-full">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </Marquee>
              )}
            </>
          )}
        </div>
      </AnimateIn>
    </section>
  );
}
