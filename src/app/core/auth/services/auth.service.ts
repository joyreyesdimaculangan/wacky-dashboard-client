import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = environment.TOKEN_NAME;
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user = signal<User | null>(null);
  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  private readonly router = inject(Router);
  private readonly login$ = inject(LoginService);
  
  constructor() {
    this._isLoggedIn$.next(!!this.token);
    this.user.set(this.getUser(this.token));
  }

  hasRole(role: string): boolean {
    return this.user()?.account_type === role;
  }

  login(email: string, password: string) {
    return this.login$.login(email, password).pipe(
      tap((response: any) => {
        if (!response.access_token) {
          return;
        }
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.access_token);
        this.user.set(this.getUser(response.access_token));
      })
    )
  }

  public getUser(token: string): User | null {
    if (!token) {
      this.router.navigate([''])
      return null
    }
    return JSON.parse(atob(token.split('.')[1])) as User;
  }
}


