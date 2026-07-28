import ListItem from "@/component/ui/ListItem";
import AnimateIn from "@/component/ui/Animation/AnimatedIn";
import ScrollRevealList from "@/component/ui/Animation/ScrollRevealList";

const SERVICES_DATA = [
  {
    id: "01",
    title: "Brand Identity",
    description:
      "Membangun fondasi visual yang kuat dan berkarakter untuk bisnis Anda.",
  },
  {
    id: "02",
    title: "Corporate Print",
    description:
      "Solusi cetak berkualitas tinggi untuk kebutuhan promosi dan operasional.",
  },
  {
    id: "03",
    title: "Signage & Neon",
    description:
      "Identitas fisik yang mencolok dengan eksekusi material yang presisi.",
  },
  {
    id: "04",
    title: "Interior Branding",
    description: "Transformasi ruang menjadi pengalaman brand yang mendalam.",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative z-20 w-full text-white py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <AnimateIn
          direction="up"
          stagger={0.1}
          scrollTriggered={true}
          className="w-full"
          disableScrollReverse={true}>
          <div
            data-animated
            className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 items-end">
            <div className="md:col-span-6">
              <h2 className="text-5xl md:text-7xl font-extrabold font-neue tracking-tighter leading-none">
                Layanan
                <br />
                <span className="text-white/40">Keahlian Kami</span>
              </h2>
            </div>

            <div className="md:col-span-6 flex md:justify-end">
              <p className="max-w-md text-white/60 text-base md:text-lg font-neue leading-relaxed">
                Kami menggabungkan strategi visual dengan eksekusi teknis untuk
                memberikan solusi desain yang holistik.
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* LIST SECTION — reveal 1/1 saat card masuk viewport */}
        <ScrollRevealList className="w-full">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              data-reveal-item
              className="will-change-transform">
              <ListItem
                number={service.id}
                title={service.title}
                description={service.description}
                isFirst={index === 0}
              />
            </div>
          ))}
        </ScrollRevealList>
      </div>
    </section>
  );
}
