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
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 md:py-5 lg:px-14",
          mobileOpen
            ? "nav-solid"
            : scrolled
              ? "glass-nav-scrolled"
              : "glass-nav"
        )}
      >
        <Link href="/" className="group flex items-center gap-3" data-cursor="hover">
          <Image
            src="/logo.svg"
            alt="FLORA"
            width={32}
            height={32}
            priority
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <span className="flora-title font-playfair text-lg tracking-[0.2em] md:text-xl">
            FLORA
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor="hover"
              className={cn(
                "flora-nav-link font-poppins text-sm font-medium tracking-wide md:text-[15px]",
                pathname === link.href && "flora-nav-link-active"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <button
            aria-label="Rechercher"
            data-cursor="hover"
            className="nav-action-btn hidden sm:flex"
          >
            <Search size={20} strokeWidth={1.75} />
          </button>
          <button
            aria-label="Compte"
            data-cursor="hover"
            className="nav-action-btn hidden sm:flex"
          >
            <User size={20} strokeWidth={1.75} />
          </button>
          <button
            aria-label="Favoris"
            data-cursor="hover"
            className="nav-action-btn relative"
          >
            <Heart size={20} strokeWidth={1.75} />
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-flora-coral text-[10px] font-semibold text-white">
                {favCount}
              </span>
            )}
          </button>
          <button
            aria-label="Panier"
            data-cursor="hover"
            onClick={() => setCartOpen(true)}
            className="nav-action-btn relative"
          >
            <ShoppingBag size={20} strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-flora-coral text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            data-cursor="hover"
            className="nav-action-btn lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-nav-panel fixed inset-0 z-40 lg:hidden">
          <nav className="flex h-full flex-col px-8 pt-28 pb-10">
            <p className="flora-muted mb-8 font-poppins text-[10px] tracking-[0.3em] uppercase">
              Menu
            </p>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="hover"
                  className={cn(
                    "mobile-nav-link",
                    pathname === link.href && "mobile-nav-link-active"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto border-t border-white/10 pt-8">
              <p className="flora-muted font-poppins text-xs">
                FLORA — Luxury Floral Experience
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default memo(Navbar);
