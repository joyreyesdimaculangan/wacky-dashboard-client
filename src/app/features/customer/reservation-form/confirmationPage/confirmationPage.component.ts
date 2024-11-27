import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-confirmation-page',
  standalone: true,
  imports: [],
  template: ` <!-- Confirmation Section -->
    <div
      class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div
        (click)="logout()"
        class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg text-center"
      >
        <div class="flex flex-col items-center mb-6">
          <img
            src="assets/images/Wacky's Logo.png"
            alt="Restaurant Logo"
            class="mb-4"
            style="width: 150px; height: auto"
          />
          <h2 class="text-3xl font-bold mb-2 text-green-600">
            Reservation Submitted
          </h2>
        </div>
        <p class="text-lg text-gray-700 mb-6">
        Thank you for your reservation! Just wait for the confirmation that
          will be sent to your email account. Just make sure to pay almost half
          the price of the package within one week so that your reservation will not be
          canceled. We are looking forward to serving you!
        </p>
      </div>
    </div>`,
  styleUrl: './confirmationPage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationPageComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  goToReviewForm() {
    this.router.navigate(['/customer/reviews']);
  }

  logout() {
    this.authService.logout();
  }
}
