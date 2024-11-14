import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    class="flex items-center justify-center min-h-screen bg-gray-100"
  >
    <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-semibold text-center text-green-600 mb-6">
        Verify Your Email
      </h2>
      <p class="text-gray-700 text-center mb-4">
        A verification link has been sent to your email. Please check your inbox
        and click on the link to verify your email address.
      </p>
      <div class="flex items-center justify-center mb-4">
        <span
          class="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center"
        >
          <i class="material-icons">email</i>
        </span>
      </div>
      <button
        (click)="resendVerificationEmail()"
        class="w-full py-2 mt-4 bg-green-600 text-white font-semibold rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
      >
        Resend Verification Email
      </button>
    </div>
  </div> `,
  styleUrl: './email-verification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailVerificationComponent {
  resendVerificationEmail(): void {
    // Logic to trigger an email resend
    console.log('Resending verification email...');
    // Implement API call or service method to resend verification email
  }
}
