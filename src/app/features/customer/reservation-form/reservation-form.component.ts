import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    RouterModule,
  ],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'], // Corrected from styleUrl to styleUrls
})
export class ReservationFormComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  reservationForm!: FormGroup; // Use definite assignment operator
  confirmReservationForm!: FormGroup; // Use definite assignment operator

  @Input() item: any;
  @Output() reservationSubmitted = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  availableTimes = [
    { id: '10-am', value: '10:00 AM', label: '10:00 AM' },
    { id: '10-30am', value: '10:30 AM', label: '10:30 AM' },
    { id: '11-am', value: '11:00 AM', label: '11:00 AM' },
    { id: '3-00-pm', value: '3:00 PM', label: '3:00 PM' },
    { id: '3-30-pm', value: '3:30 PM', label: '3:30 PM' },
    { id: '4-00-pm', value: '4:00 PM', label: '4:00 PM' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private reservationService: ReservationService
  ) {}
  ngOnInit() {
    this.confirmReservationForm = this.fb.group({
      name: ['', Validators.required],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      numberOfPax: [50, [Validators.required, Validators.min(50)]],
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required],
      eventTheme: ['', Validators.required],
      cakeTheme: ['', Validators.required],
      cakeMessage: ['', Validators.required],
      otherRequest: [''],
    });
    this.reservationForm = new FormGroup({
      customerDetails: new FormGroup({
        name: new FormControl('', [Validators.required]),
        contactNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ]), // Ensure only numbers
        numberOfPax: new FormControl(50, [
          Validators.required,
          Validators.min(50),
        ]), // Minimum number of pax
      }),

      eventDetailsForm: new FormGroup({
        eventDate: new FormControl('', [Validators.required]),
        eventTime: new FormControl('', [Validators.required]),
      }),

      preferencesForm: new FormGroup({
        eventTheme: new FormControl('', Validators.required),
        cakeTheme: new FormControl('', Validators.required),
        otherRequest: new FormControl(''),
      }),
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
    console.log(this.stepper)
    console.log('Current step index:', this.stepper.selectedIndex);
    if (this.stepper.selectedIndex === 0 && this.step1.valid) {
      console.log('It works', this.step1.valid);
      this.stepper.selectedIndex = 1; // Move to Event Details
    } else if (this.stepper.selectedIndex === 1 && this.step2.valid) {
      console.log('It works', this.step2.valid);
      this.stepper.selectedIndex = 2; // Move to Event Preferences
    } else if (this.stepper.selectedIndex === 2) {
      console.log(this.stepper.selectedIndex);
      this.stepper.selectedIndex = 3; // Move to Confirmation
      
    }
  }

  goToPreviousStep() {
    this.isFirstStepComplete = false;
  }

  goBack() {
    this.router.navigate(['customer/home']);
  }

  displayErrorMessages() {
    const errors = this.reservationForm.errors;
    if (errors) {
      // You can handle specific error messages based on the errors
      if (this.reservationForm.get('name')?.hasError('required')) {
        console.log('Name is required.');
      }
      if (this.reservationForm.get('contactNumber')?.hasError('required')) {
        console.log('Contact number is required.');
      }
      if (this.reservationForm.get('contactNumber')?.hasError('pattern')) {
        console.log('Contact number must be numeric.');
      }
      if (this.reservationForm.get('numberOfPax')?.hasError('required')) {
        console.log('Number of pax is required.');
      }
      if (this.reservationForm.get('numberOfPax')?.hasError('min')) {
        console.log('Number of pax must be at least 1.');
      }
    }
  }
  get step1() {
    return this.reservationForm.get('customerDetails') as FormGroup;
  }
  get step2() {
    return this.reservationForm.get('eventDetailsForm') as FormGroup;
  }
  get step3() {
    return this.reservationForm.get('preferencesForm') as FormGroup;
  }
  onSubmit() {
    if (this.reservationForm.valid) {
      const reservationData = {
        ...this.reservationForm.value,
      };

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
