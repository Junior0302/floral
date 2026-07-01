"use client";

import { memo, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { LOADER_DURATION_MS, LOADER_FADE_OUT_MS } from "@/lib/constants/loader";

interface PageLoaderProps {
  active: boolean;
}

function PageLoader({ active }: PageLoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const logoWrap = logoWrapRef.current;
    const bar = barRef.current;
    const ring = ringRef.current;
    if (!root) return;

    if (active) {
      gsap.killTweensOf([root, logoWrap, bar, ring]);
      gsap.set(root, { display: "flex", opacity: 1, pointerEvents: "auto" });

      if (logoWrap) {
        gsap.fromTo(
          logoWrap,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }

      if (ring) {
        gsap.fromTo(
          ring,
          { opacity: 0 },
          { opacity: 1, duration: 0.45, ease: "power2.out" }
        );
        gsap.to(ring, {
          rotation: 360,
          duration: 1.6,
          ease: "none",
          repeat: -1,
        });
      }

      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: LOADER_DURATION_MS / 1000,
            ease: "power1.inOut",
          }
        );
      }
    } else {
      gsap.killTweensOf([logoWrap, bar, ring]);
      gsap.to(root, {
        opacity: 0,
        duration: LOADER_FADE_OUT_MS / 1000,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.set(root, { display: "none", pointerEvents: "none", opacity: 1 });
          if (bar) gsap.set(bar, { scaleX: 0 });
          if (ring) gsap.set(ring, { rotation: 0, scale: 1, opacity: 1 });
        },
      });
    }
  }, [active]);

  return (
    <div
      ref={rootRef}
      className="page-loader fixed inset-0 z-[180] hidden items-center justify-center"
      aria-hidden={!active}
      aria-live="polite"
      aria-busy={active}
    >
      <div className="flex flex-col items-center gap-6">
        <div ref={logoWrapRef} className="relative flex items-center justify-center">
          <div
            ref={ringRef}
            className="absolute h-[4.5rem] w-[4.5rem] rounded-full border border-flora-coral/50"
            aria-hidden
          />
          <Image src="/logo.svg" alt="" width={34} height={34} className="relative" priority />
        </div>
        <p className="flora-title text-xs tracking-[0.35em]">FLORA</p>
        <div className="h-px w-24 overflow-hidden rounded-full bg-white/10">
          <div ref={barRef} className="h-full origin-left bg-flora-coral" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
}

export default memo(PageLoader);
