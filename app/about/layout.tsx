import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez l'histoire, les valeurs et l'atelier FLORA à Paris.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
