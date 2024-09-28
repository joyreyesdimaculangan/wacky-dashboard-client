import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReservationFormComponent } from "../reservation-form/reservation-form.component";

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [CommonModule, ReservationFormComponent],
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss'], // Corrected 'styleUrl' to 'styleUrls'
})
export class PackageDetailsComponent {
  isOpen: boolean = false;
  isReservationOpen: boolean = false;
  packageDetails: any = {};
  reservation: any = { // Initialize reservation object
    name: '',
    email: '',
    date: '',
    guests: 1,
    options: ''
  };

  openModal(offer: any) {
    this.packageDetails = offer;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.isReservationOpen = false; // Close reservation form when closing package modal
  }

  // Method to open the second modal (reservation form)
  openReservationForm() {
    this.isReservationOpen = true;
  }

  // Method to close the second modal
  closeReservationForm() {
    this.isReservationOpen = false;
  }

  // Method to handle form submission
  onSubmit(event: any) {
    // Form submission logic
    console.log("Form Submitted", this.reservation);
    this.closeReservationForm();
  }
}
