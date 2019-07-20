import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  reactiveForm: FormGroup;
  showFormPassword = false;
  authSubscription: Subscription;
  validationMessages = {
    username: 'Username field shouldn’t be empty',
    password: 'Password field shouldn’t be empty',
    passwordLength: 'Password should be more than 6 symbols',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.reactiveForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      showPassword: false,
      rememberMe: [false],
    });
  }

  ngOnInit() {
    this.authSubscription = this.authService
      .getAuthState()
      .pipe(
        take(1),
        distinctUntilChanged(),
      )
      .subscribe(auth => {
        if (auth) {
          this.router.navigate(['/']);
        }
      });

    this.reactiveForm.get('showPassword').valueChanges.subscribe(val => {
      this.showFormPassword = val;
    });
  }

  onSubmit(formName) {
    if (formName.valid) {
      this.loginMock(formName.value.username, formName.value.password);
    } else {
      for (const inner in formName.controls) {
        if (formName.controls.hasOwnProperty(inner)) {
          formName.get(inner).markAsTouched();
        }
      }
    }
  }

  loginFirebase() {
    this.authService.login();
  }

  loginMock(username, password) {
    this.authService.login(username, password);
  }

  get username() {
    return this.reactiveForm.get('username');
  }

  get password() {
    return this.reactiveForm.get('password');
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
