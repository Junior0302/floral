"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu, X, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { useStore } from "@/lib/store/cart";
import { useUiStore } from "@/lib/store/ui";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const mobileOpen = useUiStore((s) => s.mobileNavOpen);
  const pageLoading = useUiStore((s) => s.pageLoading);
  const toggleMobileNav = useUiStore((s) => s.toggleMobileNav);
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen);
  const navigateFromMobile = useUiStore((s) => s.navigateFromMobile);
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
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setMobileNavOpen(false);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [setMobileNavOpen]);

  const handleMobileNavClick = () => {
    navigateFromMobile();
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-6 py-4 md:px-10 md:py-5 lg:px-14",
          mobileOpen ? "nav-solid" : scrolled ? "glass-nav-scrolled" : "glass-nav"
        )}
      >
        <Link href="/" className="group flex items-center gap-3 justify-self-start" data-cursor="hover">
          <Image
            src="/logo.svg"
            alt="FLORA"
            width={32}
            height={32}
            priority
            className="transition-opacity duration-300 group-hover:opacity-90"
          />
          <span className="flora-title text-lg tracking-[0.2em] md:text-xl">FLORA</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex lg:gap-10 justify-self-center">
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

        <div className="flex items-center justify-self-end gap-3 sm:gap-4 md:gap-5">
          <button aria-label="Rechercher" data-cursor="hover" className="nav-action-btn hidden sm:flex">
            <Search size={20} strokeWidth={1.75} />
          </button>
          <button aria-label="Compte" data-cursor="hover" className="nav-action-btn hidden sm:flex">
            <User size={20} strokeWidth={1.75} />
          </button>
          <button aria-label="Favoris" data-cursor="hover" className="nav-action-btn relative">
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
            className="nav-action-btn md:hidden"
            onClick={toggleMobileNav}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-nav-panel fixed inset-0 z-[45] md:hidden">
          <nav className="flex h-full flex-col px-6 pt-28 pb-10 sm:px-8">
            <p className="flora-muted mb-6 font-poppins text-[10px] tracking-[0.3em] uppercase">
              Menu
            </p>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    if (link.href === pathname) {
                      setMobileNavOpen(false);
                      return;
                    }
                    handleMobileNavClick();
                  }}
                  className={cn(
                    "mobile-nav-link",
                    pathname === link.href && "mobile-nav-link-active",
                    pageLoading && pathname !== link.href && "pointer-events-none opacity-60"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {pageLoading && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <Loader2 size={18} className="animate-spin text-flora-coral" />
                <span className="flora-muted font-poppins text-xs tracking-wide">Chargement...</span>
              </div>
            )}

            <div className="mt-auto border-t border-white/10 pt-6">
              <p className="flora-muted font-poppins text-xs">FLORA — Luxury Floral Experience</p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default memo(Navbar);
