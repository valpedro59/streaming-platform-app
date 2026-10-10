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
import { useEffect, useState } from "react";
import { audioManager } from "@/lib/audioManager";

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

  const [isLoaded, setIsLoaded] = useState(false);

  // Récupère l'instance globale une seule fois
  const audio = audioManager.getAudio();

  //  Gestion du changement de piste (URL)
  useEffect(() => {
    if (!currentTrack?.audioUrl) return;

    setIsLoaded(false);
    audioManager.setSrc(currentTrack.audioUrl);
    audioManager.setVolume(volume);

    const handleCanPlay = () => {
      setIsLoaded(true);
      if (isPlaying) audio.play().catch(console.warn);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        seekTo(audio.currentTime, audio.duration);
      }
    };

    const handleEnded = () => playNext();

    const handleError = () => {
      console.error("Audio Error:", audio.error);
      setIsLoaded(false);
    };

    // Attacher les listeners sur l'instance globale
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Nettoyage : on retire les listeners mais on garde l'objet audio vivant
    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [currentTrack?.audioUrl]);

  // Synchronisation Play/Pause (Le chef d'orchestre)
  useEffect(() => {
    if (!isLoaded) return;
    if (isPlaying) {
      audio.play().catch(console.warn);
    } else {
      audio.pause();
    }
  }, [isPlaying, isLoaded]);

  //  Mise à jour du volume
  useEffect(() => {
    audioManager.setVolume(volume);
  }, [volume]);

  //  LES HANDLERS ICI (Ils parlent au store ou à l'audioManager)
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (
    value: number | readonly number[],
    _eventDetails?: unknown,
  ) => {
    const time = Array.isArray(value) ? value[0] : Number(value);

    if (typeof time !== "number" || Number.isNaN(time)) return;

    audioManager.seek(time);
    seekTo(time, duration);
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
            setVolume((typeof v === "number" ? v : (v[0] ?? 0)) / 100)
          }
        />
      </div>
    </div>
  );
}
