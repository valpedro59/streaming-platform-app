import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = params;
  return {
    title: `Piste #${id} — CEFlix Music`,
    description: `Écoutez et profitez de cette piste en streaming sur l'application de Clancy & Emmanuelle.`,
  };
}

export default async function TrackDetailPage({ params }: PageProps) {
  const { id } = params;

  // Simulation de données de musique
  const track = {
    id,
    titre: "La nuit de l'homme",
    artist: "Clancy & Emmanuelle",
    genre: "Electro Pop",
    note: "4.8",
    imageUrl: "/vercel.svg",
  };

  if (!track) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-center bg-zinc-900/60 p-8 rounded-3xl border border-zinc-800 backdrop-blur-md shadow-2xl">
        <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={track.imageUrl}
            alt={track.titre}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-4 text-center md:text-left">
          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-semibold">
            {track.genre}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {track.titre}
          </h1>
          <p className="text-xl text-zinc-400 font-medium">{track.artist}</p>

          <div className="pt-4 flex items-center justify-center md:justify-start gap-4">
            <Button className="bg-white text-black hover:bg-zinc-200 font-bold px-8 py-6 rounded-full flex items-center gap-2">
              <Play className="w-5 h-5 fill-current" /> Écouter maintenant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
