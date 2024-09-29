import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ReservationFormComponent } from "../reservation-form/reservation-form.component";

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [CommonModule, ReservationFormComponent],
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss'], 
})
export class PackageDetailsComponent {
  isOpen: boolean = false;
  isReservationOpen: boolean = false;
  packageDetails: any = {
    additionalInclusions: [] // Initialize to ensure it exists
  };
  
  reservation: any = { 
    name: '',
    email: '',
    date: '',
    guests: 1,
    options: ''
  };
  constructor(private cdr: ChangeDetectorRef) {}
  editMode: boolean = false; // Track if in edit mode

  openModal(offer: any) {
    this.packageDetails = { 
      ...offer,
      additionalInclusions: offer.additionalInclusions || [], // Initialize additional inclusions
      availableInclusions: offer.availableInclusions || [] // Ensure available inclusions are also initialized
    };
    this.isOpen = true;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.isOpen = false;
    this.isReservationOpen = false; // Close reservation form when closing package modal
  }

  // Method to open the reservation form modal
  openReservationForm() {
    this.isReservationOpen = true;
  }

  // Method to close the reservation form modal
  closeReservationForm() {
    this.isReservationOpen = false;
  }

  // Method to handle form submission
  onSubmit(event: any) {
    // Form submission logic
    console.log("Form Submitted", this.reservation);
    this.closeReservationForm();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  // Method to toggle additional inclusion selection
  toggleAdditionalInclusion(inclusion: string) {
    const index = this.packageDetails.additionalInclusions.indexOf(inclusion);
    if (index > -1) {
      this.packageDetails.additionalInclusions.splice(index, 1); // Remove additional inclusion
    } else {
      this.packageDetails.additionalInclusions.push(inclusion); // Add additional inclusion
    }
  }
}
