import HeroSection from "@/component/section/Hero/Hero";
import ClientLogos from "@/component/section/ClientLogos/ClientLogos";
import ServiceSection from "@/component/section/Services/Services";
import SelectedWork from "@/component/section/SelectedWork/SelectedWork";
import ProcessSection from "@/component/section/Process/Process";
export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <HeroSection />
      <ClientLogos />
      <ServiceSection />
      <SelectedWork />
      <ProcessSection />
      <SelectedWork />
    </section>
  );
}
