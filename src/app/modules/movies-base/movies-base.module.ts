import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesBaseRoutingModule } from './movies-base-routing.module';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularPaginatorModule } from 'angular-paginator';

@NgModule({
  declarations: [SearchMovieComponent, MovieInfoComponent],
  imports: [
    CommonModule,
    MoviesBaseRoutingModule,
    ReactiveFormsModule,
    AngularPaginatorModule,
  ],
})
export class MoviesBaseModule {}

export const MoviesBaseModuleLazy = {
  path: '',
  loadChildren: () =>
    import('../movies-base/movies-base.module').then(m => m.MoviesBaseModule),
};
