import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LoginCredentials } from '../models/login-credentials.';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private isAuthenticated = false;
  private userRole: string | null = null;
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user = signal<User | null>(null);
  userInfo: User | null = null;
  accountType = signal<String | undefined>('');

  private readonly auth = inject(LoginService);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  // Mock login function; replace with actual backend integration
  login(email: string, password: string) {
    return this.auth.login(email, password).pipe(
      tap((response: any) => {
        if (!response.access_token) {
          return;
        }
        this._isLoggedIn$.next(true);
        localStorage.setItem(environment.TOKEN_NAME, response.access_token);
        this.userInfo = this.getUser(response.access_token);
        this.user.set(this.getUser(response.access_token));
      })
    );
  }

  register(name: string, email: string, password: string, confirmPassword: string) {
    return this.auth.register(name, email, password, confirmPassword).pipe(
      tap((response: any) => {
        if (!response.access_token) {
          return;
        }
        this._isLoggedIn$.next(true);
        localStorage.setItem(environment.TOKEN_NAME, response.access_token);
        this.userInfo = this.getUser(response.access_token);
        this.user.set(this.getUser(response.access_token));
      })
    );
  }
  
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  isLogin() {
    return this.isLoggedIn$;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  logout() {
    this.isAuthenticated = false;
    this.userRole = null;
    this._isLoggedIn$.next(false);
        localStorage.removeItem(environment.TOKEN_NAME);
        this.router.navigate([''])
  }

  public getUser(token: string): User | null {
    if (!token) {
      this.router.navigate(['']);
      return null;
    }
    return JSON.parse(atob(token.split('.')[1])) as User;
  }
}
