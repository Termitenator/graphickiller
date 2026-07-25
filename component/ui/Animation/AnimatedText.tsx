import { HTMLAttributes } from "react";

interface AnimatedTextProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
  heightClass?: string;
  textClass?: string;
}

export default function AnimatedText({
  children,
  heightClass = "h-[20px]",
  textClass = "",
  ...props
}: AnimatedTextProps) {
  return (
    <div
      className={`group relative overflow-hidden block ${heightClass}`}
      {...props}>
      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
        <span
          className={`${heightClass} flex items-center leading-none ${textClass}`}>
          {children}
        </span>
        <span
          className={`${heightClass} flex items-center leading-none ${textClass}`}>
          {children}
        </span>
      </div>
    </div>
  );
}
