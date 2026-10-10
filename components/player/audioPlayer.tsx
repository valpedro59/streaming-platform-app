"use client";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useEffect, useRef } from "react";
import TrackControls from "./trackControls";

const AudioPlayer = () => {
  const { currentTrack, isPlaying, togglePlay, playNext } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // On doit await play() car il peut lever une erreur si l'URL est invalide
      audio.play().catch((err) => {
        console.error("Erreur de lecture audio:", err);
        console.log("URL tentée:", audio.src);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // ✅ Correction : passer à la prochaine chanson à la fin, pas togglePlay
  const handleEnded = () => {
    playNext();
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-t border-white/10 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={currentTrack.imageUrl}
          alt={currentTrack.titre}
          className="w-12 h-12 rounded object-cover"
        />
        <div>
          <h4 className="text-sm font-bold text-white truncate">
            {currentTrack.titre}
          </h4>
          <p className="text-xs text-gray-400">{currentTrack.genre}</p>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.audioUrl || ""}
        onEnded={handleEnded}
        // ✅ Ajoute ces attributs pour améliorer la compatibilité
        preload="metadata"
        crossOrigin="anonymous"
      />

      <TrackControls />
    </div>
  );
};

export default AudioPlayer;
