export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  occasion: string;
  color: string;
  collection: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Bouquet Éclat Rose",
    price: 89,
    category: "Bouquets",
    occasion: "Anniversaire",
    color: "Rose",
    collection: "Signature",
    image: "/flowers/7.png",
    description: "Un bouquet délicat aux tons roses et corail, composé à la main.",
  },
  {
    id: "2",
    name: "Composition Soleil Doré",
    price: 125,
    category: "Compositions",
    occasion: "Mariage",
    color: "Jaune",
    collection: "Prestige",
    image: "/flowers/2.png",
    description: "Lumière dorée et fleurs de saison pour célébrer l'amour.",
  },
  {
    id: "3",
    name: "Orchidée Élégance",
    price: 95,
    category: "Plantes",
    occasion: "Remerciement",
    color: "Blanc",
    collection: "Signature",
    image: "/flowers/3.png",
    description: "Orchidée raffinée dans un vase artisanal, symbole d'élégance.",
  },
  {
    id: "4",
    name: "Bouquet Corail Passion",
    price: 110,
    category: "Bouquets",
    occasion: "Saint-Valentin",
    color: "Corail",
    collection: "Passion",
    image: "/flowers/4.png",
    description: "Passion et chaleur dans chaque pétale, une déclaration florale.",
  },
  {
    id: "5",
    name: "Jardin Sauvage",
    price: 75,
    category: "Bouquets",
    occasion: "Naissance",
    color: "Beige",
    collection: "Nature",
    image: "/flowers/5.png",
    description: "Fleurs des champs, nature et poésie en bouquet libre.",
  },
  {
    id: "6",
    name: "Luxe Tropical",
    price: 145,
    category: "Compositions",
    occasion: "Entreprise",
    color: "Orange",
    collection: "Prestige",
    image: "/flowers/6.png",
    description: "Exotisme raffiné pour espaces d'exception et événements.",
  },
  {
    id: "7",
    name: "Pivoines de Mai",
    price: 98,
    category: "Bouquets",
    occasion: "Anniversaire",
    color: "Rose",
    collection: "Saison",
    image: "/flowers/7.png",
    description: "Pivoines fraîches au parfum délicat, emblème du printemps.",
  },
  {
    id: "8",
    name: "Minimal Blanc",
    price: 68,
    category: "Bouquets",
    occasion: "Deuil",
    color: "Blanc",
    collection: "Essentiel",
    image: "/flowers/8.png",
    description: "Élégance sobre et respectueuse, blanc pur et feuillage vert.",
  },
];

export const occasions = ["Tous", "Anniversaire", "Mariage", "Saint-Valentin", "Naissance", "Remerciement", "Entreprise", "Deuil"];
export const colors = ["Tous", "Rose", "Corail", "Orange", "Jaune", "Blanc", "Beige"];
export const collections = ["Tous", "Signature", "Prestige", "Passion", "Nature", "Saison", "Essentiel"];
export const priceRanges = [
  { label: "Tous", min: 0, max: Infinity },
  { label: "Moins de 80€", min: 0, max: 80 },
  { label: "80€ – 120€", min: 80, max: 120 },
  { label: "Plus de 120€", min: 120, max: Infinity },
];
