import AnimateIn from "@/component/ui/Animation/AnimatedIn"; // Sesuaikan path

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Latar belakang diubah menjadi hitam gelap, teks utama menjadi putih, dan border transparan
    <footer className="w-full bg-[#050505] text-white pt-16 pb-8 px-6 border-t border-white/10 z-20 relative">
      <div className="max-w-7xl mx-auto">
        <AnimateIn
          direction="up"
          stagger={0.1}
          scrollTriggered={true}
          className="w-full"
          disableScrollReverse={true}>
          {/* GRID ATAS: 4 Kolom */}
          <div
            data-animated
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            {/* Kolom 1: Logo & Deskripsi */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                {/* Ikon Logo (Warna disesuaikan jadi putih) */}
                <div className="w-6 h-6 border-[2px] border-white rounded-sm flex items-center justify-center">
                  <div className="w-3 h-[2px] bg-white rounded-full" />
                </div>
                <span className="font-extrabold text-xl tracking-tight">
                  GraphicKiller
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed max-w-[280px]">
                Studio desain grafis & produksi yang mendefinisikan standar
                visual dengan presisi arsitektural.
              </p>
            </div>

            {/* Kolom 2: Layanan */}
            <div className="flex flex-col">
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-6">
                Layanan
              </h4>
              <ul className="flex flex-col gap-4 text-sm font-medium">
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors">
                    Brand Identity
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors">
                    Corporate Print
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors">
                    Signage & Neon
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors">
                    Interior Branding
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Kontak */}
            <div className="flex flex-col">
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-6">
                Kontak
              </h4>
              <ul className="flex flex-col gap-4 text-sm font-medium">
                <li>
                  <a
                    href="mailto:hello@graphickiller.id"
                    className="text-white/70 hover:text-white transition-colors">
                    hello@graphickiller.id
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/6281123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors">
                    +62 811 2345 6789
                  </a>
                </li>
                <li className="text-white/50 mt-2 leading-relaxed max-w-[200px]">
                  Jl. Kreatif No. 8, <br />
                  Jakarta Selatan 12345
                </li>
              </ul>
            </div>

            {/* Kolom 4: Social */}
            <div className="flex flex-col">
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-6">
                Social
              </h4>
              <ul className="flex flex-col gap-4 text-sm font-medium">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors">
                    Behance
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </AnimateIn>

        {/* GARIS PEMISAH */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* BAGIAN BAWAH (Copyright & Legal) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/40">
          <p>© {currentYear} GraphicKiller Studio.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
