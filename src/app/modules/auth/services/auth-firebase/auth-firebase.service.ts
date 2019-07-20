import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BaseAuth } from '../../assets/base-auth';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService implements BaseAuth {
  private user: Observable<firebase.User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    public afAuth: AngularFireAuth,
  ) {
    this.user = firebaseAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getAuthState(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(state => !!state),
    );
  }
}
