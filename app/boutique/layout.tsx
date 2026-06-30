import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Découvrez nos créations florales premium — bouquets, compositions et plantes.",
};

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  return children;
}
