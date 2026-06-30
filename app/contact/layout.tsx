import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez FLORA — commandes sur mesure, événements et livraisons à Paris.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
