import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { StarRatingComponent } from '../app-star-rating/app-star-rating.component';

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
  <div class="min-h-screen bg-cover bg-center flex items-center justify-center relative" style="background-image: url('assets/images/background.jpg');">
    <div class="container mx-auto p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
      <!-- Go Back Button Positioned in the Top Right Corner -->
      <button
        (click)="goBack()"
        class="absolute top-6 right-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        Go Back
      </button>
  
      <div class="flex flex-col items-center mb-8">
        <img
          src="assets/images/Wacky's Logo.png"
          alt="Restaurant Logo"
          class="mb-4"
          style="width: 150px; height: auto"
        />
        <h2 class="text-3xl font-bold mb-2 text-green-600">Review Comment Form</h2>
      </div>
      <div class="div">
        <form [formGroup]="reviewForm" (ngSubmit)="submitReview()">
          <!-- Name Input -->
          <div class="form-group mb-6">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <div class="relative">
              <input
                id="name"
                formControlName="name"
                type="text"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              <i class="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">person</i>
            </div>
          </div>
  
          <!-- Email Input -->
          <div class="form-group mb-6">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="relative">
              <input
                id="email"
                formControlName="email"
                type="email"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              <i class="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">email</i>
            </div>
          </div>
  
          <!-- Rating Input -->
          <div class="form-group mb-6">
            <label for="rating" class="block text-sm font-medium text-gray-700">Rating</label>
            <app-star-rating
              [rating]="reviewForm.get('rating')?.value"
              (ratingChange)="reviewForm.get('rating')?.setValue($event)"
            ></app-star-rating>
          </div>
  
          <!-- Comment Input -->
          <div class="form-group mb-6">
            <label for="comment" class="block text-sm font-medium text-gray-700">Comment</label>
            <textarea
              id="comment"
              formControlName="comment"
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
  </div>`,
  styleUrl: './add-reviews.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReviewsComponent implements OnInit {
  reviewForm!: FormGroup;

  private readonly fb = inject(FormBuilder);

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.reviewForm = this.fb.group({
      name: ['', Validators.required],
      rating: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      console.log('Review submitted:', this.reviewForm.value);
      // Logic to handle form submission
    } else {
      console.error('Form is invalid');
    }
  }

  goBack() {
    // Logic to go back
  }
}
