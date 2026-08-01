import React, { InputHTMLAttributes } from "react";

interface SolidInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function SolidInput({
  className = "",
  ...props
}: SolidInputProps) {
  return (
    <input
      className={`w-full bg-white/[0.03] border border-white/10 h-14 md:h-16 px-6 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all font-medium ${className}`}
      {...props}
    />
  );
}
