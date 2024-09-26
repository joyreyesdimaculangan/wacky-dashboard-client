import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inquiry-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiry-form.component.html',
  styleUrl: './inquiry-form.component.scss'
})
export class InquiryFormComponent {
  inquiry = {
    name: '',
    email: '',
    message: '',
  }
 
  onSubmit() {
    console.log('Inquiry Submitted:', this.inquiry);
  }
}

