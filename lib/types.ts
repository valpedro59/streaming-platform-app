export interface MovieCardProps {
  titre: string;
  genre: string;
  note: string;
  imageUrl: string;
}
export interface FooterLinkColumn {
  id: number;
  links: string[];
}

export interface MediaItem {
  id: number;
  titre: string;
  note: string;
  imageUrl: string;
}
export interface TMDBResponseItem {
  id: number;
  title?: string;
  name?: string;
  vote_average: number;
  poster_path: string | null;
}

export interface TMDBApiResponse {
  results: TMDBResponseItem[];
}
