import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
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
  reservationForm: any;

  constructor(private fb: FormBuilder, private reservationService: ReservationService, private router: Router) {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],  // Ensure validators are applied correctly
      contactNumber: ['', Validators.required],
      numberOfPax: [null, Validators.required],
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required],
      eventTheme: ['', Validators.required],
      cakeTheme: ['', Validators.required],
      cakeMessage: ['', Validators.required],
      otherRequest: ['']
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
    this.isFirstStepComplete = true;
  }

  goToPreviousStep() {
    this.isFirstStepComplete = false;
  }

  goBack() {
    window.history.back();
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      // Set reservation data from the form values
      this.reservationService.setReservationData(this.reservationForm.value);
      this.router.navigate(['/confirmation']);
      
      // Emit the reservation data for further processing
      this.reservationSubmitted.emit(this.reservationForm.value);
      this.close.emit(); 
    }
  }
}
