"use client";

import { memo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/utils/cn";

interface CursorProps {
  variant?: "default" | "welcome";
}

function Cursor({ variant = "default" }: CursorProps) {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const isWelcome = variant === "welcome";

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.body.classList.add("flora-custom-cursor");

    const ring = ringRef.current;
    const dot = dotRef.current;
    const halo = haloRef.current;
    if (!ring || !dot || !halo) return;

    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let rafId: number;
    let hovering = false;

    const setRing = gsap.quickSetter(ring, "css");
    const setDot = gsap.quickSetter(dot, "css");
    const setHalo = gsap.quickSetter(halo, "css");

    const lerp = isWelcome ? 0.11 : 0.1;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        'a, button, [data-cursor="hover"], input, textarea, select, label'
      );
      if (el && !hovering) {
        hovering = true;
        gsap.to(ring, {
          scale: 1.18,
          borderColor: "rgba(224, 122, 95, 0.7)",
          duration: 0.55,
          ease: "sine.out",
        });
        gsap.to(dot, { scale: 0.6, opacity: 0.85, duration: 0.45, ease: "sine.out" });
        gsap.to(halo, { opacity: 0.65, scale: 1.15, duration: 0.55, ease: "sine.out" });
      }
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (related?.closest('a, button, [data-cursor="hover"], input, textarea, select, label')) return;
      if (hovering) {
        hovering = false;
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(255, 255, 255, 0.35)",
          duration: 0.55,
          ease: "sine.out",
        });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.45, ease: "sine.out" });
        gsap.to(halo, { opacity: isWelcome ? 0.4 : 0.28, scale: 1, duration: 0.55, ease: "sine.out" });
      }
    };

    const animate = () => {
      pos.x += (target.x - pos.x) * lerp;
      pos.y += (target.y - pos.y) * lerp;
      const t = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      setRing({ transform: t });
      setDot({ transform: t });
      setHalo({ transform: t });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("flora-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, [isWelcome]);

  return (
    <>
      <div
        ref={haloRef}
        className={cn(
          "pointer-events-none fixed top-0 left-0 hidden rounded-full md:block",
          isWelcome ? "z-[10001] h-20 w-20" : "z-[9998] h-14 w-14"
        )}
        style={{
          background:
            "radial-gradient(circle, rgba(224,122,95,0.18) 0%, rgba(255,180,160,0.08) 50%, transparent 75%)",
          opacity: isWelcome ? 0.4 : 0.28,
        }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className={cn(
          "pointer-events-none fixed top-0 left-0 hidden rounded-full border md:block",
          isWelcome ? "z-[10002] h-9 w-9 border-white/40" : "z-[9999] h-7 w-7 border-white/35"
        )}
        style={{ boxShadow: "0 0 12px rgba(255,255,255,0.08)" }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className={cn(
          "pointer-events-none fixed top-0 left-0 hidden rounded-full md:block",
          isWelcome ? "z-[10003] h-1.5 w-1.5 bg-flora-coral/90" : "z-[10000] h-1 w-1 bg-white/85"
        )}
        style={{ boxShadow: "0 0 6px rgba(255,255,255,0.45)" }}
        aria-hidden
      />
    </>
  );
}

export default memo(Cursor);
