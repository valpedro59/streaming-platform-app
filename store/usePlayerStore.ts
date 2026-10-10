import { Track } from "@/types/media";
import { create } from "zustand";

interface PlayerStore {
  // État
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  tracks: Track[];
  currentIndex: number;

  // Actions
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  seekTo: (currentTime: number, duration: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  setTracks: (tracks: Track[]) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // ✅ État initial
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  tracks: [],
  currentIndex: -1,

  // ✅ Jouer une track spécifique
  playTrack: (track) => {
    const { tracks } = get();
    const index = tracks.findIndex((t) => t.id === track.id);
    set({
      currentTrack: track,
      isPlaying: true,
      currentIndex: index >= 0 ? index : -1,
      currentTime: 0,
      duration: 0,
    });
  },

  // ✅ Toggle play/pause
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  // ✅ Définir l'état de lecture directement
  setIsPlaying: (isPlaying) => set({ isPlaying }),

  // ✅ Volume (0 à 1)
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

  // ✅ Mise à jour de la progression
  seekTo: (currentTime, duration) =>
    set({ currentTime, duration: duration || get().duration }),

  // ✅ Morceau suivant
  playNext: () => {
    const { tracks, currentIndex } = get();
    if (tracks.length === 0) return;

    const nextIndex = (currentIndex + 1) % tracks.length;
    const nextTrack = tracks[nextIndex];

    set({
      currentTrack: nextTrack,
      isPlaying: true,
      currentIndex: nextIndex,
      currentTime: 0,
      duration: 0,
    });
  },

  // ✅ Morceau précédent
  playPrevious: () => {
    const { tracks, currentIndex } = get();
    if (tracks.length === 0) return;

    const prevIndex = currentIndex <= 0 ? tracks.length - 1 : currentIndex - 1;
    const prevTrack = tracks[prevIndex];

    set({
      currentTrack: prevTrack,
      isPlaying: true,
      currentIndex: prevIndex,
      currentTime: 0,
      duration: 0,
    });
  },

  // ✅ Définir la liste des tracks
  setTracks: (tracks) => set({ tracks }),
}));
