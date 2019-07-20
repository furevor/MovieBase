import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { LoggedGuard } from './modules/auth/guards';
import { APP_MODULES_LAZY } from './modules';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'main', component: MainViewComponent },
  // { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  ...APP_MODULES_LAZY,
  // {
  //   path: '**',
  //   redirectTo: '404',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
