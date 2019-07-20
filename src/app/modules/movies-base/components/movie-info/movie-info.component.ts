import { Component, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs/index';
import { Movie } from '../../assets/Movie';
import { SearchMoviesService } from '../../services/search-movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss'],
})
export class MovieInfoComponent implements OnInit {
  activeMovie$: Observable<Movie>;
  posterURL: string;
  constructor(
    private searchMovies: SearchMoviesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activeMovie$ = this.searchMovies.getActiveMovie().pipe(
      filter(val => val !== null),
      map(movie => {
        this.posterURL = movie.Poster;
        delete movie.Poster;
        delete movie.Ratings;
        return movie;
      }),
    );

    this.route.params.pipe(map(params => params['imdbID'])).subscribe(id => {
      this.searchMovies.findMovieByID(id);
    });
  }

  turnBack() {
    this.router.navigate(['/']);
  }
}
