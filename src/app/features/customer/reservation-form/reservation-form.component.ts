import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'] // Corrected from styleUrl to styleUrls
})
export class ReservationFormComponent {
  reservation = {
    packageType: '',
    name: '',
    contactNumber: '',
    numberOfPax: 50,
    eventDate: '',
    eventTime: '',
    eventTheme: '',
    cakeTheme: '',
    cakeMessage: '',
    otherRequest: '',
  };

  availableTimes = [
    { id: '10-am', value: '10:00 AM', label: '10:00 AM' },
    { id: '10-30am', value: '10:30 AM', label: '10:30 AM' },
    { id: '11-am', value: '11:00 AM', label: '11:00 AM' },
    { id: '3-00-pm', value: '3:00 PM', label: '3:00 PM' },
    { id: '3-30-pm', value: '3:30 PM', label: '3:30 PM' },
    { id: '4-00-pm', value: '4:00 PM', label: '4:00 PM' },
  ];

  isFirstStepComplete = false;
  isSecondStepComplete = false;
  isReservationOpen = false;

  openReservationForm() {
    this.isReservationOpen = true;
  }

  closeReservationForm() {
    this.isReservationOpen = false;
  }

  goToNextStep() {
    this.isFirstStepComplete = true;
  }

  goToPreviousStep() {
    this.isFirstStepComplete = false;
  }

  goBack() {
    window.history.back();
  }

  @Output() reservationSubmitted = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  onSubmit() {
    console.log('Reservation Details:', this.reservation);
    this.reservationSubmitted.emit(this.reservation);
    this.close.emit(); 
  }
}
