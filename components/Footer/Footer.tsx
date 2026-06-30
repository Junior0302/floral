"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="glass-footer relative mt-16 px-6 py-16 md:px-12 md:py-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3" data-cursor="hover">
              <Image
                src="/logo.svg"
                alt="FLORA"
                width={26}
                height={26}
                className="drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)] transition-transform duration-500 group-hover:scale-105"
              />
              <span className="flora-title font-playfair text-lg tracking-[0.22em]">
                FLORA
              </span>
            </Link>
            <p className="flora-muted mt-5 max-w-xs font-poppins text-sm leading-relaxed">
              L&apos;art floral réinventé. Des créations uniques pour chaque moment précieux.
            </p>
          </div>

          <div>
            <h4 className="flora-title mb-5 font-poppins text-[10px] tracking-[0.22em] uppercase">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="hover"
                  className="flora-body font-poppins text-[15px] transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="flora-title mb-5 font-poppins text-[10px] tracking-[0.22em] uppercase">
              Newsletter
            </h4>
            <p className="flora-muted mb-5 font-poppins text-sm leading-relaxed">
              Recevez nos nouveautés et inspirations florales.
            </p>
            <form
              className="flex items-end gap-4 border-b border-white/20 pb-2 transition-colors duration-300 focus-within:border-flora-coral/60"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Votre email"
                className="flora-body flex-1 bg-transparent py-1 font-poppins text-sm outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                data-cursor="hover"
                data-magnetic
                className="flora-btn-primary rounded-full px-5 py-2 font-poppins text-[10px] tracking-[0.18em] uppercase"
              >
                S&apos;inscrire
              </button>
            </form>

            <div className="mt-8 flex gap-4">
              {[
                { label: "Instagram", Icon: Instagram },
                { label: "Facebook", Icon: Facebook },
              ].map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  data-cursor="hover"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <Icon size={17} strokeWidth={1.75} />
                </a>
              ))}
              <a
                href="#"
                aria-label="Pinterest"
                data-cursor="hover"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <p className="flora-muted mt-14 border-t border-white/8 pt-8 text-center font-poppins text-xs tracking-wide">
          © {new Date().getFullYear()} FLORA — Luxury Floral Experience. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
