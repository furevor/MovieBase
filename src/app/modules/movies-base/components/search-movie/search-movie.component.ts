import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MOCK_DATA, Movie } from '../../assets/Movie';
import { Observable } from 'rxjs';
import { SearchMoviesService } from '../../services/search-movies.service';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss'],
})
export class SearchMovieComponent implements OnInit {
  searchMoviesForm: FormGroup;
  movies$: Observable<Movie[]>;

  // paginator settings
  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private fb: FormBuilder,
    private searchMovies: SearchMoviesService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.searchMoviesForm = fb.group({
      searchInput: [''],
    });
  }

  ngOnInit() {
    // searching for input term results
    this.searchMovies.searchMovies(
      this.searchMoviesForm.get('searchInput').valueChanges,
    );
    this.movies$ = this.searchMovies.getMovies();
  }

  getMockMovies() {
    this.searchMovies.setMockMovies(MOCK_DATA as Movie[]);
  }

  showMovieInfo(movie: Movie) {
    this.router.navigate(['/movie', movie.imdbID || 'mockie']);
  }

  logout() {
    this.authService.logout();
  }
}
