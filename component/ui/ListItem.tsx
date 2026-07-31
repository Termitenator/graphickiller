import AnimatedNumber from "@/component/ui/Animation/AnimatedNumber";

interface ListItemProps {
  number: string;
  title: string;
  description: string;
  isFirst?: boolean;
}

export default function ListItem({
  number,
  title,
  description,
  isFirst = false,
}: ListItemProps) {
  return (
    <article
      className={`group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start py-8 md:py-12 border-b border-white/10 overflow-hidden transition-colors duration-500 hover:border-white/30 ${
        isFirst ? "border-t" : ""
      }`}>
      <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-white/[0.03] transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <div className="md:col-span-2">
        <AnimatedNumber
          value={number}
          className="text-4xl md:text-5xl font-light text-[#8B8B8B] font-neue tracking-tighter transition-colors duration-500 group-hover:text-[#E5E5E5] tabular-nums"
        />
      </div>

      <div className="md:col-span-4">
        <h3 className="text-2xl md:text-3xl font-bold text-white font-neue tracking-tight transition-transform duration-500 group-hover:translate-x-1">
          {title}
        </h3>
      </div>

      <div className="md:col-span-6 flex items-start justify-between gap-6">
        <p className="text-base md:text-lg text-white/60 font-neue leading-relaxed transition-colors duration-500 group-hover:text-white/80">
          {description}
        </p>

        <span className="hidden md:flex items-center justify-center w-10 h-10 shrink-0 rounded-full border border-white/10 opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-white">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </article>
  );
}
