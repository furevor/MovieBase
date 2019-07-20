import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { Movie } from '../assets/Movie';

@Injectable({
  providedIn: 'root',
})
export class SearchMoviesService {
  movies$: BehaviorSubject<Movie[]>;
  activeMovie$: BehaviorSubject<Movie>;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string,
  ) {
    this.movies$ = new BehaviorSubject<Movie[]>(null);
    this.activeMovie$ = new BehaviorSubject<Movie>(null);
  }

  getMovies(): Observable<Movie[]> {
    return this.movies$.asObservable();
  }

  searchMovies(terms: Observable<string>) {
    terms
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(term => this.searchMovieEntries(term)),
      )
      .subscribe(movies => {
        this.movies$.next(movies);
      });
  }

  searchMovieEntries(title: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('apikey', 'c511b190');
    searchParams = searchParams.append('t', title);

    return this.http
      .get(this.apiUrl, { params: searchParams })
      .pipe(map(val => [val] as Movie[]));
  }

  getMovieByID(imdbId: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('apikey', 'c511b190');
    searchParams = searchParams.append('i', imdbId);

    this.http
      .get<Movie>(this.apiUrl, { params: searchParams })
      .subscribe(movie => this.activeMovie$.next(movie));
  }

  setMockMovies(movies: Movie[]) {
    this.movies$.next(movies);
  }

  getActiveMovie(): Observable<Movie> {
    return this.activeMovie$.asObservable();
  }

  findMovieByID(id: string) {
    let movie;
    try {
      movie = this.movies$.value.find(m => m.imdbID === id);
    } catch {
      movie = null;
    }
    if (!!movie) {
      this.activeMovie$.next(movie);
    } else {
      this.getMovieByID(id);
    }
  }
}
