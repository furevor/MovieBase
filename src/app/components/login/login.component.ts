import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { map, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.afAuth.authState
      .pipe(
        take(1),
        map(state => !!state)
      )
      .subscribe(auth => {
        console.log(auth);
        if (auth) {
          this.router.navigate(['/']);
        }
      });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService
      .logout()
      .then(success => {
        this.router.navigate(['/login']);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
