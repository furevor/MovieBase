import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(private router: Router, public authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.getAuthState().pipe(
      tap(auth => {
        if (!auth) {
          this.router.navigate(['/login']);
        }
      }),
    );
  }
}
