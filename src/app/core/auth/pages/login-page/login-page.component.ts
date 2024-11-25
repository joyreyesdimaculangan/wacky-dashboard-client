import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, Subscription, throwError } from 'rxjs';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetAccountIdService } from '../../../../features/customer/reservation-form/getAccountId.service';
import { ToastNotificationsComponent } from '../../../toastNotifications/toastNotifications.component';
import { LoadingSpinnerService } from '../../../../features/loadingFunction/loadingSpinner.service';
import { LoadingFunctionComponent } from "../../../../features/loadingFunction/loadingFunction.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    LoadingFunctionComponent
],
  template: `
    <div
      class="min-h-screen relative flex items-center justify-center bg-cover bg-center"
      style="background-image: url('assets/images/Food House.jpg')"
    >
      <!-- Overlay with Green Opacity -->
      <div class="absolute inset-0 bg-green-200 opacity-50"></div>

      <!-- Login Card -->
      <div class="relative bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
        <!-- Logo -->
        <div class="absolute top-[-3.5rem] left-1/2 transform -translate-x-1/2">
          <img
            src="assets/images/Wacky's Logo.png"
            alt="Logo"
            class="h-28 w-28"
          />
        </div>

        <h2
          class="text-4xl font-extrabold text-green-700 text-center mt-16 mb-8"
        >
          Welcome Back
        </h2>

        <form [formGroup]="loginForm">
          <!-- Email Input -->
          <div class="mb-6">
            <label for="email" class="block text-green-900 font-semibold mb-2"
              >Email Address</label
            >
            <input
              type="email"
              id="email"
              formControlName="email"
              class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your email"
            />
            <mat-error
              *ngIf="
                loginForm.get('email')?.hasError('required') &&
                loginForm.get('email')?.touched
              "
            >
              Email is required</mat-error
            >
            <mat-error
              *ngIf="
                loginForm.get('email')?.hasError('email') &&
                loginForm.get('email')?.touched
              "
            >
              Invalid email</mat-error
            >
          </div>

          <!-- Password Input -->
          <div class="relative mb-6">
            <label
              for="password"
              class="block text-green-900 font-semibold mb-2"
              >Password</label
            >
            <div class="relative">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                formControlName="password"
                class="w-full p-4 pr-12 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="Create a password"
              />
              <button
                type="button"
                (click)="togglePasswordVisibility()"
                class="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer text-gray-400 focus:outline-none"
                style="top: 50%; transform: translateY(-50%);"
              >
                <ng-container *ngIf="showPassword; else hidePassword">
                  <svg
                    class="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                    ></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </ng-container>
                <ng-template #hidePassword>
                  <svg
                    class="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                    <path
                      d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                    ></path>
                    <path
                      d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                    ></path>
                    <line x1="2" x2="22" y1="2" y2="22"></line>
                  </svg>
                </ng-template>
              </button>
            </div>
            <mat-error *ngIf="loginForm.get('password')?.touched">
              <ng-container
                *ngIf="loginForm.get('password')?.hasError('required')"
              >
                Password is required.
              </ng-container>
              <ng-container
                *ngIf="loginForm.get('password')?.hasError('minlength')"
              >
                Password must be at least 8 characters.
              </ng-container>
              <ng-container
                *ngIf="loginForm.get('password')?.hasError('pattern')"
              >
                Password must contain at least one number, one uppercase letter,
                and one lowercase letter.
              </ng-container>
              <ng-container
                *ngIf="loginForm.get('password')?.hasError('confirmPassword')"
              >
                Passwords do not match.
              </ng-container>
            </mat-error>
          </div>

          <!-- Remember Me and Forgot Password -->
          <div class="flex items-center justify-between mb-8">
            <label class="inline-flex items-center text-green-900">
              <input
                type="checkbox"
                class="form-checkbox text-green-600 focus:ring-green-500"
              />
              <span class="ml-2">Remember Me</span>
            </label>
            <button (click)="goToPasswordReset()" class="text-green-700 hover:text-green-500 font-semibold">
              Forgot Password?
            </button>
          </div>

          <!-- Login Button -->
          <button
            (click)="login()"
            class="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition duration-300"
            [disabled]="loading$ | async"
          >
            <ng-container *ngIf="loading$ | async; else loginText">
              <app-loading-function [inline]="true"></app-loading-function>
            </ng-container>
            <ng-template #loginText>Log In</ng-template>
          </button>

          <!-- Sign Up Link -->
          <p class="text-center text-green-900 mt-8">
            Don't have an account?
            <button
              [routerLink]="['/auth/register']"
              class="text-green-700 hover:text-green-500 font-bold"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  `,
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly getAccountProfileId = inject(GetAccountIdService);
  @Input() inline: boolean = false;
  loginForm!: FormGroup;
  loginError = '';
  showPassword: boolean = false;

  authService = inject(AuthService);
  router = inject(Router);
  loginSubscription = new Subscription();
  toastNotification = inject(ToastNotificationsComponent);
  route = inject(ActivatedRoute);

  loadingService = inject(LoadingSpinnerService);
  loading$ = this.loadingService.loading$;

  fb = inject(FormBuilder);
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?:.*[!@#$%^&*])?[a-zA-Z0-9!@#$%^&*]*$'
          ),
        ],
      ],
    });

    // const token = this.route.snapshot.queryParamMap.get('token');
    // if (token) {
    //   this.loadingService.show();
    //   this.authService.verifyEmail(token).subscribe({
    //     next: () => {
    //       this.loadingService.hide();
    //       this.toastNotification.showSuccess('Email verified successfully', 'Success');
    //       this.router.navigate(['/home']);
    //     },
    //     error: () => {
    //       this.loadingService.hide();
    //       this.toastNotification.showError('Email verification failed', 'Error');
    //     }
    //   });
    // } else {
    //   this.toastNotification.showError('Invalid verification token', 'Error');
    //   this.router.navigate(['/home']);
    // }
  }

  goToPasswordReset() {
    this.router.navigate(['auth/password-recovery']);
  }

  login() {
    if (this.loginForm.valid) {
      this.loadingService.show();
      this.loginSubscription.add(
        this.authService
          .login(this.loginForm.value.email, this.loginForm.value.password)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              this.loadingService.hide();
              if (error.status === 401) {
                if (error.error.message === 'Incorrect password') {
                  this.toastNotification.showError(
                    'Incorrect password. Please try again.',
                    'Error'
                  );
                } else {
                  this.toastNotification.showError(
                    'Invalid Credentials',
                    'Error'
                  );
                }
              } else {
                this.toastNotification.showError(
                  'An error occurred. Please try again later.',
                  'Error'
                );
              }
              return throwError(error);
            })
          )
          .subscribe((response: any) => {
            this.loadingService.hide();
            if (response['status'] == 200) {
              console.log(
                'Account Profile Name:',
                this.authService.accountProfileName
              );
              this.toastNotification.showSuccess(
                'Login successful.',
                'Success'
              );
              if (this.authService.user()?.account_type === 'admin') {
                this.router.navigate(['admin/dashboard']);
              } else {
                this.router.navigate(['customer/home']);
              }
            } else if (
              response['status'] == 401 &&
              response['message'] === 'Incorrect password'
            ) {
              this.toastNotification.showError(
                'Incorrect password. Please try again.',
                'Error'
              );
            }
          })
      );
    } else {
      this.toastNotification.showWarning('Invalid Credentials', 'Error');
    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
