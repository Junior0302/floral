"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";

const navLinks = [
  { href: "/boutique", label: "Boutique" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function HomeFooter() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/30 px-6 py-5 backdrop-blur-md md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between md:gap-0">
        {/* Gauche — Logo */}
        <Link href="/" className="flex items-center gap-2" data-cursor="hover">
          <Image src="/logo.svg" alt="FLORA" width={20} height={20} />
          <span className="flora-title font-playfair text-sm tracking-[0.2em]">
            FLORA
          </span>
        </Link>

        {/* Centre — Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor="hover"
              className="flora-body font-poppins text-xs tracking-[0.12em] uppercase opacity-85 transition-opacity hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Droite — Réseaux + copyright */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="Instagram"
            data-cursor="hover"
            className="text-white/75 transition-colors hover:text-white"
          >
            <Instagram size={16} strokeWidth={1.75} />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            data-cursor="hover"
            className="text-white/75 transition-colors hover:text-white"
          >
            <Facebook size={16} strokeWidth={1.75} />
          </a>
          <span className="flora-muted hidden font-poppins text-[10px] tracking-wide sm:inline">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
