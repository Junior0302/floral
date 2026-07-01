"use client";

import { memo, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { LOADER_DURATION_MS } from "@/lib/constants/loader";

interface PageLoaderProps {
  active: boolean;
}

const PARTICLES = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  left: 20 + i * 12,
  delay: i * 0.08,
}));

function PageLoader({ active }: PageLoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glowRef.current) return;
    gsap.to(glowRef.current, {
      opacity: 0.55,
      scale: 1.12,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const dots = container.querySelectorAll(".loader-particle");
    dots.forEach((dot, i) => {
      gsap.to(dot, {
        y: -12 - i * 2,
        opacity: 0.7,
        duration: 1.2 + i * 0.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: PARTICLES[i]?.delay ?? 0,
      });
    });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const bar = barRef.current;
    if (!root) return;

    if (active) {
      gsap.set(root, { display: "flex", opacity: 1, pointerEvents: "auto" });
      if (bar) {
        gsap.killTweensOf(bar);
        gsap.fromTo(bar, { scaleX: 0 }, {
          scaleX: 1,
          duration: LOADER_DURATION_MS / 1000,
          ease: "power1.inOut",
        });
      }
    } else {
      gsap.to(root, {
        opacity: 0,
        duration: 0.32,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(root, { display: "none", pointerEvents: "none" });
          if (bar) gsap.set(bar, { scaleX: 0 });
        },
      });
    }
  }, [active]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[180] hidden items-center justify-center bg-black/72"
      aria-hidden={!active}
      aria-live="polite"
    >
      <div ref={particlesRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="loader-particle absolute bottom-[45%] h-1 w-1 rounded-full bg-flora-coral/50"
            style={{ left: `${p.left}%`, opacity: 0.3 }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <div
            ref={glowRef}
            className="absolute inset-0 scale-100 rounded-full bg-flora-coral/15 blur-xl"
            aria-hidden
          />
          <Image src="/logo.svg" alt="" width={40} height={40} className="relative" priority />
        </div>
        <p className="flora-title font-playfair text-sm tracking-[0.35em]">FLORA</p>
        <div className="h-px w-32 overflow-hidden bg-white/10">
          <div ref={barRef} className="h-full origin-left bg-flora-coral/80" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
}

export default memo(PageLoader);
