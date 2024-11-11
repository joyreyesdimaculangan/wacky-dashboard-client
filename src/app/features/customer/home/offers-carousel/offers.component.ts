import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { OffersCrmComponent } from '../../../admin/admin-crm/menu-crm/createAddedMenu/offers-crm.component';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
})
export class OffersComponent implements OnInit, OnDestroy {
  slideIndex: number = 1;
  image = signal<string>('');
  autoplayInterval: any;
  isAddContentModalOpen: boolean = false;
  additionalContent!: { imageUrl: string; title: string; description: string; };
  offers = [
    {
      images: 'assets/images/Buffet.jpg',
      title: 'EAT-ALL-YOU-CAN BUFFET',
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

  openAddContent(offers: any) {
    this.isAddContentModalOpen = true;
    this.additionalContent = {
      imageUrl: '',
      title: '',
      description: '',
    }
  }

  closeAddContent() {
    this.isAddContentModalOpen = false;
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
