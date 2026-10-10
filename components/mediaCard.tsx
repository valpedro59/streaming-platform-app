"use client";

import { Track } from "@/types/media";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Play } from "lucide-react";

interface MediaCardProps {
  track: Track;
  index: number;
}

export default function MediaCard({ track }: MediaCardProps) {
  const { playTrack, currentTrack, isPlaying } = usePlayerStore();
  const isCurrent = currentTrack?.id === track.id;

  return (
    <div
      className="group relative flex flex-col gap-2 rounded-lg bg-zinc-900/50 p-4 transition-all hover:bg-zinc-800 hover:shadow-lg hover:shadow-white/5 cursor-pointer"
      onClick={() => playTrack(track)} // ✅ C'est ici qu'on joue
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-md">
        <img
          src={track.imageUrl}
          alt={track.titre}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay Play Button */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${isCurrent && isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        >
          <div className="rounded-full bg-white p-3 text-black shadow-lg">
            {isCurrent && isPlaying ? (
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <Play className="h-6 w-6 fill-current ml-1" />
            )}
          </div>
        </div>

        {/* Indicateur "En cours" */}
        {isCurrent && isPlaying && (
          <div className="absolute top-2 right-2 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h3
          className={`font-semibold truncate ${isCurrent ? "text-green-400" : "text-white"}`}
        >
          {track.titre}
        </h3>
        <p className="text-sm text-zinc-400 truncate">{track.artist}</p>
        <p className="text-xs text-zinc-500">{track.duration}</p>
      </div>
    </div>
  );
}
