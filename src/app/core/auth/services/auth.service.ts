import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountProfile, User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { GetAccountIdService } from '../../../features/customer/reservation-form/getAccountId.service';
import { ToastNotificationsComponent } from '../../toastNotifications/toastNotifications.component';

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
  accountProfileName = signal<string | undefined>('');
  private accountProfileId: string | null = null;
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
      this.accountProfileName.set(this.userInfo?.accountProfileName);
      this._isLoggedIn$.next(true);
    } else {
      this.loadUserInfoFromLocalStorage();
    }
  }

  // Method to get the account profile ID
  getAccountProfileID(): string | null {
    return this.accountProfileId;
  }

  // Method to set the account profile ID
  setAccountProfileID(id: string | null): void {
    this.accountProfileId = id;
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

  public checkEmailVerified(): boolean {
    return this.userInfo?.isEmailVerified ?? false;
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-email`, { token }).pipe(
      tap((response: any) => {
        if (response.success) {
          this.userInfo = { ...this.userInfo, isEmailVerified: true } as User;
          this.saveUserInfoToLocalStorage();
          this.user.set(this.userInfo);
        }
      }),
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
        this.accountProfileId = response.accountProfileId;
        this.getAccountIdService.setAccountProfileName(
          response.accountProfileId,
          response.accountProfileName
        );
        this.saveUserInfoToLocalStorage();
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }

  register(
    name: string,
    contactNo: string,
    address: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
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
    return this.http
      .post(`${this.apiUrl}/reset-password`, { newPassword })
      .pipe(
        tap((response: any) => {
          console.log('Password reset:', response);
        }),
        catchError((error) => {
          console.error('Password reset failed:', error);
          return throwError(error);
        })
      );
  }

  updateUserProfile(updatedProfile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-profile`, updatedProfile).pipe(
      tap((response: any) => {
        console.log('Profile updated successfully:', response);
      }),
      catchError((error) => {
        console.error('Profile update failed:', error);
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
    try {
      const token = localStorage.getItem(environment.TOKEN_NAME);
      if (token) {
        localStorage.removeItem(environment.TOKEN_NAME);
      }

      this._isLoggedIn$.next(false);
      this.userInfo = null;
      this.user.set(null);
      this.accountType.set(undefined);
      this.accountProfileId = null;
      //this.accountProfileName = null;
      this.accountProfileName.set(undefined);

      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
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

  private saveUserInfoToLocalStorage(): void {
    if (this.userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    }
  }

  private loadUserInfoFromLocalStorage(): void {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
      this.user.set(this.userInfo);
      this.accountType.set(this.userInfo?.account_type);
      this.accountProfileName.set(this.userInfo?.account?.accountProfileName);
      this._isLoggedIn$.next(true);
    }
  }
}
