import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DrawerComponent } from '../drawer/drawer.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';
import { ToastNotificationsComponent } from '../../../core/toastNotifications/toastNotifications.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteReviewComponent } from './delete-review/delete-review.component';

@Component({
  selector: 'app-admin-review',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    DrawerComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss'],
})
export class AdminReviewComponent implements OnInit {
  reviewForm!: FormGroup;
  reviews: Review[] = [];
  loading = false;

  private readonly dialog = inject(MatDialog);

  private fb = inject(FormBuilder);
  private reviewService = inject(ReviewService);
  private toastNotifications = inject(ToastNotificationsComponent);

  constructor() {
    this.initForm();
  }

  ngOnInit() {
    this.loadReviews();
  }

  private initForm() {
    this.reviewForm = this.fb.group({
      name: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      platform: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  setRating(rating: number) {
    this.reviewForm.patchValue({ rating });
  }

  loadReviews() {
    this.reviewService.getReviews().subscribe({
      next: (reviews) => (this.reviews = reviews),
      error: (error) =>
        this.toastNotifications.showError('Failed to load reviews', 'Error'),
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      this.loading = true;
      this.reviewService.createReview(this.reviewForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.reviewForm.reset();
          this.loadReviews();
          this.toastNotifications.showSuccess(
            'Review added successfully',
            'Success'
          );
        },
        error: (error) => {
          this.loading = false;
          this.toastNotifications.showError('Failed to add review', 'Error');
        },
      });
    }
  }

  deleteReview(id: string) {
    const dialogRef = this.dialog.open(DeleteReviewComponent, {
      width: 'auto',
      data: {
        message:
          'Are you sure you want to delete the selected items? This action is irreversible and cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reviewService.deleteReview(id).subscribe({
          next: () => {
            this.loadReviews();
            this.toastNotifications.showSuccess('Review deleted successfully', 'Success');
          },
          error: (error) => {
            console.error('Error deleting review:', error);
            this.toastNotifications.showError('Failed to delete review', 'Error');
          }
        });
      }
    });
  }
}
