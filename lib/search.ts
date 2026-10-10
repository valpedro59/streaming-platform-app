import { Track } from "@/types/media";

export async function searchJamendoTracks(
  query: string,
  limit: number = 20,
): Promise<Track[]> {
  if (!query.trim()) return [];

  const clientId = "1899db0b";
  // ✅ encodeURIComponent est crucial pour les accents et espaces
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=${limit}&search=${encodeURIComponent(query)}&include=musicinfo`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erreur API");

    const data = await response.json();

    return (data.results || []).map((item: any) => ({
      id: item.id,
      titre: item.name,
      artist: item.artist_name,
      duration: formatDuration(item.duration),
      audioUrl: item.audio,
      imageUrl: item.image || item.album_image,
      genre: item.musicinfo?.tags?.genres?.[0] || "Inconnu",
      album: item.album_name,
    }));
  } catch (error) {
    console.error("Erreur recherche:", error);
    return [];
  }
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
