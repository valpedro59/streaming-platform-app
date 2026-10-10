"use client";

import { useState, useEffect } from "react";
import { searchJamendoTracks } from "@/lib/search";
import { Track } from "@/types/media";

import { Search } from "lucide-react";
import MediaGrid from "./mediaGrid";
import { Input } from "./ui/input";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Debounce : attend 500ms après la dernière frappe avant de lancer la recherche
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const tracks = await searchJamendoTracks(query);
      setResults(tracks);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <Input
          type="text"
          placeholder="Rechercher un artiste, un titre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 bg-zinc-900 border-zinc-700 text-white focus-visible:ring-white"
        />
      </div>

      {/* Résultats */}
      {loading && (
        <p className="text-center text-zinc-400">Recherche en cours...</p>
      )}

      {!loading && query.length >= 2 && results.length === 0 && (
        <p className="text-center text-zinc-500">
          Aucun résultat pour "{query}"
        </p>
      )}

      {!loading && results.length > 0 && (
        <MediaGrid title={`Résultats pour "${query}"`} tracks={results} />
      )}
    </div>
  );
}
