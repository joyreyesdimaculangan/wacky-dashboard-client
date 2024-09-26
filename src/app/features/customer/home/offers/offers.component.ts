import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
})
export class OffersComponent implements OnInit, OnDestroy {
  slideIndex: number = 1;
  offers = [
    {
      images: 'assets/images/Buffet.jpg',
      title: '198 EAT-ALL-YOU-CAN BUFFET',
      description:
        "Wacky's Food House also offers event hosting for any occasion!",
    },
    {
      images: 'assets/images/Mixed Seafoods.jpg',
      title: 'SEAFOOD BUFFET',
      description: "Dive into a sea of flavors at Wacky's Food House!",
    },
    {
      images: 'assets/images/Event 6.jpg',
      title: 'RECEPTIONS',
      description: 'Host your special events with us!',
    },
  ];

  image = signal<string>('');
  autoplayInterval: any;

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
  currentSlide: any;
  nextSlide() {
    this.slideIndex = (this.slideIndex + 1) % this.offers.length;
    this.image.set(this.offers[this.slideIndex].images);
  }

  prevSlide() {
    this.slideIndex =
      (this.slideIndex - 1 + this.offers.length) % this.offers.length;
    this.currentSlide = this.offers[this.slideIndex];
  }
}
