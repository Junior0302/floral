"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import AnimatedTitle from "@/components/AnimatedTitle";
import HomeFooter from "@/components/HomeFooter";

export default function Hero() {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.4
      );
    }

    if (ornamentRef.current) {
      tl.fromTo(
        ornamentRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: "power3.inOut" },
        0.3
      );
    }

    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" },
        0.55
      );
    }
  }, []);

  return (
    <section className="relative flex h-screen flex-col overflow-hidden">
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        <div className="mb-5">
          <Image src="/logo.svg" alt="" width={32} height={32} aria-hidden priority />
        </div>

        <AnimatedTitle
          text="FLORA"
          className="flora-title text-6xl tracking-[0.06em] md:text-8xl lg:text-9xl"
          delay={0.15}
        />

        <div ref={ornamentRef} className="my-5 flex items-center gap-4 opacity-0">
          <span className="h-px w-14 bg-white/35" />
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
            <circle cx="6" cy="6" r="2" fill="white" opacity="0.7" />
          </svg>
          <span className="h-px w-14 bg-white/35" />
        </div>

        <p
          ref={subtitleRef}
          className="flora-accent flora-body max-w-md text-lg tracking-wide md:text-xl"
        >
          La beauté naturelle, livrée avec soin.
        </p>

        <div
          ref={buttonsRef}
          className="mt-10 flex w-full max-w-md flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4"
        >
          <Link
            href="/boutique"
            data-cursor="hover"
            className="flora-btn-primary inline-flex w-full items-center justify-center px-8 py-3.5 text-center font-poppins text-xs tracking-[0.12em] uppercase sm:w-auto"
          >
            Découvrir la collection
          </Link>
          <Link
            href="/boutique"
            data-cursor="hover"
            className="flora-btn-ghost inline-flex w-full items-center justify-center px-8 py-3.5 text-center font-poppins text-xs tracking-[0.12em] uppercase sm:w-auto"
          >
            Commander maintenant
          </Link>
        </div>
      </div>

      <HomeFooter />
    </section>
  );
}
