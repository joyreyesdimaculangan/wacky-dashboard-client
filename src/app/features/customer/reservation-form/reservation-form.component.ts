import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Router, RouterModule } from '@angular/router';
import { ReservationService } from './reservation.service';

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
    MatInputModule,
    RouterModule
  ],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'] // Corrected from styleUrl to styleUrls
})
export class ReservationFormComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  reservationFormGroup: FormGroup; // Use definite assignment operator
  eventDetailsFormGroup: FormGroup; // Use definite assignment operator
  preferencesFormGroup: FormGroup; // Use definite assignment operator
  confirmationForm: FormGroup;

  @Input() item: any; 
  @Output() reservationSubmitted = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

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


  constructor(private fb: FormBuilder, private router: Router, private reservationService: ReservationService) {
    this.reservationFormGroup = this.fb.group({
      name: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Ensure only numbers
      numberOfPax: [50, [Validators.required, Validators.min(50)]], // Minimum number of pax
  });
  
    this.eventDetailsFormGroup = this.fb.group({
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required]
    });

    this.preferencesFormGroup = this.fb.group({
      eventTheme: ['', Validators.required],
      cakeTheme: ['', Validators.required],
      cakeMessage: ['', Validators.required],
      otherRequest: ['']
    });

    this.confirmationForm = this.fb.group({ 
      name: '',
      contactNumber: '',
      numberOfPax: '',
      eventDate: '',
      eventTime: '',
      eventTheme: '',
      cakeTheme: '',
      cakeMessage: '',
      otherRequest: ''
    });
  }
  
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
    if (this.stepper.selectedIndex === 0 && this.reservationFormGroup.valid) {
      console.log('It works', this.reservationFormGroup.valid);
      this.stepper.selectedIndex = 1; // Move to Event Details
    } else if (this.stepper.selectedIndex === 1 && this.eventDetailsFormGroup.valid) {
      console.log('It works', this.reservationFormGroup.valid);
      this.stepper.selectedIndex = 2; // Move to Event Preferences
    } else if (this.stepper.selectedIndex === 2 && this.preferencesFormGroup.valid) {
      console.log('It works', this.reservationFormGroup.valid);
      this.stepper.selectedIndex = 3; // Move to Confirmation
    } else {
      console.log('Error', this.reservationFormGroup.invalid);
      this.reservationFormGroup.markAllAsTouched(); // Mark all fields as touched to show errors
      // Optionally, you can show specific error messages for better user feedback
      this.displayErrorMessages();
    }
  }

  goToPreviousStep() {
    this.isFirstStepComplete = false;
  }

  goBack() {
    this.router.navigate(['customer/home']);
  }

  displayErrorMessages() {
    const errors = this.reservationFormGroup.errors;
    if (errors) {
        // You can handle specific error messages based on the errors
        if (this.reservationFormGroup.get('name')?.hasError('required')) {
            console.log('Name is required.');
        }
        if (this.reservationFormGroup.get('contactNumber')?.hasError('required')) {
            console.log('Contact number is required.');
        }
        if (this.reservationFormGroup.get('contactNumber')?.hasError('pattern')) {
            console.log('Contact number must be numeric.');
        }
        if (this.reservationFormGroup.get('numberOfPax')?.hasError('required')) {
            console.log('Number of pax is required.');
        }
        if (this.reservationFormGroup.get('numberOfPax')?.hasError('min')) {
            console.log('Number of pax must be at least 1.');
        }
    }
  }

  onSubmit() {
    if (this.reservationFormGroup.valid && this.eventDetailsFormGroup.valid && this.preferencesFormGroup.valid) {
      const reservationData = {
        ...this.reservationFormGroup.value,
        ...this.eventDetailsFormGroup.value,
        ...this.preferencesFormGroup.value,
      };
      this.reservation = { ...reservationData };

      console.log('Reservation submitted:', reservationData);
      this.reservationService.setReservationData(reservationData); // Use reservationData instead of this.reservationForm.value
      this.router.navigate(['/confirmation']);

      this.reservationSubmitted.emit(reservationData);
      this.close.emit(); 
    } else {
      console.log('Please complete all steps before submitting.');
      this.displayErrorMessages();
    }
  }
}
