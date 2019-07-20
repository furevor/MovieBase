import { Observable } from 'rxjs';

export interface BaseAuth {
  login(username?, password?);
  logout();
  getAuthState(): Observable<boolean>;
}
