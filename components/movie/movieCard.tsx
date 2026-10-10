import React from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { MovieCardProps } from "@/lib/types";

const MovieCard = ({ titre, genre, note, imageUrl }: MovieCardProps) => {
  return (
    <Card className="movie-card  flex flex-col justify-between items-center">
      <img src={imageUrl} alt="image" width={150} height={300} />
      <div className="movie-card-content">
        <CardHeader className="flex w-full justify-between">
          <span>{genre}</span>
          <span>{note}</span>
        </CardHeader>
        <p>{titre}</p>
      </div>
    </Card>
  );
};

export default MovieCard;
