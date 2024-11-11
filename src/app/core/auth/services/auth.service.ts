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
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();
  private isAuthenticated = false;
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user = signal<User | null>(null);
  userInfo: User | null = null;
  accountType = signal<String | undefined>('');

  private readonly auth = inject(LoginService);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  setUserRole(role: string): void {
    this.userRoleSubject.next(role);
  }

  getUserRole(): string | null {
    return this.userRoleSubject.value;
  }

  // Mock login function; replace with actual backend integration
  login(email: string, password: string): Observable<any> {
    return this.auth.login(email, password).pipe(
      tap((response: any) => {
        if (!response.access_token) {
          return;
        }
        this._isLoggedIn$.next(true);
        localStorage.setItem(environment.TOKEN_NAME, response.access_token);
        this.userInfo = this.getUser(response.access_token);
        this.user.set(this.userInfo);
        this.accountType.set(this.userInfo?.account_type);
      })
    );
  }

  register(name: string, contactNo: string, address: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.auth.register(name, contactNo, address, email, password, confirmPassword).pipe(
      tap((response: any) => {
        if (!response.access_token) {
          return;
        }
        this._isLoggedIn$.next(true);
        localStorage.setItem(environment.TOKEN_NAME, response.access_token);
        this.userInfo = this.getUser(response.access_token);
        this.user.set(this.userInfo);
        this.accountType.set(this.userInfo?.account_type);
      })
    );
  }
  
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  isLogin() {
    return this.isLoggedIn$;
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem(environment.TOKEN_NAME);
    this.userInfo = null;
    this.user.set(null);
    this.accountType.set(undefined);
    this.router.navigate(['/auth/login']);
  }

  public isAdmin(): boolean {
    return this.userInfo?.account_type === 'admin';
  }

  public getUser(token: string): User | null {
    if (!token) {
      this.router.navigate(['/auth/login']);
      return null;
    }
    return JSON.parse(atob(token.split('.')[1])) as User;
  }
}
