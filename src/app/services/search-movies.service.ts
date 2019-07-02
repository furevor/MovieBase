import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { Movie } from '../assets/Movie';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  catchError,
  filter,
  map,
  mergeMap,
  share,
  take,
  tap,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchMoviesService {
  movies$: BehaviorSubject<Movie[]>;
  activeMovie$: BehaviorSubject<Movie>;

  constructor(private http: HttpClient) {
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
        switchMap(term => this.searchMovieEntries(term))
      )
      .subscribe(movies => {
        this.movies$.next(movies);
      });
  }

  searchMovieEntries(title: string) {
    const path_ = 'http://www.omdbapi.com';
    let searchParams = new HttpParams();
    searchParams = searchParams.append('apikey', 'c511b190');
    searchParams = searchParams.append('t', title);

    return this.http
      .get(path_, { params: searchParams })
      .pipe(map(val => [val] as Movie[]));
  }

  getMovieByID(imdbId: string) {
    const path_ = 'http://www.omdbapi.com';
    let searchParams = new HttpParams();
    searchParams = searchParams.append('apikey', 'c511b190');
    searchParams = searchParams.append('i', imdbId);

    this.http
      .get<Movie>(path_, { params: searchParams })
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

  // getActiveMovie(imdbId: string) {
  //   // return of({Title: '555'} as Movie);
  //   // debugger;
  //   // return this.movies$.value;
  //   let movie;
  //   try {
  //     movie = this.movies$.value.find(m => m.imdbID === imdbId);
  //   } catch {
  //     movie = null;
  //   }
  //   if (!!movie) {
  //     return movie;
  //   } else {
  //     return this.getMovieByID(imdbId);
  //   }
  // }
}
