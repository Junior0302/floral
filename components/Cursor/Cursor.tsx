"use client";

import { memo, useEffect, useRef } from "react";
import { gsap } from "gsap";

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cursor = cursorRef.current;
    const halo = haloRef.current;
    if (!cursor || !halo) return;

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let rafId: number;

    const setCursor = gsap.quickSetter(cursor, "css");
    const setHalo = gsap.quickSetter(halo, "css");

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const animate = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      const t = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      setCursor({ transform: t });
      setHalo({ transform: t });
      rafId = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("a, button, [data-cursor='hover']")) return;
      gsap.to(cursor, { scale: 1.8, duration: 0.25 });
      gsap.to(halo, { scale: 1.6, opacity: 0.7, duration: 0.25 });
    };

    const onOut = (e: MouseEvent) => {
      const from = e.target as HTMLElement;
      const to = e.relatedTarget as HTMLElement | null;
      if (from.closest("a, button, [data-cursor='hover']") && to?.closest("a, button, [data-cursor='hover']")) return;
      gsap.to(cursor, { scale: 1, duration: 0.25 });
      gsap.to(halo, { scale: 1, opacity: 0.45, duration: 0.25 });
    };

    const onMagneticMove = (e: MouseEvent) => {
      const el = (e.currentTarget as HTMLElement);
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      gsap.to(el, {
        x: (e.clientX - cx) * 0.25,
        y: (e.clientY - cy) * 0.25,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMagneticLeave = (e: MouseEvent) => {
      gsap.to(e.currentTarget as HTMLElement, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        clearProps: "transform",
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafId = requestAnimationFrame(animate);

    const magneticEls = document.querySelectorAll("[data-magnetic]");
    magneticEls.forEach((el) => {
      el.addEventListener("mousemove", onMagneticMove as EventListener);
      el.addEventListener("mouseleave", onMagneticLeave as EventListener);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
      magneticEls.forEach((el) => {
        el.removeEventListener("mousemove", onMagneticMove as EventListener);
        el.removeEventListener("mouseleave", onMagneticLeave as EventListener);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={haloRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden h-10 w-10 rounded-full md:block"
        style={{
          background: "radial-gradient(circle, rgba(255,200,180,0.35) 0%, transparent 70%)",
          opacity: 0.45,
        }}
        aria-hidden
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-white md:block"
        style={{ boxShadow: "0 0 8px rgba(255,255,255,0.9)" }}
        aria-hidden
      />
    </>
  );
}

export default memo(Cursor);
