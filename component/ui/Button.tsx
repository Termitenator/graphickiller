import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  href?: string;
  variant?: "solid" | "outline";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "solid",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "group inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold tracking-[0.15em] transition-all duration-300";

  const variants = {
    solid: "bg-black text-white ",
    outline:
      "border-[1.5px] border-black text-black hover:bg-black hover:text-white",
  };

  const combinedStyle = `${baseStyle} ${variants[variant]} ${className}`;

  const animatedContent = (
    <div className="relative overflow-hidden block h-[14px]">
      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
        <span className="h-[14px] flex items-center justify-center leading-none">
          {children}
        </span>

        <span className="h-[14px] flex items-center justify-center leading-none">
          {children}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={combinedStyle}>
        {animatedContent}
      </Link>
    );
  }

  if (href) {
    return (
      <Link href={href} className={combinedStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyle} {...props}>
      {animatedContent}
    </button>
  );
}
