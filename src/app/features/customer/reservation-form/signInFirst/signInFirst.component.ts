import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { catchError, Subscription, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarComponent } from '../../../../snackbar/snackbar.component';
import { GetAccountIdService } from '../getAccountId.service';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sign-in-first',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
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
          Ready to make your reservations?
        </h2>
        <h4
          class="text-2xl font-bold text-black-100 text-center"
        >
          Sign In First
        </h4>

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
                  Password must contain at least one number, one uppercase
                  letter, and one lowercase letter.
                </ng-container>
                <ng-container
                  *ngIf="
                    loginForm.get('password')?.hasError('confirmPassword')
                  "
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
            <button
              class="text-green-700 hover:text-green-500 font-semibold"
              >Forgot Password?</button
            >
          </div>

          <!-- Login Button -->
          <button
            (click)="login()"
            class="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Log In
          </button>

          <!-- Divider with "or" Text -->
          <div class="flex items-center my-6">
              <div class="flex-grow border-t border-gray-300"></div>
              <span class="px-4 text-gray-500">or</span>
              <div class="flex-grow border-t border-gray-300"></div>
            </div>

            <!-- Social Sign-in Options -->
            <div class="flex justify-center gap-4 mb-6">
              <button
                class="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-white hover:bg-gray-100 transition"
                style="background-color: #4285F4;"
              >
                <i class="fab fa-google text-2xl mr-2"></i>
                Log in with Google
              </button>
              <button
                class="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-white hover:bg-gray-100 transition"
                style="background-color: #1877F2;"
              >
                <i class="fab fa-facebook-square text-2xl mr-2"></i>
                Log in with Facebook
              </button>
            </div>

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
  styleUrl: './signInFirst.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFirstComponent implements OnInit {
  private readonly getAccountProfileId = inject(GetAccountIdService);
  loginForm!: FormGroup;
  loginError = '';
  showPassword: boolean = false;

  authService = inject(AuthService);
  router = inject(Router);
  loginSubscription = new Subscription();
  snackBar = inject(MatSnackBar);

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
  }

  login() {
    this.loginSubscription.add(
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              if (error.error.message === 'Incorrect password') {
                this.showSnackbar(
                  'Incorrect password. Please try again.',
                  'error'
                );
              } else {
                this.showSnackbar('Invalid Credentials', 'error');
              }
            } else {
              this.showSnackbar(
                'An error occurred. Please try again later.',
                'error'
              );
            }
            return throwError(error);
          })
        )
        .subscribe((response: any) => {
          if (response['status'] == 200) {
            console.log('Account Profile Name:', this.authService.accountProfileName);
            if (this.authService.user()?.account_type === 'admin') {
              this.router.navigate(['admin/dashboard']);
            } else {
              this.router.navigate(['customer/reservations']);
            }
          } else if (
            response['status'] == 401 &&
            response['message'] === 'Incorrect password'
          ) {
            this.showSnackbar('Incorrect password. Please try again.', 'error');
          }
        })
    );
  }

  showSnackbar(message: string, type: 'success' | 'error'): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message,
        icon: type === 'success' ? 'check_circle' : 'error',
      },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }
}
