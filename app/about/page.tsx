"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "@/components/AnimatedTitle";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: "2018", title: "Naissance de FLORA", desc: "Un atelier parisien dédié à l'art floral contemporain." },
  { year: "2020", title: "Première collection", desc: "Lancement de la collection Signature, saluée par la presse." },
  { year: "2022", title: "Expansion", desc: "Ouverture de notre second atelier et partenariats hôteliers." },
  { year: "2024", title: "Expérience digitale", desc: "FLORA devient une expérience immersive en ligne." },
];

const values = [
  { title: "Passion", desc: "Chaque fleur est sélectionnée avec amour et expertise." },
  { title: "Excellence", desc: "Un savoir-faire artisanal au service de la beauté." },
  { title: "Durabilité", desc: "Des fleurs locales et des pratiques responsables." },
];

export default function AboutPage() {
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.03 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: imageRef.current, start: "top 85%" },
        }
      );
    }
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 85%" },
        }
      );
    }
  }, []);

  return (
    <div className="page-content pt-28">
      <section className="section-spacious px-6 md:px-12 lg:px-16">
        <AnimatedTitle
          text="À propos"
          as="h1"
          className="flora-title text-6xl md:text-7xl lg:text-[5.5rem]"
        />
      </section>

      <section className="px-6 pb-8 md:px-12 lg:px-16">
        <div
          ref={imageRef}
          className="float-image relative mx-auto aspect-[21/9] max-w-5xl"
        >
          <Image
            src="/images/bg1.jpg"
            alt="Univers floral FLORA"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div ref={quoteRef} className="mx-auto mt-28 max-w-xl text-center">
          <p className="flora-title text-2xl leading-relaxed md:text-4xl">
            Nous croyons que chaque bouquet raconte une histoire.
          </p>
          <p className="flora-body mt-8 font-poppins text-base leading-relaxed md:text-lg">
            FLORA est née d&apos;une passion pour la nature et le design. Notre atelier
            parisien transforme les fleurs les plus belles en compositions
            d&apos;exception, pensées pour émouvoir et sublimer chaque instant.
          </p>
        </div>
      </section>

      <section className="section-spacious px-6 md:px-12 lg:px-16">
        <h2 className="flora-section-title flora-title mb-20 text-center md:text-4xl">
          Notre histoire
        </h2>
        <div className="mx-auto max-w-2xl">
          {timeline.map((item, i) => (
            <TimelineItem key={item.year} item={item} index={i} />
          ))}
        </div>
      </section>

      <section className="section-spacious px-6 md:px-12 lg:px-16">
        <h2 className="flora-section-title flora-title mb-16 text-center md:text-4xl">
          Nos valeurs
        </h2>
        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-3">
          {values.map((v, i) => (
            <ValueCard key={v.title} value={v} index={i} />
          ))}
        </div>
      </section>

      <section className="section-spacious px-6 pb-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="flora-section-title flora-title md:text-4xl">
            Notre atelier
          </h2>
          <p className="flora-body mt-8 font-poppins text-base leading-relaxed md:text-lg">
            Situé au cœur de Paris, notre atelier est un espace où la créativité
            rencontre la tradition florale. Nos artisans composent chaque bouquet à la
            main, avec une attention méticuleuse portée à chaque détail.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timeline)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
      }
    );
  }, [index]);

  return (
    <div ref={ref} className="relative flex gap-8 pb-16 last:pb-0">
      <div className="flex flex-col items-center">
        <div className="h-2 w-2 rounded-full bg-flora-coral shadow-[0_0_12px_rgba(224,122,95,0.5)]" />
        <div className="w-px flex-1 bg-white/10" />
      </div>
      <div className="pb-2">
        <span className="font-poppins text-[10px] tracking-[0.2em] text-flora-coral">
          {item.year}
        </span>
        <h3 className="flora-title mt-2 text-xl md:text-2xl">{item.title}</h3>
        <p className="flora-body mt-3 font-poppins text-base">{item.desc}</p>
      </div>
    </div>
  );
}

function ValueCard({
  value,
  index,
}: {
  value: (typeof values)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
      }
    );
  }, [index]);

  return (
    <div ref={ref} className="text-center">
      <h3 className="flora-title text-xl md:text-2xl">{value.title}</h3>
      <p className="flora-body mt-4 font-poppins text-base leading-relaxed">
        {value.desc}
      </p>
    </div>
  );
}
