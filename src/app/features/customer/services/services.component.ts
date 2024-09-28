import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InquiryFormComponent } from "../inquiry-form/inquiry-form.component";
import { PackageDetailsComponent } from "../package-details/package-details.component";

declare const Flowbite: any;


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, InquiryFormComponent, PackageDetailsComponent],
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
  ];

  @ViewChild('packageModal') packageModal!: PackageDetailsComponent;

  openPackageModal(offer: any) {
    this.packageModal.openModal(offer);
  }
}
