import Button from "@/component/ui/Button";
import AnimateIn from "@/component/ui/Animation/AnimatedIn";
import AmbientBackground from "@/component/ui/AmbientBackground";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-6 text-center pt-[90px] z-10">
      <AmbientBackground />
      <AnimateIn direction="up" stagger={0.12}>
        <div
          data-animated="sub"
          className="flex items-center justify-center gap-2 md:gap-4 mb-8">
          <div className="w-6 md:w-12 h-[1px] bg-white/30"></div>
          <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/80 font-neue">
            Studio Desain Grafis & Produksi
          </span>
          <div className="w-6 md:w-12 h-[1px] bg-white/30"></div>
        </div>

        {/* CONTAINER UTAMA JUDUL */}
        <div className="relative mb-10 md:mb-12 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[200px] md:min-h-[350px]">
          <h1
            data-animated="killer-text"
            className="text-5xl md:text-7xl lg:text-[90px] font-extrabold tracking-tight md:tracking-tighter leading-[1.1] md:leading-[1.05] text-white font-neue z-20 relative">
            Desain yang Membunuh
          </h1>

          {/* 3. TEKS ABU-ABU (Kebiasaan Biasa-Biasa Saja) - Outline Glass Effect */}
          <div
            data-animated="victim-text"
            className="
    text-5xl md:text-7xl lg:text-[90px] font-extrabold tracking-tight md:tracking-tighter leading-[1.1] md:leading-[1.05] font-neue mt-1 md:mt-2
    text-transparent bg-clip-text 
    bg-white/0 
    [-webkit-text-stroke:1px_rgba(255,255,255,0.55)]
    drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]
  ">
            Kebiasaan Biasa-Biasa Saja
          </div>
        </div>

        {/* 4. BUTTONS & PARAGRAF */}
        <div
          data-animated="footer-hero"
          className="flex flex-col items-center gap-8 md:gap-10 w-full px-4 md:px-0">
          {/* Paragraf: Warna diterangkan (80%), leading ditambah, padding ditambahkan */}
          <p className="max-w-2xl text-sm md:text-lg text-white/80 font-neue leading-relaxed md:leading-relaxed text-center px-2">
            Dari logo, brosur, hingga signage dan interior hotel — kami
            mengerjakan identitas visual dari kertas sampai bangunan.
          </p>

          {/* Tombol: Kontras ditingkatkan */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            {/* Tombol Primary: Diubah jadi Putih agar pop-up di layar gelap */}
            <Button
              href="#portofolio"
              className="w-full sm:w-auto font-neue !px-10 !bg-white !text-black font-semibold py-3 sm:py-2">
              LIHAT PORTOFOLIO
            </Button>

            <Button
              href="#kontak"
              variant="outline"
              className="w-full sm:w-auto font-neue !border-white/40 !text-white hover:!bg-white hover:!text-black py-3 sm:py-2">
              HUBUNGI KAMI <span className="ml-3 font-normal">→</span>
            </Button>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
