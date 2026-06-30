import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import Providers from "@/components/Providers";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flora.paris";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FLORA — Luxury Floral Experience",
    template: "%s | FLORA",
  },
  description:
    "FLORA — L'art floral réinventé. Bouquets premium, compositions sur mesure et livraison soignée à Paris.",
  keywords: ["fleurs", "bouquet", "luxe", "Paris", "livraison fleurs", "FLORA"],
  authors: [{ name: "FLORA" }],
  creator: "FLORA",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "FLORA",
    title: "FLORA — Luxury Floral Experience",
    description: "L'art floral réinventé. Une expérience immersive, haut de gamme et émotionnelle.",
    images: [{ url: "/flowers/1.png", width: 1200, height: 630, alt: "FLORA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FLORA — Luxury Floral Experience",
    description: "L'art floral réinventé.",
    images: ["/flowers/1.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        <link rel="preload" href="/floral.mp4" as="video" type="video/mp4" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
