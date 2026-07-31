export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex flex-col justify-between h-full p-8 md:p-10 bg-[#050505] border border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-all duration-300">
      <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 font-medium">
        "{testimonial.quote}"
      </p>

      <div className="mt-auto">
        <h4 className="text-base font-bold text-white tracking-tight">
          {testimonial.name}
        </h4>
        <p className="text-sm text-white/40 font-medium mt-1">
          {testimonial.title}
        </p>
      </div>
    </div>
  );
}
