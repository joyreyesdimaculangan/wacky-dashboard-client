import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastNotificationsComponent } from '../../../toastNotifications/toastNotifications.component';

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
    </div>
  </div> `,
  styleUrl: './email-verification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailVerificationComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private router = inject(Router);
  toastNotifications = inject(ToastNotificationsComponent);

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.authService.verifyEmail(token).subscribe({
        next: () => {
          this.toastNotifications.showSuccess(
            'Email verified successfully. You can now log in.',
            'Success'
          );
          this.router.navigate(['/auth/login']);
        },
        error: () => {
          this.toastNotifications.showError(
            'Email verification failed. Please try again.',
            'Error'
          );
          this.router.navigate(['/auth/register']);
        },
      });
    } else {
      this.toastNotifications.showError('Invalid verification link.', 'Error');
      this.router.navigate(['/auth/register']);
    }
  }
}
