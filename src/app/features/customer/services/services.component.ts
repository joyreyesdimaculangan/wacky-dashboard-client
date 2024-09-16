import { AfterViewInit, Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

declare const Flowbite: any;


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    // Initialize Flowbite carousel if needed
    if (typeof Flowbite !== 'undefined' && Flowbite.Carousel) {
      const carouselElement = document.getElementById('gallery');
      const carousel = new Flowbite.Carousel(carouselElement);
    }
  }
}
