"use client";

import React from "react";

interface BudgetSelectorProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  label?: string;
}

export default function BudgetSelector({
  options,
  selected,
  onSelect,
  label,
}: BudgetSelectorProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 block mb-4">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-3">
        {options.map((budget) => (
          <button
            key={budget}
            type="button"
            onClick={() => onSelect(budget)}
            className={`border text-xs md:text-sm px-4 md:px-5 py-2 transition-all duration-300 ${
              selected === budget
                ? "border-white bg-white text-black"
                : "border-white/20 text-white/70 hover:border-white hover:text-white"
            }`}>
            {budget}
          </button>
        ))}
      </div>
    </div>
  );
}
