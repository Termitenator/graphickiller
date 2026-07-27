import HeroSection from "@/component/section/Hero/Hero";
import ClientLogos from "@/component/section/ClientLogos/ClientLogos";
export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <HeroSection />
      <ClientLogos />
    </section>
  );
}
