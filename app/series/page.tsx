import MovieCard from "@/components/movie/movieCard";
import { serieList } from "@/lib/data";
import React from "react";

const Series = () => {
  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col gap-8 shadow-2xl  px-8">
      <div className=" bg-primary/40 text-white p-2 font-bold text-2xl rounded-md">
        Series
      </div>
      <div className="w-full grid grid-cols-4 gap-6 ">
        {serieList.map(({ id, titre, genre, note, imageUrl }) => (
          <MovieCard
            key={id}
            titre={titre}
            genre={genre}
            note={note}
            imageUrl={imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Series;
