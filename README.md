# 🎵 Projet 2 : Plateforme de Streaming Multimédia (Clone Netflix/Spotify)

Clone de service multimédia axé sur les performances, le SEO (SSR/ISR) et la manipulation fluide de l'API HTML5 Audio/Video.

## 🛠️ Stack Technique

* **Framework** : Next.js 15+ (App Router)
* **Langage** : TypeScript
* **Styling** : Tailwind CSS v4 & Shadcn UI (Preset Zinc / Default)
* **Animations** : Framer Motion
* **Gestion d'état** : Zustand
* **Icônes** : Lucide React

## 🚀 Initialisation du Projet

```bash
# 1. Création de l'application Next.js
npx create-next-app@latest streaming-platform-app --typescript --eslint --tailwind --src-dir --app

# 2. Installation des dépendances
cd streaming-platform-app
npm install lucide-react framer-motion zustand

# 3. Configuration de Shadcn UI
npx shadcn@latest init

# 4. Ajout des composants UI cruciaux (le Slider pilote la timeline du lecteur)
npx shadcn@latest add slider card button
```

## 📁 Architecture des Fichiers (`src/`)

```text
src/
├── app/
│   ├── layout.tsx         # Contient l'AudioPlayer persistant en pied de page
│   ├── page.tsx           # Hub de découverte (Grilles de catégories)
│   └── track/[id]/        # Route dynamique optimisée pour le SEO (SSR/ISR)
├── components/
│   ├── Navbar.tsx         # Navigation principale
│   ├── MediaGrid.tsx      # Grille adaptative de cartes multimédias
│   ├── MediaCard.tsx      # Carte animée avec Framer Motion (Hover scale)
│   └── Player/
│       ├── AudioPlayer.tsx # Lecteur HTML5 masqué géré par React useRef
│       └── TrackControls.tsx # Interface du lecteur (Timeline Slider, Volume)
├── store/
│   └── usePlayerStore.ts  # Gestion d'état global du média (Play, Pause, Playlist)
└── types/
    └── media.ts           # Interfaces TypeScript (Track, Artist)
```
