import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent implements OnInit {
  slideIndex: number = 0;

  ngOnInit() {
    this.showSlides();
  }

  showSlides() {
    const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) { this.slideIndex = 1 }
    slides[this.slideIndex - 1].style.display = "block";
    setTimeout(() => this.showSlides(), 4000); // Change image every 4 seconds
  }
}
