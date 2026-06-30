"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Facebook } from "lucide-react";
import VolumeControl from "@/components/VolumeControl";
import { cn } from "@/utils/cn";

const navLinks = [
  { href: "/boutique", label: "Boutique" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function HomeFooter() {
  const pathname = usePathname();

  return (
    <footer className="home-footer absolute bottom-0 left-0 right-0 z-20 px-6 py-5 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between md:gap-0">
        <Link href="/" className="group flex items-center gap-2" data-cursor="hover">
          <Image
            src="/logo.svg"
            alt="FLORA"
            width={20}
            height={20}
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <span className="flora-title font-playfair text-sm tracking-[0.2em] transition-colors duration-300 group-hover:text-flora-coral">
            FLORA
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-2 md:gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor="hover"
              className={cn(
                "home-footer-link font-poppins text-xs tracking-[0.12em] uppercase",
                pathname === link.href && "home-footer-link-active"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <VolumeControl size={16} />
          <a href="#" aria-label="Instagram" data-cursor="hover" className="flora-icon-btn h-9 w-9">
            <Instagram size={15} strokeWidth={1.75} />
          </a>
          <a href="#" aria-label="Facebook" data-cursor="hover" className="flora-icon-btn h-9 w-9">
            <Facebook size={15} strokeWidth={1.75} />
          </a>
          <span className="flora-muted hidden font-poppins text-[10px] tracking-wide sm:inline">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
