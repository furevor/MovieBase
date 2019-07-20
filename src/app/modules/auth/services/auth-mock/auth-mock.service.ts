import { Injectable } from '@angular/core';
import { BaseAuth } from '../../assets/base-auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthMockService implements BaseAuth {
  authState: BehaviorSubject<boolean>;
  constructor(private router: Router) {
    this.authState = new BehaviorSubject(false);
  }

  login(username, password) {
    this.authState.next(true);
    this.router.navigate(['/']);
  }

  logout() {
    this.authState.next(false);
  }

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }
}
