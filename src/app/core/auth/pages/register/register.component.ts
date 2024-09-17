import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  template: `<div 
    class="min-h-screen relative flex items-center justify-center bg-cover bg-center" 
    style="background-image: url('assets/images/Food House.jpg');"
  >
    <!-- Overlay with Green Opacity -->
    <div class="absolute inset-0 bg-green-200 opacity-50"></div>

    <!-- Registration Card -->
    <div class="relative bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
        <!-- Logo -->
        <div class="absolute top-[-3.5rem] left-1/2 transform -translate-x-1/2">
          <img 
            src="assets/images/Wacky's Logo.png" 
            alt="Logo" 
            class="h-28 w-28"
          />
        </div>

        <h2 class="text-4xl font-extrabold text-green-700 text-center mt-16 mb-8">
          Create Account
        </h2>

        <!-- Name Input -->
        <div class="mb-6">
          <label for="name" class="block text-green-900 font-semibold mb-2"
            >Full Name</label
          >
          <input 
            type="text" 
            id="name" 
            class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
            placeholder="Enter your full name"
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
            class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
            placeholder="Enter your email"
          />
        </div>

        <!-- Password Input -->
        <div class="relative mb-6">
          <label for="password" class="block text-green-900 font-semibold mb-2"
            >Password</label
          >
          <input
            [type]="showPassword ? 'text' : 'password'"
            id="password"
            class="w-full p-4 pr-14 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Create a password"
          />
          <!-- Password Toggle Button -->
          <button
            type="button"
            (click)="togglePasswordVisibility()"
            class="absolute inset-y-0 right-0 flex items-center px-4 mx-2 mt-8 cursor-pointer text-gray-400 rounded-r-lg focus:outline-none"
          >
            @if (showPassword) {
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

        <!-- Confirm Password Input -->
        <div class="relative mb-6">
            <label for="password" class="block text-green-900 font-semibold mb-2"
              >Confirm Password</label
            >
            <input
              [type]="showConfirmPassword ? 'text' : 'password'"
              id="confirm-password"
              class="w-full p-4 pr-14 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Confirm password"
            />
            <!-- Password Toggle Button -->
            <button
              type="button"
              (click)="toggleConfirmPasswordVisibility()"
              class="absolute inset-y-0 right-0 flex items-center px-4 mx-2 mt-8 cursor-pointer text-gray-400 rounded-r-lg focus:outline-none"
            >
            @if (showConfirmPassword) {
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

        <!-- Register Button -->
        <button 
            (click)="onRegister()"
            class="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition duration-300">Register</button>

        <!-- Login Link -->
        <p class="text-center text-green-900 mt-8">Already have an account? <a href="#" class="text-green-700 hover:text-green-500 font-bold">Log In</a></p>
    </div>
  </div>
  `,
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  loginError = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  authService = inject(AuthService);
  router = inject(Router);

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onRegister(): void {
    const success = this.authService.login(this.username, this.password);
    if (success) {
      const role = this.authService.getUserRole();
      if (role === 'admin') {
        this.router.navigate(['/login']);
      } else if (role === 'customer') {
        this.router.navigate(['/login']);
      }
    } else {
      this.loginError = 'Invalid username or password';
    }
  }
}