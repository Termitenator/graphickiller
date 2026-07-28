import HeroSection from "@/component/section/Hero/Hero";
import ClientLogos from "@/component/section/ClientLogos/ClientLogos";
import ServiceSection from "@/component/section/Services/Services";
export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <HeroSection />
      <ClientLogos />
      <ServiceSection />
    </section>
  );
}
