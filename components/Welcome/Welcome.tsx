"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useAudioStore } from "@/lib/store/audio";

interface WelcomeProps {
  onComplete: () => void;
}

export default function Welcome({ onComplete }: WelcomeProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => setReady(true);
    video.addEventListener("canplaythrough", onReady, { once: true });
    video.play().catch(() => {});

    const fallback = setTimeout(() => setReady(true), 2000);
    return () => {
      clearTimeout(fallback);
      video.removeEventListener("canplaythrough", onReady);
    };
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const playMusic = useAudioStore((s) => s.playMusic);

  const handleEnter = () => {
    if (exiting) return;
    setExiting(true);
    playMusic();

    const tl = gsap.timeline({ onComplete });
    if (contentRef.current) {
      tl.to(contentRef.current, { opacity: 0, y: -12, duration: 0.32, ease: "power2.in" });
    }
    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 0, duration: 0.42, ease: "power2.inOut" }, 0.08);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="welcome-screen fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="welcome-video absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src="/floral.mp4" type="video/mp4" />
      </video>
      <div className="welcome-overlay absolute inset-0" aria-hidden />

      <div
        ref={contentRef}
        className="welcome-card relative z-10 mx-6 flex max-w-md flex-col items-center px-10 py-14 text-center md:px-14 md:py-16"
      >
        <Image src="/logo.svg" alt="" width={52} height={52} className="mb-7" priority />
        <h1 className="flora-title text-5xl tracking-[0.08em] md:text-6xl">FLORA</h1>
        <p className="flora-accent flora-muted mt-4 text-base tracking-[0.2em] uppercase md:text-lg">
          Luxury Floral Experience
        </p>

        <div className="my-8 flex items-center gap-4">
          <span className="h-px w-12 bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-flora-coral" />
          <span className="h-px w-12 bg-white/20" />
        </div>

        <p className="flora-body font-poppins text-sm leading-relaxed md:text-base">
          Entrez dans un univers floral vivant, élégant et cinématographique.
        </p>

        <button
          type="button"
          onClick={handleEnter}
          disabled={!ready || exiting}
          data-cursor="hover"
          className="flora-btn-primary mt-10 min-w-[220px] px-12 py-4 font-poppins text-sm tracking-[0.25em] uppercase disabled:cursor-wait disabled:opacity-60"
        >
          {ready ? (exiting ? "Bienvenue..." : "Entrer") : "Chargement..."}
        </button>
      </div>
    </div>
  );
}
