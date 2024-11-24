import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user = signal<User | null>(null);
  userInfo: User | null = null;
  accountType = signal<string | undefined>('');
  userName: string | undefined;
  accountProfileName: string | undefined;
  private apiUrl = environment.apiUrl + '/auth';

  private readonly auth = inject(LoginService);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly getAccountIdService = inject(GetAccountIdService);

  constructor() {
    const token = localStorage.getItem(environment.TOKEN_NAME);
    if (token) {
      this.userInfo = this.getUser(token);
      this.user.set(this.userInfo);
      this.accountType.set(this.userInfo?.account_type);
      console.log('User Info:', this.userInfo);
      this._isLoggedIn$.next(true);
    }
  }

  setUserRole(role: string): void {
    this.userRoleSubject.next(role);
  }

  getUserRole(): string | null {
    return this.userRoleSubject.value;
  }

  getUserInfo(): User | null {
    return this.userInfo;
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-email`, { token }).pipe(
      catchError((error) => {
        console.error('Email verification failed:', error);
        return throwError(error);
      })
    );
  }

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
        this.accountProfileName = response.accountProfileName;
        this.getAccountIdService.setAccountProfileName(response.accountProfileId, response.accountProfileName);
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }

  register(name: string, contactNo: string, address: string, email: string, password: string, confirmPassword: string): Observable<any> {
    const user = { name, contactNo, address, email, password, confirmPassword };
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap((response: any) => {
        if (response.message) {
          console.log(response.message);
          // Handle the response message, e.g., show a success notification
        } else {
          console.error('Unexpected response:', response);
        }
      }),
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(error);
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email }).pipe(
      tap((response: any) => {
        console.log('Password recovery email sent:', response);
      }),
      catchError((error) => {
        console.error('Password recovery failed:', error);
        return throwError(error);
      })
    );
  }

  resetPassword(newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { newPassword }).pipe(
      tap((response: any) => {
        console.log('Password reset:', response);
      }),
      catchError((error) => {
        console.error('Password reset failed:', error);
        return throwError(error);
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