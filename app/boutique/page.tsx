"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import AnimatedTitle from "@/components/AnimatedTitle";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Image from "next/image";
import { pageHeroImages } from "@/lib/data/site";
import {
  products,
  occasions,
  colors,
  collections,
  priceRanges,
} from "@/lib/data/products";

gsap.registerPlugin(ScrollTrigger);

export default function BoutiquePage() {
  const [search, setSearch] = useState("");
  const [occasion, setOccasion] = useState("Tous");
  const [color, setColor] = useState("Tous");
  const [collection, setCollection] = useState("Tous");
  const [priceRange, setPriceRange] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const range = priceRanges[priceRange];
    return products.filter((p) => {
      const matchSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchOccasion = occasion === "Tous" || p.occasion === occasion;
      const matchColor = color === "Tous" || p.color === color;
      const matchCollection =
        collection === "Tous" || p.collection === collection;
      const matchPrice = p.price >= range.min && p.price <= range.max;
      return matchSearch && matchOccasion && matchColor && matchCollection && matchPrice;
    });
  }, [search, occasion, color, collection, priceRange]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.75, ease: "power3.out", delay: 0.1 }
      );
    }
    if (heroImageRef.current) {
      gsap.fromTo(
        heroImageRef.current,
        { opacity: 0, scale: 1.03 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: heroImageRef.current, start: "top 85%" },
        }
      );
    }
  }, []);

  return (
    <div className="page-content pt-28">
      <section ref={headerRef} className="section-spacious px-6 md:px-12 lg:px-16">
        <AnimatedTitle
          text="Boutique"
          as="h1"
          className="flora-title text-6xl font-light md:text-7xl lg:text-[5.5rem]"
        />
        <p className="flora-body mt-6 max-w-lg font-poppins text-base leading-relaxed md:text-lg">
          Découvrez nos créations florales, composées avec passion et livrées avec soin.
        </p>
      </section>

      <section className="px-6 pb-8 md:px-12 lg:px-16">
        <div
          ref={heroImageRef}
          className="float-image relative mx-auto aspect-[21/9] max-w-5xl overflow-hidden"
        >
          <Image
            src={pageHeroImages["/boutique"]}
            alt="Collection florale FLORA"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1024px"
            priority
          />
        </div>
      </section>

      <section className="section-spacious px-6 md:px-12 lg:px-16 pt-0">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="relative max-w-sm">
            <Search
              size={15}
              className="absolute top-1/2 left-0 -translate-y-1/2 text-white/40"
            />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-on-video w-full py-3 pl-7 font-poppins text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <FilterSelect label="Occasion" value={occasion} options={occasions} onChange={setOccasion} />
            <FilterSelect
              label="Prix"
              value={priceRanges[priceRange].label}
              options={priceRanges.map((r) => r.label)}
              onChange={(v) => setPriceRange(priceRanges.findIndex((r) => r.label === v))}
            />
            <FilterSelect label="Couleur" value={color} options={colors} onChange={setColor} />
            <FilterSelect label="Collection" value={collection} options={collections} onChange={setCollection} />
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 md:px-12 lg:px-16">
        {filtered.length === 0 ? (
          <p className="flora-muted py-24 text-center font-poppins text-base">
            Aucun produit ne correspond à votre recherche.
          </p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <label className="sr-only">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-cursor="hover"
        className="select-glass appearance-none rounded-full px-5 py-2.5 pr-8 font-poppins text-[11px] tracking-wide outline-none transition-all hover:border-white/25"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === value ? `${label}: ${opt}` : opt}
          </option>
        ))}
      </select>
    </div>
  );
}
