"use client";

import { Track } from "@/types/media";
import MediaCard from "./mediaCard";

interface MediaGridProps {
  title?: string;
  tracks: Track[];
}

export default function MediaGrid({ title, tracks }: MediaGridProps) {
  return (
    <section className="w-full space-y-4">
      {title && (
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {tracks.map((track) => (
          <MediaCard key={track.id} track={track} index={0} />
        ))}
      </div>
    </section>
  );
}
