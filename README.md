# FLORA — Luxury Floral Experience

Site e-commerce floral premium construit avec Next.js 15, GSAP et Tailwind CSS.

## Prérequis

- Node.js 18+
- npm

## Installation

```bash
npm install
cp .env.example .env.local
```

## Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

## Déploiement (Vercel)

1. Pousser le repo sur GitHub
2. Importer le projet sur [vercel.com](https://vercel.com)
3. Ajouter la variable d'environnement :
   - `NEXT_PUBLIC_SITE_URL` = URL de production
4. Déployer

## Structure des assets

```
public/
├── floral.mp4      # Vidéo hero (fixe, plein écran)
├── flowers/        # Images produits (1.png – 8.png)
├── images/         # Backgrounds pages internes (1–3.png)
├── logo.svg
└── icon.svg        # Favicon
```

## Fonctionnalités

- Panier persistant (localStorage via Zustand)
- Notifications toast (ajout panier, commande simulée)
- Drawer panier avec gestion des quantités
- Checkout simulé (démonstration, sans paiement réel)
- Favoris produits

## Scripts

| Commande        | Description          |
|-----------------|----------------------|
| `npm run dev`   | Serveur développement |
| `npm run build` | Build production     |
| `npm start`     | Serveur production   |
| `npm run lint`  | ESLint               |
