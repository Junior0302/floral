"use client";

import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  href?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      data-magnetic
      data-cursor="hover"
      className={cn(
        "relative overflow-hidden px-8 py-3.5 font-poppins text-xs tracking-[0.2em] uppercase transition-all duration-500",
        variant === "primary" &&
          "bg-flora-coral text-white hover:bg-flora-rose hover:shadow-lg hover:shadow-flora-coral/25",
        variant === "ghost" &&
          "border border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
