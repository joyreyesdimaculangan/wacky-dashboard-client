import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-review-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-section.component.html',
  styleUrl: './review-section.component.scss'
})
export class ReviewSectionComponent {
  public reviews = [
    { 
      name: "Gabrielle Ramos", 
      comments: "We just stop by for breakfast last Saturday, lunch and dinner is always busy here and you need to book in advance for their eat all u can. Food is great at a very affordable price, the staffs are very accommodating.",
      rating: 5
    },
    { 
      name: "Clark Barcelona", 
      comments: "The place is cozy, nice service and the most important, the food are all delicious. Worth the price! Will surely be back!",
      rating: 5
    },
    { 
      name: "Abelardo Altamira", 
      comments: "Great foods unlimited yet very affordable.",
      rating: 4
    },
  ]
}
