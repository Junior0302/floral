"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { useStore } from "@/lib/store/cart";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useStore((s) =>
    s.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  const favCount = useStore((s) => s.favorites.length);
  const setCartOpen = useStore((s) => s.setCartOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 lg:px-16",
          scrolled ? "glass-nav-scrolled" : "glass-nav"
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5" data-cursor="hover">
          <Image
            src="/logo.svg"
            alt="FLORA"
            width={28}
            height={28}
            className="drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]"
            priority
          />
          <span className="flora-title font-playfair text-base tracking-[0.22em] md:text-lg">
            FLORA
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor="hover"
              className={cn(
                "relative font-poppins text-xs tracking-[0.14em] uppercase transition-colors duration-300",
                pathname === link.href
                  ? "flora-title"
                  : "flora-body opacity-80 hover:opacity-100"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1.5 left-1/2 h-px w-4 -translate-x-1/2 bg-flora-coral" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            aria-label="Rechercher"
            data-cursor="hover"
            className="hidden text-white/90 transition-colors hover:text-white sm:block"
          >
            <Search size={18} strokeWidth={1.75} />
          </button>
          <button
            aria-label="Compte"
            data-cursor="hover"
            className="hidden text-white/90 transition-colors hover:text-white sm:block"
          >
            <User size={18} strokeWidth={1.75} />
          </button>
          <button
            aria-label="Favoris"
            data-cursor="hover"
            className="relative text-white/90 transition-colors hover:text-white"
          >
            <Heart size={18} strokeWidth={1.75} />
            {favCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-flora-coral text-[9px] text-white">
                {favCount}
              </span>
            )}
          </button>
          <button
            aria-label="Panier"
            data-cursor="hover"
            onClick={() => setCartOpen(true)}
            className="relative text-white/90 transition-colors hover:text-white"
          >
            <ShoppingBag size={18} strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-flora-coral text-[9px] text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            data-cursor="hover"
            className="text-white lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden">
          <nav className="flex h-full flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="hover"
                className={cn(
                  "font-poppins text-lg tracking-[0.15em] uppercase",
                  pathname === link.href ? "flora-title" : "flora-body"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

export default memo(Navbar);
