import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inquiry-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiry-form.component.html',
  styleUrls: ['./inquiry-form.component.scss'],
})
export class InquiryFormComponent {
  inquiry = {
    name: '',
    email: '',
    message: '',
    minPrice: 0,
    maxPrice: 0
  };

  onSubmit() {
    console.log('Inquiry Submitted:', this.inquiry);
  }

  public packages = [
    { image: "assets/images/Package 1_7th Birthday.jpg"},
    { image: "assets/images/Package 2_Wedding.jpg"},
    { image: "assets/images/Package 3_Simple Wedding.jpg"},
    { image: "assets/images/Package 4_Christianing.jpg"},
    { image: "assets/images/Package 5_Debut.jpg"},
    { image: "assets/images/Event 2.jpg"}
  ]
}
