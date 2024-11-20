import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { StarRatingComponent } from '../app-star-rating/app-star-rating.component';
import { CustomerReviewsService } from '../../../../services/customerReviews.service';
import { GetAccountIdService } from '../../reservation-form/getAccountId.service';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-add-reviews',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    StarRatingComponent,
  ],
  template: ` <!-- Review Comment Form Section -->
    <div
      class="min-h-screen bg-white flex items-center justify-center relative"
    >
      <div class="container mx-auto p-6">
        <!-- Go Back Button Positioned in the Top Right Corner -->
        <button
          (click)="goBack()"
          class="absolute top-6 right-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          Go Back
        </button>

        <div
          class="relative bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl mx-auto"
        >
          <!-- Logo -->
          <div
            class="absolute top-[-3.5rem] left-1/2 transform -translate-x-1/2"
          >
            <img
              src="assets/images/Wacky's Logo.png"
              alt="Logo"
              class="h-28 w-28"
            />
          </div>

          <h2
            class="text-4xl font-extrabold text-green-700 text-center mt-16 mb-8"
          >
            We love to hear your feedback!
          </h2>
          <div class="space-y-6">
            <form [formGroup]="reviewForm" (ngSubmit)="submitReview()">
              <!-- Rating Input -->
              <div class="form-group mb-6">
                <label
                  for="rating"
                  class="block text-sm font-medium text-gray-700"
                  >Rating</label
                >
                <app-star-rating
                  [rating]="reviewForm.get('rating')?.value"
                  (ratingChange)="reviewForm.get('rating')?.setValue($event)"
                ></app-star-rating>
              </div>

              <!-- Comment Input -->
              <div class="form-group mb-6">
                <label
                  for="comments"
                  class="block text-sm font-medium text-gray-700"
                  >Comment</label
                >
                <textarea
                  id="comments"
                  formControlName="comments"
                  rows="4"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 transform hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>`,
  styleUrl: './add-reviews.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReviewsComponent implements OnInit {
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];
  reviewForm!: FormGroup;

  accountProfileName: string = '';

  private readonly fb = inject(FormBuilder);
  private readonly customerReviewsService = inject(CustomerReviewsService);
  private getAccountProfileIDService = inject(GetAccountIdService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.initializeForm();
  }

  rate(rating: number) {
    this.rating = rating;
    this.ratingChange.emit(this.rating);
  }

  initializeForm() {
    this.reviewForm = this.fb.group({
      rating: [0, Validators.required],
      comments: ['', Validators.required],
    });
  }

  submitReview() {
    const accountProfileId = this.authService.userInfo?.accountProfileId;
    console.log('Account Profile ID:', accountProfileId);
    const reviewData = {
      ...this.reviewForm.value,
      accountProfileId,
      accountProfileName: this.accountProfileName,
    };
    console.log('Review Data:', reviewData);
    this.customerReviewsService.createReview(reviewData).subscribe(
      (response) => {
        console.log('Review submitted successfully', response);
      },
      (error) => {
        console.error('Error submitting review:', error);
      }
    );
  }

  goBack() {
    // Logic to go back
  }
}
