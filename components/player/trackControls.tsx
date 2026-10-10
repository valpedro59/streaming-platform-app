"use client";

import { usePlayerStore } from "@/store/usePlayerStore";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function TrackControls() {
  const {
    currentTrack,
    isPlaying,
    playNext,
    playPrevious,
    volume,
    setVolume,
    currentTime,
    duration,
    seekTo,
    setIsPlaying,
  } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ 1. Initialisation de l'audio quand la track change
  useEffect(() => {
    if (!currentTrack?.audioUrl) return;

    // Arrêter et nettoyer l'ancien audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
    }

    setIsLoaded(false);

    // Créer le nouvel élément audio
    const audio = new Audio(currentTrack.audioUrl);
    audio.volume = volume;
    audioRef.current = audio;

    // ✅ 2. Quand l'audio est prêt à jouer
    const handleCanPlay = () => {
      setIsLoaded(true);
      if (isPlaying) {
        audio.play().catch((e) => console.warn("Autoplay blocked", e));
      }
    };

    // ✅ 3. Synchronisation Play/Pause avec le store
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // ✅ 4. Mise à jour de la progression
    const handleTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        seekTo(audio.currentTime, audio.duration);
      }
    };

    // ✅ 5. Fin de la chanson -> Suivant
    const handleEnded = () => {
      playNext();
    };

    // ✅ 6. Gestion des erreurs
    const handleError = () => {
      console.error("Audio Error:", audio.error);
      setIsLoaded(false);
    };

    // Attacher les écouteurs
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Nettoyage au démontage ou changement de track
    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, [currentTrack?.audioUrl]); // Se lance seulement quand l'URL change

  // ✅ 7. Mise à jour du volume en temps réel
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // ✅ Handlers pour les boutons
  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
  };

  const handleSeek = (
    value: number | readonly number[],
    _eventDetails?: unknown,
  ) => {
    const time = Array.isArray(value) ? value[0] : value;
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    seekTo(time, duration);
  };

  const handleVolumeChange = (
    value: number | readonly number[],
    _eventDetails?: unknown,
  ) => {
    const nextVolume = Array.isArray(value) ? value[0] : value;
    setVolume(nextVolume / 100);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-white/10 text-white px-4 py-3 flex items-center justify-between gap-4">
      {/* 1. Info Track */}
      <div className="flex items-center gap-3 w-1/4 min-w-[150px]">
        <img
          src={currentTrack.imageUrl}
          alt={currentTrack.titre}
          className="w-10 h-10 rounded bg-zinc-800 object-cover"
        />
        <div className="overflow-hidden">
          <p className="text-sm font-bold truncate">{currentTrack.titre}</p>
          <p className="text-xs text-zinc-400 truncate">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* 2. Contrôles & Progression (Centre) */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white"
            onClick={playPrevious}
          >
            <SkipBack className="w-5 h-5" />
          </Button>

          <Button
            size="icon"
            className="rounded-full bg-white text-black hover:bg-zinc-200 w-10 h-10"
            onClick={handleTogglePlay}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white"
            onClick={playNext}
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full text-xs text-zinc-400">
          <span>{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            className="cursor-pointer"
            onValueChange={handleSeek}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. Volume (Droite) */}
      <div className="w-1/4 flex items-center justify-end gap-2 min-w-[100px]">
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white"
          onClick={() => setVolume(volume === 0 ? 1 : 0)}
        >
          {volume === 0 ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </Button>
        <Slider
          value={[volume * 100]}
          max={100}
          step={1}
          className="w-20 cursor-pointer"
          onValueChange={(v) =>
            setVolume((typeof v === "number" ? v : v[0]) / 100)
          }
        />
      </div>
    </div>
  );
}
