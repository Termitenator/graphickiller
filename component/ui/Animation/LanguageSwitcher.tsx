"use client";

import { HTMLAttributes, useState } from "react";

interface LanguageSwitcherProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function LanguageSwitcher({
  className = "",
  ...props
}: LanguageSwitcherProps) {
  const [lang, setLang] = useState<"EN" | "ID">("EN");
  const [rotation, setRotation] = useState<number>(0);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "EN" ? "ID" : "EN"));
    setRotation((prev) => prev + 180);
  };

  return (
    <div
      onClick={toggleLanguage}
      className={`group flex items-center gap-2 text-[13px] font-bold tracking-[0.1em] text-white/70 cursor-pointer hover:text-white transition-colors select-none ${className}`}
      {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{ transform: `rotateY(${rotation}deg)` }}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
      <span className="w-5 text-center inline-block">{lang}</span>
    </div>
  );
}
