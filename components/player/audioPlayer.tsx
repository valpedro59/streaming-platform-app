"use client";

import { usePlayerStore } from "@/store/usePlayerStore";
import TrackControls from "./trackControls"; // On garde juste les contrôles

const AudioPlayer = () => {
  const { currentTrack } = usePlayerStore();

  // Si aucune musique n'est sélectionnée, on n'affiche rien
  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-t border-white/10 px-6 py-3 flex items-center justify-between">
      {/* 1. Informations de la chanson (Gauche) */}
      <div className="flex items-center space-x-4 w-1/4 min-w-[150px]">
        <img
          src={currentTrack.imageUrl}
          alt={currentTrack.titre}
          className="w-12 h-12 rounded object-cover bg-zinc-800"
        />
        <div className="overflow-hidden">
          <h4 className="text-sm font-bold text-white truncate">
            {currentTrack.titre}
          </h4>
          <p className="text-xs text-gray-400 truncate">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* 2. Les Contrôles (Centre & Droite) */}
      {/* C'EST ICI QUE LE SON EST GÉRÉ */}
      <TrackControls />
    </div>
  );
};

export default AudioPlayer;
