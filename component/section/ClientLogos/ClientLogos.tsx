import AnimateIn from "@/component/ui/Animation/AnimatedIn";
const logosRow1 = [
  "THE GRAND AZURE",
  "LUMINA RESORT",
  "ECORETREAT",
  "ACME CORP",
  "AURORA CAFE",
  "VANGUARD HOTEL",
];

const logosRow2 = [...logosRow1].reverse();

export default function ClientLogos() {
  return (
    <section className="relative z-20 w-full py-10 flex flex-col gap-8 md:gap-12">
      <AnimateIn direction="up" stagger={0.15} scrollTriggered={true}>
        <div className="flex w-full">
          <div className="flex w-max animate-marquee-left items-center">
            {[...logosRow1, ...logosRow1].map((logo, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 px-8 md:px-16">
                <h3 className="text-3xl md:text-5xl font-extrabold text-gray-300 font-neue uppercase tracking-tight">
                  {logo}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full">
          <div className="flex w-max animate-marquee-right items-center">
            {[...logosRow2, ...logosRow2].map((logo, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 px-8 md:px-16">
                <h3 className="text-3xl md:text-5xl font-extrabold text-gray-300 font-neue uppercase tracking-tight">
                  {logo}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
