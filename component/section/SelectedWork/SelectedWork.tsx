"use client";

import { useState } from "react";
import Button from "@/component/ui/Button";
import AnimateIn from "@/component/ui/Animation/AnimatedIn";
import ProjectCard from "@/component/ui/ProjectCard";
import PortfolioFilter from "@/component/ui/Filter";
import AmbientBackground from "@/component/ui/AmbientBackground";

const PROJECTS = [
  {
    id: 1,
    title: "The Grand Azure",
    category: "Identitas",
    imageUrl: "/portfolio/grand-azure.jpg",
  },
  {
    id: 2,
    title: "Lumina Print",
    category: "Cetak",
    imageUrl: "/portfolio/lumina.jpg",
  },
  {
    id: 3,
    title: "Vinyl Collection",
    category: "Kemasan",
    imageUrl: "/portfolio/vinyl.jpg",
  },
  {
    id: 4,
    title: "Eco Retreat Interior",
    category: "Ruang",
    imageUrl: "/portfolio/interior.jpg",
  },
];

const CATEGORIES = ["Semua", "Identitas", "Ruang", "Cetak", "Kemasan"];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  return (
    <section className="relative z-20 w-full text-white py-20 px-6">
      <AmbientBackground
        className="-top-32 md:-top-110 -bottom-24 md:-bottom-40"
        imageUrl="/background/background-ambient.jpeg"
      />
      <div className="max-w-7xl mx-auto">
        {/* HEADER & FILTER */}
        <AnimateIn
          direction="up"
          stagger={0.1}
          scrollTriggered={true}
          className="w-full"
          disableScrollReverse={true}>
          <div
            data-animated
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
            {/* Judul Kiri */}
            <div>
              <h2 className="text-5xl md:text-7xl font-extrabold font-neue tracking-tighter leading-none">
                Pekerjaan
                <br />
                <span className="text-white/40">Terpilih</span>
              </h2>
            </div>

            <PortfolioFilter
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>
        </AnimateIn>

        {/* BENTO GRID PORTFOLIO */}
        <AnimateIn
          direction="up"
          stagger={0.15}
          scrollTriggered={true}
          className="w-full"
          disableScrollReverse={true}>
          <div
            data-animated
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* SISI KIRI (Grid 2 Kolom) */}
            <div className="md:col-span-2 flex flex-col gap-4 md:gap-6">
              <ProjectCard
                title={PROJECTS[0].title}
                category={PROJECTS[0].category}
                imageUrl={PROJECTS[0].imageUrl}
                className="w-full aspect-[4/3] md:aspect-[21/9]"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <ProjectCard
                  title={PROJECTS[1].title}
                  category={PROJECTS[1].category}
                  imageUrl={PROJECTS[1].imageUrl}
                  className="w-full aspect-square"
                />
                <ProjectCard
                  title={PROJECTS[2].title}
                  category={PROJECTS[2].category}
                  imageUrl={PROJECTS[2].imageUrl}
                  className="w-full aspect-square"
                />
              </div>
            </div>

            {/* SISI KANAN (Tinggi) */}
            <div className="md:col-span-1 h-full">
              <ProjectCard
                title={PROJECTS[3].title}
                category={PROJECTS[3].category}
                imageUrl={PROJECTS[3].imageUrl}
                className="w-full h-full min-h-[400px] md:min-h-full"
              />
            </div>
          </div>
        </AnimateIn>

        {/* TOMBOL FOOTER */}
        <AnimateIn
          direction="up"
          delay={0.2}
          scrollTriggered={true}
          className="w-full"
          disableScrollReverse={true}>
          <div
            data-animated
            className="mt-16 md:mt-24 flex justify-center w-full">
            <Button
              href="#semua-proyek"
              variant="outline"
              className="w-full sm:w-auto font-neue text-xs md:text-sm tracking-[0.2em] !border-white/20 !text-white hover:!bg-white hover:!text-black uppercase !px-12">
              Lihat Semua Proyek
            </Button>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
