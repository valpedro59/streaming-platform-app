export interface Track {
  id: string | number;
  titre: string;
  artist: string;
  duration: string; // Ex: "3:45"
  audioUrl: string; // Lien vers le fichier audio (mp3, etc.)
  imageUrl: string; // Pochette de la piste ou de l'album
  genre: string;
  album?: string;
}

export interface Album {
  id: string | number;
  titre: string;
  artist: string;
  releaseYear: number;
  imageUrl: string;
  tracks: Track[];
}

export interface Playlist {
  id: string | number;
  titre: string;
  description: string;
  imageUrl: string;
  tracks: Track[];
}

export type PlayerState = {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
};
