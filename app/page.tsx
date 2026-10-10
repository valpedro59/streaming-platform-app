import MediaGrid from "@/components/mediaGrid";
import AudioPlayer from "@/components/player/audioPlayer";
import SearchBar from "@/components/searchBar";
import { fetchJamendoTracks } from "@/services/jamendo";

export default async function Home() {
  const jamendoTracks = await fetchJamendoTracks(10);

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            C&E Music 🎵
          </h1>
          <p className="text-zinc-400">
            Recherchez et écoutez des milliers de titres gratuits.
          </p>
        </header>

        <SearchBar />

        {/* Contenu par défaut si pas de recherche active */}
        {jamendoTracks.length > 0 && (
          <MediaGrid title="Nouveautés en streaming" tracks={jamendoTracks} />
        )}
      </div>

      <AudioPlayer />
    </div>
  );
}
