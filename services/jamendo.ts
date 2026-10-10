import { trackList } from "@/lib/data";
import { Track } from "@/types/media";

export async function fetchJamendoTracks(limit: number = 10): Promise<Track[]> {
  const clientId = "1899db0b";
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=${limit}&include=musicinfo`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache 1h côté Next.js
    });

    if (!response.ok) {
      console.warn("Erreur API Jamendo:", response.status, response.statusText);
      return trackList;
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return trackList;
    }

    return data.results.map((item: any) => ({
      id: item.id,
      titre: item.name,
      artist: item.artist_name,
      duration: formatDuration(item.duration),
      audioUrl: item.audio,
      imageUrl: item.image || item.album_image,
      genre: item.musicinfo?.tags?.genres?.[0] || "Pop",
      album: item.album_name,
    }));
  } catch (error) {
    console.warn(
      "Jamendo API indisponible, bascule sur les données locales.",
      error,
    );
    return trackList;
  }
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
