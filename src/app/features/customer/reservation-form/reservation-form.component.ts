import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss'
})
export class ReservationFormComponent {
  reservation = {
    name: '',
    email: '',
    date: '',
    guests: 1
  };

  onSubmit() {
    // Logic to handle the form submission
    console.log('Reservation Details:', this.reservation);
    // You can call a service to submit the reservation here
  }
}
