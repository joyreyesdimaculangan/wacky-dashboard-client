import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastNotificationsComponent } from '../../../toastNotifications/toastNotifications.component';
import { MatFormField } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { EnterSubmitDirective } from '../../../../enter-submit.directive';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, EnterSubmitDirective],
  template: ` <div
    class="min-h-screen relative flex items-center justify-center bg-cover bg-center"
    style="background-image: url('assets/images/Food House.jpg');"
  >
    <!-- Overlay with Green Opacity -->
    <div class="absolute inset-0 bg-green-200 opacity-50"></div>

    <!-- Password Recovery Card -->
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
        Password Reset
      </h2>
      <form [formGroup]="resetPasswordForm" (enterSubmit)="onSubmit()"
      appEnterSubmit>
        <div class="relative mb-6">
          <label
            for="newPassword"
            class="block text-green-900 font-semibold mb-2"
            >New Password</label
          >
          <div class="relative">
            <input
              [type]="showNewPassword ? 'text' : 'password'"
              id="newPassword"
              formControlName="newPassword"
              class="w-full p-4 pr-12 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your new password"
            />
            <button
              type="button"
              (click)="toggleNewPasswordVisibility()"
              class="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer text-gray-400 focus:outline-none"
              style="top: 50%; transform: translateY(-50%);"
            >
              <ng-container *ngIf="showNewPassword; else hideNewPassword">
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
              </ng-container>
              <ng-template #hideNewPassword>
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
          <mat-error *ngIf="resetPasswordForm.get('newPassword')?.touched">
            <ng-container
              *ngIf="resetPasswordForm.get('newPassword')?.hasError('required')"
              >New Password is required.</ng-container
            >
            <ng-container
              *ngIf="
                resetPasswordForm.get('newPassword')?.hasError('minlength')
              "
              >Password must be at least 8 characters.</ng-container
            >
            <ng-container
              *ngIf="resetPasswordForm.get('newPassword')?.hasError('pattern')"
              >Password must contain at least one number, one uppercase letter,
              and one lowercase letter.</ng-container
            >
            <ng-container
              *ngIf="
                resetPasswordForm
                  .get('newPassword')
                  ?.hasError('confirmPassword')
              "
              >Passwords do not match.</ng-container
            >
          </mat-error>
        </div>

        <button
          type="submit"
          (click)="onSubmit()"
          (enterSubmit)="onSubmit()"
          class="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  </div>`,
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  showNewPassword = false;
  showConfirmPassword = false;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastNotifications = inject(ToastNotificationsComponent);

  constructor() {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
    });
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      this.authService.resetPassword(newPassword).subscribe({
        next: (): void => {
          this.toastNotifications.showSuccess(
            'Password reset successfully.',
            'Success'
          );
          this.router.navigate(['/auth/login']);
        },
        error: (error: any): void => {
          this.toastNotifications.showError(
            'Failed to reset password. Please try again.',
            'Error'
          );
          console.error('Password reset error:', error);
        },
      });
    } else {
      this.toastNotifications.showWarning(
        'Please fill in all required fields.',
        'Warning'
      );
    }
  }
}
