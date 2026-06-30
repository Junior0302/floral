"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    const tl = gsap.timeline({ onComplete });

    if (textRef.current) {
      tl.to(textRef.current, { opacity: 0, y: -20, duration: 0.5, ease: "power3.in" });
    }
    if (overlayRef.current) {
      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-flora-black"
    >
      <p
        ref={textRef}
        className="font-playfair text-4xl tracking-[0.3em] text-white md:text-5xl"
      >
        FLORA
      </p>
      <div className="mt-8 h-px w-48 overflow-hidden bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-flora-rose via-flora-coral to-flora-gold transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="mt-4 font-poppins text-xs tracking-widest text-white/40">
        {Math.min(Math.round(progress), 100)}%
      </p>
    </div>
  );
}
