import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-review-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-section.component.html',
  styleUrls: ['./review-section.component.scss']
})
export class ReviewSectionComponent implements OnInit, OnDestroy {
  slideIndex: number = 0;
  slidesPerView: number = 1;
  image = signal<string>('');
  isReviewsOpen: boolean = false;
  additionalReviews!: { name: string; comments: string; rating: number; };

  reviews: Review[] = [];
  private reviewService = inject(ReviewService);  
  loading = false;

  currentIndex = 0;
  autoplayInterval: any;
  isPaused = false;

  loadReviews() {
    this.loading = true;
    this.reviewService.getReviews().subscribe({
      next: (reviews) => {
        console.log('Reviews received:', reviews);
        this.reviews = reviews;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.loading = false;
      }
    });
  }

  openReviews(reviews: any) {
    this.isReviewsOpen = true;
    this.additionalReviews = {
      name: '',
      comments: '',
      rating: 0,
    };
  }

  closeReviews() {
    this.isReviewsOpen = false;
  }

  ngOnInit() {
    console.log('ReviewSectionComponent initialized');
    this.loadReviews();
    this.startSlideshow();
    
  }

  ngOnDestroy(): void {
    this.stopSlideshow();
  }

  startSlideshow() {
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, 5000); // Change slide every 5 seconds
  }

  stopSlideshow() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  pauseSlideshow() {
    this.isPaused = true;
  }

  resumeSlideshow() {
    this.isPaused = false;
  }

  get slidesCount() {
    return new Array(Math.ceil(this.reviews.length / 3));
  }

  prevSlide() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.reviews.length - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
