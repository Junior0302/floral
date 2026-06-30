"use client";

import { memo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/cn";
import { useStore } from "@/lib/store/cart";
import type { Product } from "@/lib/data/products";

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  product: Product;
  index?: number;
}

function ProductCard({ product, index = 0 }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const addBtnRef = useRef<HTMLButtonElement>(null);
  const addToCart = useStore((s) => s.addToCart);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const favorited = useStore((s) => s.favorites.includes(product.id));
  const inCart = useStore((s) => s.cart.some((c) => c.id === product.id));

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: Math.min(index * 0.05, 0.3),
        ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 92%" },
      }
    );
  }, [index]);

  const handleAdd = useCallback(() => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    if (addBtnRef.current) {
      gsap.fromTo(addBtnRef.current, { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 });
    }
  }, [addToCart, product]);

  return (
    <div
      ref={cardRef}
      data-cursor="hover"
      className="glass-card glass-card-hover group overflow-hidden rounded-[24px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <div ref={imageRef} className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <button
          onClick={() => toggleFavorite(product.id)}
          data-cursor="hover"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md transition-colors hover:bg-black/55"
          aria-label={favorited ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart
            size={16}
            className={cn(
              "transition-colors duration-300",
              favorited ? "fill-flora-coral text-flora-coral" : "text-white/80"
            )}
          />
        </button>
        {inCart && (
          <span className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-flora-coral/90 px-2.5 py-1 font-poppins text-[9px] tracking-wider uppercase text-white">
            <Check size={10} /> Dans le panier
          </span>
        )}
        <span className="flora-body absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1 font-poppins text-[10px] tracking-widest uppercase backdrop-blur-md">
          {product.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="flora-title font-playfair text-xl">{product.name}</h3>
        <p className="flora-muted mt-2 line-clamp-2 font-poppins text-xs leading-relaxed">
          {product.description}
        </p>
        <p className="flora-body mt-3 font-poppins text-base text-flora-coral">
          {formatPrice(product.price)}
        </p>
        <div className="mt-5 flex gap-2">
          <button
            ref={addBtnRef}
            onClick={handleAdd}
            data-cursor="hover"
            className="flora-btn-primary flex flex-1 items-center justify-center gap-2 py-3.5 font-poppins text-[10px] tracking-[0.12em] uppercase"
          >
            <ShoppingBag size={14} />
            Ajouter
          </button>
          {inCart && (
            <button
              onClick={() => setCartOpen(true)}
              data-cursor="hover"
              className="flora-btn-ghost px-4 py-3.5 font-poppins text-[10px] tracking-[0.12em] uppercase"
            >
              Voir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
