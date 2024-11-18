import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="star-rating">
      <i
        *ngFor="let star of stars; let i = index"
        class="material-icons"
        [class.filled]="i < rating"
        (click)="rate(i + 1)"
      >
        star
      </i>
    </div>
  `,
  styles: [
    `
      .star-rating {
        display: flex;
        align-items: center;
      }
      .material-icons {
        cursor: pointer;
        font-size: 24px;
        color: #ffd700; /* Gold color */
      }
      .material-icons.filled {
        color: #ffd700;
      }
      .material-icons:not(.filled) {
        color: #e0e0e0; /* Light gray color */
      }
    `,
  ],
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];

  rate(rating: number) {
    this.rating = rating;
    this.ratingChange.emit(this.rating);
  }
}