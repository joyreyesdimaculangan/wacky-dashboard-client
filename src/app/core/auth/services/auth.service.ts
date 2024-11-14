import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LoginCredentials } from '../models/login-credentials.';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AccountProfile, User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { GetAccountIdService } from '../../../features/customer/reservation-form/getAccountId.service';

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
  userName: string | undefined;

  private readonly auth = inject(LoginService);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly getAccountIdService = inject(GetAccountIdService);

  setUserRole(role: string): void {
    this.userRoleSubject.next(role);
  }

  getUserRole(): string | null {
    return this.userRoleSubject.value;
  }

  getUserInfo(): User | null {
    return this.userInfo;
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
        this.getAccountIdService.setAccountProfileName(response.accountProfileId, response.accountProfileName);
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
    return this._isLoggedIn$.value;
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
  }

  public isAdmin(): boolean {
    return this.userInfo?.account_type === 'admin';
  }

  public isCustomer(): boolean {
    return this.userInfo?.account_type === 'customer';
  }

  public getUser(token: string): User | null {
    if (!token) {
      this.router.navigate(['/home']);
      return null;
    }
    return JSON.parse(atob(token.split('.')[1])) as User;
  }
}
