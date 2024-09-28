import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly http = inject(HttpClient)
  private URL = environment.baseURL

  public login( email: string, password: string ) {
    return this.http.post(`${this.URL}/auth/login`, { email: email, password: password })
  }
}
