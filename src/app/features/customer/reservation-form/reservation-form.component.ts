import {
  Component,
  EventEmitter,
  inject,
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
import { ReservationService } from '../../../services/reservation.service';
import { ReservationForm } from '../../../models/reservation-form';

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
  styleUrls: ['./reservation-form.component.scss'], // Corrected from styleUrl to styleUrls
})
export class ReservationFormComponent implements OnInit {
  private readonly reservationService = inject(ReservationService);
  private readonly router = inject(Router);
  private fb = inject(FormBuilder);

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
      // Ensure the status is properly set, defaulting to 'Pending' if undefined
      const statusValue: 'Pending' = this.reservationForm.value.status || 'Pending'; 

      // Map form values to the ReservationForm interface
      const reservationData: ReservationForm = {
        numberOfPax: this.step1.get("numberOfPax")?.value,
        packageType: "Standard Type",
        name: this.step1.get("name")?.value,
        contactNumber: this.step1.get("contactNumber")?.value,
        eventDate: this.step2.get("eventDate")?.value,
        eventTime: this.step2.get("eventTime")?.value,
        eventTheme: this.step3.get("eventTheme")?.value,
        cakeTheme: this.step3.get("cakeTheme")?.value,
        otherRequest: this.step3.get("otherRequest")?.value,
        packageID: 'test',
        accountProfileId: "cff20a45-a425-47f5-9240-d9cab05e1af8",
        status: statusValue,
      };

      console.log('Reservation submitted:', reservationData);

      // Call the service to create a reservation
      this.reservationService.createReservation(reservationData).subscribe({
        next: (response) => {
          console.log('Reservation created successfully:', response);
          // this.router.navigate(['/confirmation']);
          this.reservationSubmitted.emit(reservationData);
          this.close.emit();
        },
        error: (error) => {
          console.error('Error creating reservation:', error);
          // Handle error messages here
        },
      });
    } else {
      console.log('Please complete all steps before submitting.');
      this.displayErrorMessages();
    }
  }

  displayErrorMessages() {
    const errors = this.reservationForm.errors;
    if (errors) {
      // You can handle specific error messages based on the errors
      if (this.step1.get('name')?.hasError('required')) {
        console.log('Name is required.');
      }
      if (this.step1.get('contactNumber')?.hasError('required')) {
        console.log('Contact number is required.');
      }
      if (this.step1.get('contactNumber')?.hasError('pattern')) {
        console.log('Contact number must be numeric.');
      }
      if (this.step1.get('numberOfPax')?.hasError('required')) {
        console.log('Number of pax is required.');
      }
      if (this.step1.get('numberOfPax')?.hasError('min')) {
        console.log('Number of pax must be at least 1.');
      }
    }
  }
}
