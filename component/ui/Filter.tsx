"use client";

interface PortfolioFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function PortfolioFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: PortfolioFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase font-neue">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`pb-1 transition-all duration-300 border-b ${
              isActive
                ? "text-white border-white"
                : "text-white/40 border-transparent hover:text-white"
            }`}>
            {category}
          </button>
        );
      })}
    </div>
  );
}
