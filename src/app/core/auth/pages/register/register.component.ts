import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, Subscription, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div
      class="min-h-screen relative flex items-center justify-center bg-cover bg-center"
      style="background-image: url('assets/images/Food House.jpg')"
    >
      <!-- Overlay with Green Opacity -->
      <div class="absolute inset-0 bg-green-200 opacity-50"></div>

      <!-- Registration Card -->
      <div
        class="relative bg-white shadow-xl rounded-lg p-8 w-full max-w-lg"
        style="height: 600px; overflow-y: auto;"
      >
        <!-- Logo -->
        <div class="mb-6 flex justify-center">
          <img
            src="assets/images/Wacky's Logo.png"
            alt="Logo"
            class="h-32 w-32"
          />
        </div>

        <h2 class="text-4xl font-extrabold text-green-700 text-center mb-8">
          Create Account
        </h2>

        <form [formGroup]="registerForm">
          <!-- Full Name Input -->
          <div class="mb-6">
            <label for="name" class="block text-green-900 font-semibold mb-2"
              >Full Name</label
            >
            <input
              type="text"
              id="name"
              formControlName="name"
              class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <!-- Contact Number Input -->
          <div class="mb-6">
            <label
              for="contactNo"
              class="block text-green-900 font-semibold mb-2"
              >Contact Number</label
            >
            <input
              type="tel"
              id="contactNo"
              formControlName="contactNo"
              class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your contact number"
            />
          </div>

          <!-- Address Input -->
          <div class="mb-6">
            <label for="address" class="block text-green-900 font-semibold mb-2"
              >Address</label
            >
            <input
              type="text"
              id="address"
              formControlName="address"
              class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your address"
            />
          </div>

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
          </div>

          <!-- Password Input -->
          <div class="relative mb-6">
            <label
              for="password"
              class="block text-green-900 font-semibold mb-2"
              >Password</label
            >
            <input
              [type]="showPassword ? 'text' : 'password'"
              id="password"
              formControlName="password"
              class="w-full p-4 pr-14 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Create a password"
            />
            <!-- Password Toggle Button -->
            <button
              type="button"
              (click)="togglePasswordVisibility()"
              class="absolute inset-y-0 right-0 flex items-center px-4 mx-2 mt-8 cursor-pointer text-gray-400 rounded-r-lg focus:outline-none"
            >
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>

          <!-- Confirm Password Input -->
          <div class="relative mb-6">
            <label
              for="confirmPassword"
              class="block text-green-900 font-semibold mb-2"
              >Confirm Password</label
            >
            <input
              [type]="showPassword ? 'text' : 'password'"
              id="confirmPassword"
              formControlName="confirmPassword"
              class="w-full p-4 pr-14 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Confirm your password"
            />
            <!-- Password Toggle Button -->
            <button
              type="button"
              (click)="togglePasswordVisibility()"
              class="absolute inset-y-0 right-0 flex items-center px-4 mx-2 mt-8 cursor-pointer text-gray-400 rounded-r-lg focus:outline-none"
            >
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
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
            <a
              href="#"
              class="text-green-700 hover:text-green-500 font-semibold"
              >Forgot Password?</a
            >
          </div>

          <!-- Register Button -->
          <button
            (click)="onRegister()"
            class="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Register
          </button>

          <!-- Login Link -->
          <p class="text-center text-green-900 mt-8">
            Already have an account?
            <button
              [routerLink]="['/auth/login']"
              class="text-green-700 hover:text-green-500 font-bold"
            >
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  `,
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnDestroy {
  registerForm!: FormGroup;
  registerError = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  authService = inject(AuthService);
  router = inject(Router);
  registerFormSubscription = new Subscription();

  fb = inject(FormBuilder);
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [''],
      contactNo: [''],
      address: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  onRegister() {
    console.log('Register form:', this.registerForm.value);
    if (this.registerForm.valid) {
      this.registerFormSubscription.add(
        this.authService
          .register(
            this.registerForm.value.name,
            this.registerForm.value.email,
            this.registerForm.value.password,
            this.registerForm.value.confirmPassword
          )
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                alert('Invalid Credentials');
              } else {
                alert('An error occurred. Please try again.');
              }
              return throwError(error);
            })
          )
          .subscribe((response) => {
            console.log('Response:', response); // Log the response for debugging
            if (
              response &&
              response.message ===
                'Account created successfully. Please log in.'
            ) {
              this.router.navigate(['auth/login']);
              console.log('Registration successful');
            } else {
              alert('An error occurred. Please try again.');
            }
          })
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }

  ngOnDestroy() {
    this.registerFormSubscription.unsubscribe();
  }
}
