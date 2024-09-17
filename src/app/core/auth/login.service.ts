import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);

  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.baseURL}/auth/login`, { email: email, password: password });
  }

}
