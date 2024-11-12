import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, Subscription, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../../../snackbar/snackbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
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

        <div class="flex justify-between mb-4">
          <!-- Back Button on the Left -->
          <button
            *ngIf="currentSection === 2"
            (click)="prevSection()"
            class="flex items-center text-green-700 text-sm font-semibold hover:text-green-500 underline transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          <!-- Next Button on the Right -->
          <button
            *ngIf="currentSection === 1"
            (click)="nextSection()"
            class="flex items-center text-green-700 text-sm font-semibold hover:text-green-500 underline transition duration-200 ml-auto"
          >
            <span class="mr-1">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <h2
          class="text-4xl font-extrabold text-green-700 text-center mt-16 mb-8"
        >
          Create Your Account
        </h2>

        <div *ngIf="currentSection === 1">
          <form [formGroup]="registerForm">
            <!-- Full Name Input -->
            <div class="mb-4">
              <label for="name" class="block text-green-900 font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                formControlName="name"
                class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="Enter your full name"
              />
              <mat-error
                *ngIf="
                  registerForm.get('name')?.hasError('required') &&
                  registerForm.get('name')?.touched
                "
              >
                Name is required
              </mat-error>
            </div>

            <!-- Contact Number Input -->
            <div class="mb-4">
              <label
                for="contactNo"
                class="block text-green-900 font-semibold mb-1"
                >Contact Number</label
              >
              <input
                type="tel"
                id="contactNo"
                formControlName="contactNo"
                class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="Enter your contact number"
              />
              <mat-error
                *ngIf="
                  registerForm.get('contactNo')?.hasError('required') &&
                  registerForm.get('contactNo')?.touched
                "
              >
                Contact number is required</mat-error
              >
              <mat-error
                *ngIf="
                  registerForm.get('contactNo')?.hasError('pattern') &&
                  registerForm.get('contactNo')?.touched
                "
                >Invalid contact number</mat-error
              >
            </div>

            <!-- Address Input -->
            <div class="mb-4">
              <label
                for="address"
                class="block text-green-900 font-semibold mb-1"
                >Address</label
              >
              <input
                type="text"
                id="address"
                formControlName="address"
                class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="Enter your address"
              />
              <mat-error
                *ngIf="
                  registerForm.get('address')?.hasError('required') &&
                  registerForm.get('address')?.touched
                "
                >Address is required</mat-error
              >
            </div>

            <button
              (click)="nextSection()"
              class="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition"
            >
              Next
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
                Sign up with Google
              </button>
              <button
                class="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-white hover:bg-gray-100 transition"
                style="background-color: #1877F2;"
              >
                <i class="fab fa-facebook-square text-2xl mr-2"></i>
                Sign up with Facebook
              </button>
            </div>

            <p class="text-center text-green-900 mt-4">
              Already have an account?
              <button
                [routerLink]="['/auth/login']"
                class="text-green-700 font-bold hover:text-green-500"
              >
                Log In
              </button>
            </p>
          </form>
        </div>

        <div *ngIf="currentSection === 2">
          <form [formGroup]="registerForm">
            <!-- Email Input -->
            <div class="mb-4">
              <label for="email" class="block text-green-900 font-semibold mb-1"
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
                  registerForm.get('email')?.hasError('required') &&
                  registerForm.get('email')?.touched
                "
              >
                Email is required</mat-error
              >
              <mat-error
                *ngIf="
                  registerForm.get('email')?.hasError('email') &&
                  registerForm.get('email')?.touched
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
              <mat-error *ngIf="registerForm.get('password')?.touched">
                <ng-container
                  *ngIf="registerForm.get('password')?.hasError('required')"
                >
                  Password is required.
                </ng-container>
                <ng-container
                  *ngIf="registerForm.get('password')?.hasError('minlength')"
                >
                  Password must be at least 8 characters.
                </ng-container>
                <ng-container
                  *ngIf="registerForm.get('password')?.hasError('pattern')"
                >
                  Password must contain at least one number, one uppercase
                  letter, and one lowercase letter.
                </ng-container>
                <ng-container
                  *ngIf="
                    registerForm.get('password')?.hasError('confirmPassword')
                  "
                >
                  Passwords do not match.
                </ng-container>
              </mat-error>
            </div>
            <!-- Confirm Password Input -->
            <div class="relative mb-6">
              <label
                for="confirmPassword"
                class="block text-green-900 font-semibold mb-2"
                >Confirm Password</label
              >
              <div class="relative">
                <input
                  [type]="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  formControlName="confirmPassword"
                  class="w-full p-4 pr-14 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="Confirm your password"
                />
                <!-- Password Toggle Button -->
                <button
                  type="button"
                  (click)="toggleConfirmPasswordVisibility()"
                  class="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer text-gray-400 focus:outline-none"
                  style="top: 50%; transform: translateY(-50%);"
                >
                  @if (showConfirmPassword) {
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
                  } @else {<svg
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
                  }
                </button>
              </div>
              <mat-error *ngIf="registerForm.get('confirmPassword')?.touched">
                <ng-container
                  *ngIf="
                    registerForm.get('confirmPassword')?.hasError('required')
                  "
                >
                  Confirm password is required.
                </ng-container>
                <ng-container
                  *ngIf="
                    registerForm.get('confirmPassword')?.hasError('minlength')
                  "
                >
                  Password must be at least 8 characters.
                </ng-container>
                <ng-container
                  *ngIf="
                    registerForm.get('confirmPassword')?.hasError('pattern')
                  "
                >
                  Password must contain at least one number, one uppercase
                  letter, and one lowercase letter.
                </ng-container>
                <ng-container
                  *ngIf="
                    registerForm.get('confirmPassword')?.hasError('mustMatch')
                  "
                >
                  Passwords do not match.
                </ng-container>
              </mat-error>
            </div>

            <button
              (click)="onRegister()"
              class="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition"
            >
              Register
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
                Sign up with Google
              </button>
              <button
                class="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-white hover:bg-gray-100 transition"
                style="background-color: #1877F2;"
              >
                <i class="fab fa-facebook-square text-2xl mr-2"></i>
                Sign up with Facebook
              </button>
            </div>

            <p class="text-center text-green-900 mt-4">
              Already have an account?
              <button
                [routerLink]="['/auth/login']"
                class="text-green-700 font-bold hover:text-green-500"
              >
                Log In
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit,OnDestroy {
  currentSection = 1;
  registerForm!: FormGroup;
  registerError = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  authService = inject(AuthService);
  router = inject(Router);
  registerFormSubscription = new Subscription();
  snackBar = inject(MatSnackBar);

  fb = inject(FormBuilder);
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        contactNo: [
          '',
          [Validators.required, Validators.pattern('^(09|\\+639)\\d{9}$')],
        ],
        address: ['', Validators.required],
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
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$'
            ),
          ],
        ],
      },
      {
        validator: this.MustMatch('password', 'confirmPassword'),
      }
    );
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // Method to go to the next section
  nextSection() {
    if (this.currentSection < 3) {
      this.currentSection++;
    }
  }

  // Method to go back to the previous section
  prevSection() {
    if (this.currentSection > 1) {
      this.currentSection--;
    }
  }

  onRegister() {
    console.log('Register form:', this.registerForm.value);
    if (this.registerForm.valid) {
      this.registerFormSubscription.add(
        this.authService
          .register(
            this.registerForm.value.name,
            this.registerForm.value.contactNo,
            this.registerForm.value.address,
            this.registerForm.value.email,
            this.registerForm.value.password,
            this.registerForm.value.confirmPassword
          )
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                this.showSnackbar('Invalid Credentials', 'error');
              } else if (error.status === 400) {
                this.showSnackbar('Email is already registered. Use a different email.', 'error');
              } else {
                this.showSnackbar('An error occurred. Please try again.', 'error');
              }
              return throwError(error);
            })
          )
          .subscribe((response) => {
            if (response?.message === 'Account created successfully. Please log in.') {
              this.showSnackbar('Registration successful. Please log in.', 'success');
              this.router.navigate(['auth/login']);
            } else {
              this.showSnackbar('An error occurred. Please try again.', 'error');
            }
          })
      );
    } else {
      this.showSnackbar('Please fill in all required fields.', 'error');
    }
  }

  showSnackbar(message: string, type: 'success' | 'error'): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message,
        icon: type === 'success' ? 'check_circle' : 'error'
      },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }

  ngOnDestroy() {
    this.registerFormSubscription.unsubscribe();
  }
}
