import AnimateIn from "@/component/ui/Animation/AnimatedIn";
import MapDisplay from "@/component/ui/MapDisplay";
import Button from "@/component/ui/Button"; // Import UI Button milikmu

export default function LocationSection() {
  return (
    <section className="relative z-20 w-full text-white py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* SISI KIRI: Teks Informasi */}
          <div className="flex flex-col">
            <AnimateIn
              direction="up"
              stagger={0.1}
              scrollTriggered={true}
              className="w-full"
              disableScrollReverse={true}>
              <div data-animated className="mb-12 md:mb-16">
                <h2 className="text-5xl md:text-7xl font-extrabold font-neue tracking-tighter leading-none">
                  Lokasi
                  <br />
                  <span className="text-white/40">Studio</span>
                </h2>
              </div>

              <div data-animated className="mb-10">
                <h3 className="text-xl md:text-2xl font-bold font-neue text-white mb-2">
                  GraphicKiller HQ
                </h3>
                <p className="text-base md:text-lg text-white/60 font-neue leading-relaxed max-w-sm">
                  Gg. XXVII, Sesetan,
                  <br />
                  Denpasar Selatan, Bali 80225
                </p>
              </div>

              <div data-animated className="mb-12">
                <h4 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white mb-3 font-neue">
                  Operasional
                </h4>
                <p className="text-base md:text-lg text-white/60 font-neue leading-relaxed">
                  Senin - Jumat: 09:00 - 18:00
                  <br />
                  Sabtu: By Appointment
                </p>
              </div>

              {/* MENGGUNAKAN KOMPONEN BUTTON */}
              <div data-animated>
                <Button
                  href="https://maps.google.com"
                  className="!px-0 !py-0 !h-auto !bg-transparent text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white border-b border-white !rounded-none pb-1 hover:text-white/60 hover:border-white/60 transition-colors font-neue inline-block w-fit">
                  Get Directions
                </Button>
              </div>
            </AnimateIn>
          </div>

          {/* SISI KANAN: Komponen Peta */}
          <AnimateIn
            direction="up"
            delay={0.2}
            scrollTriggered={true}
            className="w-full h-full"
            disableScrollReverse={true}>
            <div data-animated>
              <MapDisplay
                latitude={-8.6895082}
                longitude={115.2233331}
                address="Gg. XXVII, Sesetan, Denpasar Selatan, Kota Denpasar, Bali 80225"
                googleMapsUrl="https://www.google.com/maps/place/Gg.+XXVII,+Sesetan,+Denpasar+Selatan,+Kota+Denpasar,+Bali+80225/@-8.6895082,115.2207528,1000m/data=!3m2!1e3!4b1!4m6!3m5!1s0x2dd240e2a392eaf3:0xcb936ef34601aea!8m2!3d-8.6895082!4d115.2233331!16s%2Fg%2F11cs4204n5?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D"
              />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
