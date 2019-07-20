import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinStatus: BehaviorSubject<boolean>;

  constructor() {
    this.spinStatus = new BehaviorSubject(true);
  }

  setSpinnerState(state) {
    this.spinStatus.next(state);
  }

  getSpinnerState(): Observable<boolean> {
    return this.spinStatus.asObservable();
  }
}
