import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-review-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-section.component.html',
  styleUrls: ['./review-section.component.scss']
})
export class ReviewSectionComponent implements OnInit, OnDestroy {
  slideIndex: number = 0;
  image = signal<string>('');
  autoplayInterval: any;
  isReviewsOpen: boolean = false;
  additionalReviews!: { name: string; comments: string; rating: number; };

  reviews = [
    { 
      name: "Gabrielle Ramos", 
      comments: "We just stopped by for breakfast last Saturday. Lunch and dinner are always busy here, and you need to book in advance for their eat-all-you-can. Food is great at a very affordable price, and the staff is very accommodating.",
      rating: 5
    },
    { 
      name: "Clark Barcelona", 
      comments: "The place is cozy, the service is nice, and most importantly, the food is all delicious. Worth the price! Will surely be back!",
      rating: 5
    },
    { 
      name: "Abelardo Altamira", 
      comments: "Great food, unlimited yet very affordable.",
      rating: 4
    },
    { 
      name: "Carlo Saquitin", 
      comments: "Definitely a bang for your buck! The lomi overload and pancit can feed at least 4. Didn’t try their buffet though, but it’s also decent for the price of 198. It looks like the place got popular and can get really crowded. I used to enjoy this place as this was a good relaxing pit stop to grab a local lomi.",
      rating: 4
    },
    { 
      name: "Jessie Tenorio", 
      comments: "When you talk about affordability, this definitely is! 😊 Eat All You Can Lunch for only 198 pesos.",
      rating: 4
    },
    { 
      name: "Jenifer Pascual", 
      comments: "We just stopped by for breakfast last Saturday. Lunch and dinner are always busy here, and you need to book in advance for their eat-all-you-can food. The staff is very accommodating.",
      rating: 4
    },
  ];

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
    this.startAutoplay(); 
  }

  ngOnDestroy(): void {
    clearInterval(this.autoplayInterval);
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  prevSlide() {
    if (this.slideIndex > 0) {
      this.slideIndex--;
    }
  }
  
  nextSlide() {
    if ((this.slideIndex + 1) * 3 < this.reviews.length) {
      this.slideIndex++;
    } else {
      this.slideIndex = 0; // Reset to the first slide when reaching the end
    }
  }

  get maxSlides(): number {
    return Math.ceil(this.reviews.length / 3);
  }
}
