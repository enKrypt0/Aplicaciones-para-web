import { Injectable } from '@angular/core';
import { IMovie } from '../../interfaces/IMovie';

@Injectable({
  providedIn: 'root'
})
export class Movie {
  private movies: IMovie[] = [
    {
      id: 1,
      title: 'Inception',
      plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
      image: 'https://example.com/inception.jpg'
    },
    {
      id: 2,
      title: 'The Matrix',
      plot: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
      image: 'https://example.com/matrix.jpg'
    }
  ];
}
export class MovieService {
  getMovies(): IMovie[] {
    return this.Movie;
  }

  getMovieById(id: number): IMovie | undefined {
    return this.IMovie.find(movie => movie.id === id);
  }
}