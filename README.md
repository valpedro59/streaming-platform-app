Voici une proposition de `README.md` professionnel et structuré pour ton projet.

---

# 🎵 C&E Stream

**C&E Stream** est une application web de streaming audio moderne conçue pour **Clancy & Emmanuelle**. Elle permet de découvrir, rechercher et écouter de la musique en temps réel.

> **Note :** Cette version se concentre exclusivement sur la partie **Musique**. Une extension vers les Films et Séries est prévue dans les prochaines mises à jour.

---

## 🚀 Fonctionnalités

- **🔍 Recherche intelligente** : Intégration avec l'API Jamendo pour trouver des milliers de titres.
- **🎧 Lecteur audio avancé** :
  - Lecture/Pause, Suivant/Précédent.
  - Barre de progression interactive (seek).
  - Contrôle du volume.
  - Gestion fluide des changements de piste sans interruption.
- **🎨 Interface moderne** : Design épuré avec Tailwind CSS et composants Shadcn/UI.
- **✨ Animations** : Transitions fluides grâce à Framer Motion.
- **⚡ Performance** : État global optimisé avec Zustand et rendu serveur avec Next.js.

---

## 🛠️ Technologies utilisées

Ce projet est construit avec une stack moderne et performante :

| Catégorie            | Technologie                                               |
| -------------------- | --------------------------------------------------------- |
| **Framework**        | [Next.js 14/15](https://nextjs.org/) (App Router)         |
| **Langage**          | [TypeScript](https://www.typescriptlang.org/)             |
| **Styling**          | [Tailwind CSS](https://tailwindcss.com/)                  |
| **UI Components**    | [Shadcn/UI](https://ui.shadcn.com/) (Radix UI + Tailwind) |
| **State Management** | [Zustand](https://zustand.surge.sh/)                      |
| **Animations**       | [Framer Motion](https://www.framer.com/motion/)           |
| **API Musique**      | [Jamendo API](https://developer.jamendo.com/)             |

---

## 📦 Installation et Démarrage

### 1. Cloner le projet

```bash
git clone https://github.com/votre-username/ce-stream.git
cd ce-stream
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configurer l'API Jamendo

Pour que la recherche et le streaming fonctionnent, vous devez fournir votre propre `client_id` Jamendo.

1. Créez un compte sur [Jamendo Developer](https://developer.jamendo.com/).
2. Récupérez votre `client_id`.
3. Créez un fichier `.env.local` à la racine du projet :

```env
# .env.local
JAMENDO_CLIENT_ID=votre_client_id_ici
```

_(Si vous utilisez le code par défaut fourni, le client ID de démo est intégré, mais il est recommandé d'utiliser le vôtre pour éviter les limites de quota.)_

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

---

## 🏗️ Architecture du Projet

```
ce-stream/
├── app/                    # Structure Next.js App Router
│   ├── page.tsx            # Page d'accueil (Home)
│   └── layout.tsx          # Layout global
├── components/             # Composants React
│   ├── player/
│   │   ├── AudioPlayer.tsx # Conteneur visuel du lecteur
│   │   └── TrackControls.tsx# Logique audio et contrôles
│   ├── MediaGrid.tsx       # Grille des albums/tracks
│   ├── MediaCard.tsx       # Carte individuelle d'une track
│   └── SearchBar.tsx       # Barre de recherche
├── lib/                    # Utilitaires et Logique API
│   ├── data.ts             # Données locales (fallback)
│   ├── audioManager.ts     # Singleton pour l'instance Audio HTML5
│   └── search.ts           # Fonctions de recherche Jamendo
├── store/                  # État global avec Zustand
│   └── usePlayerStore.ts   # Store du lecteur (play, pause, volume...)
└── types/                  # Définitions TypeScript
    └── media.ts            # Interface Track
```

### Gestion de l'Audio

L'audio est géré via un **singleton** (`lib/audioManager.ts`) pour éviter le problème courant de double lecture ou de fuites de mémoire dans React. Le store Zustand (`usePlayerStore`) synchronise l'état de l'interface avec la lecture native du navigateur.

---

## 🗺️ Roadmap

Ce projet est en développement actif. Voici les prochaines étapes :

- [x] **Phase 1 : Musique**
  - [x] Intégration API Jamendo
  - [x] Lecteur audio complet
  - [x] Recherche et filtrage
- [ ] **Phase 2 : Films & Séries**
  - [ ] Intégration API TMDB (The Movie Database)
  - [ ] Système de recherche vidéo
  - [ ] Lecteur vidéo intégré
- [ ] **Phase 3 : Fonctionnalités Avancées**
  - [ ] Système de favoris / Playlist
  - [ ] Mode sombre/clair (actuellement sombre par défaut)
  - [ ] Authentification utilisateur

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushz vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet est disponible sous licence [MIT](LICENSE).

---

**Développé avec ❤️ pour Clancy & Emmanuelle**
