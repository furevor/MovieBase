export interface Movie {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Array<any>;
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export const MOCK_DATA = [
  { Title: 'Bad_1', imdbRating: '4.3' },
  { Title: 'Medium1', imdbRating: '5.2' },
  { Title: 'Good1', imdbRating: '9.0' },
  { Title: 'Medium2', imdbRating: '7.2' },
  { Title: 'Medium3', imdbRating: '5.1' },
  { Title: 'Bad2', imdbRating: '4.1' },
  { Title: 'Bad3', imdbRating: '4.9' },
  { Title: 'Medium4', imdbRating: '5.5' },
  { Title: 'Good2', imdbRating: '8.2' },
  { Title: 'Good3', imdbRating: '8.7' },
  { Title: 'Medium5', imdbRating: '6.0' },
  { Title: 'Good4', imdbRating: '8.0' },
];
