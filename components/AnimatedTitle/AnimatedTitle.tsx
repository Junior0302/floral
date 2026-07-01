"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/utils/cn";

interface AnimatedTitleProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}

export default function AnimatedTitle({
  text,
  className,
  as: Tag = "h1",
  delay = 0,
}: AnimatedTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chars = text.split("");
    ref.current.innerHTML = chars
      .map((c) => `<span class="inline-block overflow-hidden"><span class="char inline-block">${c === " " ? "&nbsp;" : c}</span></span>`)
      .join("");

    gsap.fromTo(
      ref.current.querySelectorAll(".char"),
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        stagger: 0.04,
        ease: "power4.out",
        delay,
      }
    );
  }, [text, delay]);

  return (
    <Tag
      ref={ref}
      className={cn("font-gentle", className)}
    />
  );
}
