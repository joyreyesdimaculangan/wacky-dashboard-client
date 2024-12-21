import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastNotificationsComponent } from '../../../toastNotifications/toastNotifications.component';

@Component({
  standalone: true,
  selector: 'app-password-recovery',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
  <div
      class="min-h-[100dvh] relative flex items-center justify-center bg-cover bg-center p-[clamp(1rem,3vw,2rem)]"
      style="background-image: url('assets/images/Food House.jpg')"
    >
    <div class="absolute inset-0 bg-green-200 opacity-50"></div>

      <div
        class="relative bg-white shadow-xl rounded-lg p-[clamp(1rem,5vw,2rem)] w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] max-w-lg mx-auto"
      >
        <div
          class="absolute top-[-2rem] sm:top-[-2.5rem] md:top-[-3rem] left-1/2 transform -translate-x-1/2"
        >
          <img
            src="assets/images/Wacky's Logo.png"
            alt="Logo"
            class="h-[clamp(4rem,8vw,7rem)] w-[clamp(4rem,8vw,7rem)]"
          />
        </div>

        <h2
          class="text-[clamp(1.5rem,5vw,2.5rem)] font-extrabold text-green-700 text-center mt-[clamp(2rem,6vw,4rem)] mb-[clamp(1rem,3vw,2rem)]"
        >
        Password Recovery
      </h2>

      <!-- Email Input -->
      <form [formGroup]="passwordRecoveryForm">
      <div class="mb-6">
        <label 
          for="email" 
          class="block text-[clamp(0.875rem,2vw,1rem)] text-green-900 font-semibold mb-[clamp(0.25rem,1vw,0.5rem)]"
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

      <!-- Recovery Button -->
      <button
        (click)="onSubmit()"
        class="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition duration-300"
        type="submit"
      >
        Send Recovery Link
      </button>

      <!-- Login Link -->
      <p class="text-center text-green-900 text-[clamp(0.875rem,2vw,1rem)] mt-[clamp(1rem,4vw,2rem)]">
        Remember your password?
        <button
          (click) = "goToLogin()"
          class="text-green-700 font-bold hover:text-green-500 text-[clamp(0.875rem,2vw,1rem)] ml-[clamp(0.5rem,1vw,1rem)]"
          >Log In</button
        >
      </p>
      </form>
    </div>
  </div> `,
  styleUrl: './password-recovery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordRecoveryComponent {
  passwordRecoveryForm: FormGroup;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastNotifications = inject(ToastNotificationsComponent);


  constructor() {
    this.passwordRecoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  onSubmit(): void {
    if (this.passwordRecoveryForm.valid) {
      const email = this.passwordRecoveryForm.value.email;
      this.authService.forgotPassword(email).subscribe({
        next: () => {
          this.toastNotifications.showSuccess('Password recovery email sent. Please check your email.', 'Success');
        },
        error: (error) => {
          this.toastNotifications.showError('Failed to send password recovery email. Please try again.', 'Error');
          console.error('Password recovery error:', error);
        }
      });
    } else {
      this.toastNotifications.showWarning('Please enter a valid email address.', 'Warning');
    }
  }
}
