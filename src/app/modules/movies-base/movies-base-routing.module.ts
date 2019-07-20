import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { LoggedGuard } from '../auth/guards';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';

const routes: Routes = [
  {
    path: '',
    component: SearchMovieComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'movie/:imdbID',
    component: MovieInfoComponent,
    canActivate: [LoggedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesBaseRoutingModule {}
