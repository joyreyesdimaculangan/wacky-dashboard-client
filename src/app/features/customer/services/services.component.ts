import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

declare const Flowbite: any;


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  public packages = [
    { name: "All-In 7th Birthday Party Package", image: "assets/images/Package 1_7th Birthday.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio ligula, blandit eget diam in, vulputate luctus augue. Pellentesque at viverra turpis, ac vestibulum libero."},
    { name: "Standard Civil Wedding Package", image: "assets/images/Package 2_Wedding.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio ligula, blandit eget diam in, vulputate luctus augue. Pellentesque at viverra turpis, ac vestibulum libero."},
    { name: "Simple Wedding Package", image: "assets/images/Package 3_Simple Wedding.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio ligula, blandit eget diam in, vulputate luctus augue. Pellentesque at viverra turpis, ac vestibulum libero."},
    { name: "All-In Christening & 1st Birthday Party Package", image: "assets/images/Package 4_Christianing.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio ligula, blandit eget diam in, vulputate luctus augue. Pellentesque at viverra turpis, ac vestibulum libero."},
    { name: "All-In Debut Package", image: "assets/images/Package 5_Debut.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio ligula, blandit eget diam in, vulputate luctus augue. Pellentesque at viverra turpis, ac vestibulum libero."},
    { name: "For Small Celebrations", image: "assets/images/Event 2.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio ligula, blandit eget diam in, vulputate luctus augue. Pellentesque at viverra turpis, ac vestibulum libero."}
  ]
}
