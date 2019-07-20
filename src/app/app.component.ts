import { Component } from '@angular/core';
import { SpinnerService } from './modules/auth/services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MoviesBase';
  hideSpinner$: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.hideSpinner$ = spinnerService.getSpinnerState();
  }
}
