import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-page',
  standalone: true,
  imports: [],
  template: `
  <!-- Confirmation Section -->
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg text-center">
      <div class="flex flex-col items-center mb-6">
        <img
          src="assets/images/Wacky's Logo.png"
          alt="Restaurant Logo"
          class="mb-4"
          style="width: 150px; height: auto"
        />
        <h2 class="text-3xl font-bold mb-2 text-green-600">Reservation Confirmed</h2>
      </div>
      <p class="text-lg text-gray-700 mb-6">
        Thank you for your reservation! We look forward to serving you.
      </p>
      <button
        (click)="goToReviewForm()"
        class="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
      >
        Leave a Review
      </button>
    </div>
  </div>`,
  styleUrl: './confirmationPage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationPageComponent { 
  private readonly router = inject(Router);

  goToReviewForm() {
    this.router.navigate(['/customer/reviews']);
  }
}
