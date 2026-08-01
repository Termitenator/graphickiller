import React, { InputHTMLAttributes } from "react";

interface UnderlineInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function UnderlineInput({
  label,
  className = "",
  ...props
}: UnderlineInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 block mb-4">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-transparent border-b border-white/20 text-white py-2 focus:outline-none focus:border-white transition-colors placeholder:text-white/40 ${className}`}
        {...props}
      />
    </div>
  );
}
