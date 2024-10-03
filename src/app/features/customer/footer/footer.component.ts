import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  info = {
    contactNumber: '0917 329 3889', 
    businessDays: 'Tuesday - Sunday',
    businessHours: '8:00 AM - 8:00 PM',
    address: '113, Alupay, Rosario, Batangas'
  };
}
