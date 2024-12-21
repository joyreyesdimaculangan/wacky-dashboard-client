import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
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
import { Location } from '@angular/common';
import {
  EditedReservationForm,
  ReservationForm,
} from '../../../models/reservation-form';
import { GetPackageAddOnsService } from './getPackageAddOns.service';
import { GetPackageNameService } from './getPackageName.service';
import { AccountProfileService } from '../../../services/account-profile.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { PackageName, Packages } from '../../../models/packages';
import { GetAccountIdService } from './getAccountId.service';
import { ToastNotificationsComponent } from '../../../core/toastNotifications/toastNotifications.component';
import { toZonedTime } from 'date-fns-tz';

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
  private readonly reservationService = inject(ReservationService);
  private readonly router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private packageAddOnsService = inject(GetPackageAddOnsService);

  private getAccountProfileIDService = inject(GetAccountIdService);
  private packageNameService = inject(GetPackageNameService);
  toastNotifications = inject(ToastNotificationsComponent);
  loading: boolean = false;
  termsAccepted: boolean = false;
  privacyAccepted: boolean = false;

  packageID: PackageName | null | undefined;
  accountProfileId!: null | string | undefined;
  addOnsId: string[] = [];

  packages: any[] = [];
  accountProfileName: any[] = [];
  packageName: PackageName | null | undefined;
  addOnsName: Packages | null | undefined;
  fullyBookedDates: Date[] = [];
  fullyBookedTimes: { [date: string]: string[] } = {};
  availableTimes: string[] = [
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
  ];

  reservations: EditedReservationForm[] = [];

  isFirstStepComplete = false;
  isSecondStepComplete = false;
  isReservationOpen = false;

  constructor() {
    effect(() => {
      const packages = this.packageNameService.packageName();
      this.packageID = packages?.packageId as PackageName | undefined;
      this.packageName = packages?.packageName as PackageName | undefined;
      console.log('Package ID:', this.packageID);
      console.log('Package Name:', this.packageName);
      const accountProfileName =
        this.getAccountProfileIDService.getAccountProfileName();
      this.accountProfileId = accountProfileName?.accountProfileId;
      console.log('Account Profile ID:', this.accountProfileId);
      const addOns = this.packageAddOnsService.addOnsName();
      this.addOnsId = this.packageAddOnsService.addOnsId();
      this.addOnsName = addOns as Packages | null | undefined;
      console.log('Add-ons ID:', this.addOnsId);
      console.log('Add-ons Name:', this.addOnsName);
    });
  }

  @ViewChild('stepper') stepper!: MatStepper;
  reservationForm!: FormGroup; // Use definite assignment operator
  confirmReservationForm!: FormGroup; // Use definite assignment operator
  termsForm!: FormGroup; // Declare the terms property
  reservationsMade: EditedReservationForm[] = [];

  @Input() item: any;
  @Output() reservationSubmitted = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  ngOnInit() {
    this.confirmReservationForm = this.fb.group({
      agreedToTerms: [false, Validators.requiredTrue],
      name: ['', Validators.required, Validators.pattern('^[a-zA-Z ]+$')],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      numberOfPax: [
        50,
        [
          Validators.required,
          Validators.min(50),
          Validators.max(200),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      eventDate: [
        '',
        Validators.required,
        this.dateFilter,
        Validators.pattern('^[0-9]+$'),
      ],
      eventTime: [
        '',
        Validators.required,
        this.isTimeDisabled,
        Validators.pattern('^[0-9]+$'),
      ],
      eventTheme: ['', Validators.required, Validators.pattern('^[a-zA-Z ]+$')],
      cakeTheme: ['', Validators.required, Validators.pattern('^[a-zA-Z ]+$')],
      otherRequest: ['', Validators.pattern('^[a-zA-Z ]+$')],
      paymentStatus: ['PENDING'],
      status: ['Pending'],
    });

    this.reservationForm = new FormGroup({
      customerDetails: new FormGroup({
        name: new FormControl('', [Validators.required]),
        contactNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ]), // Ensure only numbers
      }),

      eventDetailsForm: new FormGroup({
        numberOfPax: new FormControl(50, [
          Validators.required,
          Validators.min(50),
        ]), 
        eventDate: new FormControl('', [Validators.required]),
        eventTime: new FormControl('', [Validators.required]),
      }),

      preferencesForm: new FormGroup({
        eventTheme: new FormControl('', Validators.required),
        cakeTheme: new FormControl('', Validators.required),
        otherRequest: new FormControl(''),
      }),
    });

    this.termsForm = this.fb.group({
      agreedToTerms: [false, Validators.requiredTrue]
    });

    this.fetchReservations();
    this.getFullyBookedDates(this.reservations);
    this.populateFullyBookedTimes(this.reservations);
  }

  fetchReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (data: EditedReservationForm[]) => {
        console.log('Fetched reservations:', data);
        this.reservations = data;
        this.fullyBookedDates = this.getFullyBookedDates(data);
        console.log('Fully booked dates:', this.fullyBookedDates);
      },
      error: (error) => {
        console.error('Error fetching reservations:', error); // Error handling
      },
    });
  }

  getFullyBookedDates(reservations: EditedReservationForm[]): Date[] {
    // Map to count reservations per date
    const dateCounts: { [key: string]: number } = {};

    reservations.forEach((reservation) => {
      const eventDate = new Date(reservation.eventDate);
      const [time, period] = reservation.eventTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);

      let adjustedHours = hours;
      if (period === 'PM' && hours < 12) {
        adjustedHours += 12;
      } else if (period === 'AM' && hours === 12) {
        adjustedHours = 0;
      }

      eventDate.setHours(adjustedHours, minutes);

      const localDateISO = eventDate.toLocaleDateString('en-CA');
      dateCounts[localDateISO] = (dateCounts[localDateISO] || 0) + 1;
    });

    console.log('Date counts:', dateCounts);

    // Return fully booked dates (more than 6 reservations)
    return Object.keys(dateCounts)
      .filter((date) => dateCounts[date] >= 6)
      .map((date) => new Date(date));
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    const isPastDate = date < today;
    const oneMonthFromToday = new Date();
    oneMonthFromToday.setMonth(today.getMonth() + 1);

    const isWithinOneMonth = date >= today && date <= oneMonthFromToday;
    const isFullyBooked = this.fullyBookedDates.some(
      (bookedDate) =>
        bookedDate.toLocaleDateString('en-CA') ===
        date.toLocaleDateString('en-CA')
    );

    const isAvailable = !isPastDate && !isWithinOneMonth && !isFullyBooked;

    console.log(`Date ${date.toDateString()} is available: ${isAvailable}`); // Debugging
    return isAvailable;
  };

  populateFullyBookedTimes(reservations: EditedReservationForm[]): void {
    this.fullyBookedTimes = {}; // Reset before populating

    reservations.forEach((reservation) => {
      const eventDate = new Date(reservation.eventDate);
      const [time, period] = reservation.eventTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);

      let adjustedHours = hours;
      if (period === 'PM' && hours < 12) {
        adjustedHours += 12;
      } else if (period === 'AM' && hours === 12) {
        adjustedHours = 0;
      }

      eventDate.setHours(adjustedHours, minutes);

      const localDateISO = eventDate.toLocaleDateString('en-CA');
      if (!this.fullyBookedTimes[localDateISO]) {
        this.fullyBookedTimes[localDateISO] = [];
      }
      this.fullyBookedTimes[localDateISO].push(reservation.eventTime);
    });
  }

  isTimeDisabled(time: string): boolean {
    const selectedDate = this.reservationForm.get('eventDate')?.value;
    if (!selectedDate) {
      return false; // No date selected yet
    }

    const selectedDateISO = new Date(selectedDate).toLocaleDateString('en-CA');
    return this.fullyBookedTimes[selectedDateISO]?.includes(time) || false;
  }

  openReservationForm() {
    this.isReservationOpen = true;
  }

  closeReservationForm() {
    this.isReservationOpen = false;
  }

  goToNextStep() {
    console.log(this.stepper);
    console.log('Current step index:', this.stepper.selectedIndex);
    if (this.stepper.selectedIndex === 0 && this.termsForm.valid) {
      this.stepper.selectedIndex = 1; // Move to Personal Details
    } else if (this.stepper.selectedIndex === 1 && this.step1.valid) {
      this.stepper.selectedIndex = 2; // Move to Event Details
    } else if (this.stepper.selectedIndex === 2 && this.step2.valid) {
      this.stepper.selectedIndex = 3; // Move to Event Preferences
    } else if (this.stepper.selectedIndex === 3 && this.step3.valid) {
      this.stepper.selectedIndex = 4; // Move to Confirmation
    }
  }

  goToPreviousStep() {
    this.isFirstStepComplete = false;
  }

  goBack() {
    this.router.navigate(['/home']);
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
    this.loading = true;
    if (this.reservationForm.valid) {
      const accountProfileId = this.authService.user()?.accountProfileId;
      // Ensure the status is properly set, defaulting to 'Pending' if undefined
      const statusValue: 'Pending' =
        this.reservationForm.value.status || 'Pending';
      const paymentStatusValue: 'PENDING' =
        this.reservationForm.value.paymentStatus || 'PENDING';

      // Combine date and time
      const eventDateValue = this.step2.get('eventDate')?.value;
      const eventTimeValue = this.step2.get('eventTime')?.value;

      if (!eventDateValue || !eventTimeValue) {
        console.error('Invalid date or time value');
        this.loading = false;
        return;
      }

      const eventDate = new Date(eventDateValue);
      const [time, period] = eventTimeValue.split(' ');
      const [hours, minutes] = time.split(':').map(Number);

      let adjustedHours = hours;
      if (period === 'PM' && hours < 12) {
        adjustedHours += 12;
      } else if (period === 'AM' && hours === 12) {
        adjustedHours = 0;
      }

      eventDate.setHours(adjustedHours, minutes);

      if (isNaN(eventDate.getTime())) {
        this.toastNotifications.showError(
          'Invalid date or time value',
          'Error'
        );
        console.error('Invalid date or time value');
        this.loading = false;
        return;
      }

      // Map form values to the ReservationForm interface
      const reservationData: ReservationForm = {
        numberOfPax: this.step2.get('numberOfPax')?.value,
        name: this.step1.get('name')?.value || this.accountProfileName,
        contactNumber: this.step1.get('contactNumber')?.value,
        eventDate: eventDate.toISOString(), // Ensure the date is in ISO format
        eventTime: eventTimeValue,
        eventTheme: this.step3.get('eventTheme')?.value,
        cakeTheme: this.step3.get('cakeTheme')?.value,
        otherRequest: this.step3.get('otherRequest')?.value,
        packageID: this.packageID || null,
        packageName: this.packageName,
        accountProfileId: accountProfileId,
        status: statusValue,
        paymentStatus: paymentStatusValue,
        addOnIds: this.addOnsId,
      };

      console.log('Reservation submitted:', reservationData);

      this.reservationService.createReservation(reservationData).subscribe(
        (response) => {
          console.log('Reservation created:', response);
          this.reservationSubmitted.emit(response);
          this.router.navigate(['/customer/confirmation']);
          this.loading = false;
        },
        (error) => {
          console.error('Error creating reservation:', error);
          this.loading = false;
        }
      );
    } else {
      this.toastNotifications.showWarning(
        'Please fill out all required fields',
        'Warning'
      );
      this.loading = false;
    }
  }

  // resetAddOns() {
  //   this.addOnsId = [];
  //   this.packageAddOnsService.setAddOnsId([]);
  // }
}
