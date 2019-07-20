import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { AuthFirebaseService } from './auth-firebase/auth-firebase.service';
import { AuthMockService } from './auth-mock/auth-mock.service';
import { map, tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private googleAuthActive = false;

  constructor(
    private router: Router,
    private authFirebase: AuthFirebaseService,
    private authMock: AuthMockService,
    private spinnerService: SpinnerService,
  ) {}

  login(username?, password?) {
    this.spinnerService.setSpinnerState(false);
    if (username && password) {
      this.googleAuthActive = false;
      this.authMock.login(username, password);
    } else {
      this.googleAuthActive = true;
      this.authFirebase.login();
    }
  }

  logout() {
    this.authFirebase.logout();
    if (this.googleAuthActive) {
      this.googleAuthActive = false;
    } else {
      this.authMock.logout();
    }
    this.router.navigate(['/login']);
  }

  getAuthState(): Observable<boolean> {
    const authFirebase = this.authFirebase.getAuthState();
    const authMock = this.authMock.getAuthState();
    return combineLatest(authFirebase, authMock).pipe(
      map(state => {
        return state.some(item => item);
      }),
      tap(state => {
        if (state) {
          this.spinnerService.setSpinnerState(true);
        }
      }),
    );
  }
}
