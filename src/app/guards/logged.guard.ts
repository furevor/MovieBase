import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class LoggedGuard implements CanActivate {

    constructor(private router: Router,
                public afAuth: AngularFireAuth
                ) { }

    canActivate(): Observable<boolean> {
        return this.afAuth.authState.pipe(take(1), map(state => !!state), tap(auth => {
          if (!auth) {
            this.router.navigate(['/login']);
          }}));
    }
}
