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
import { EditedReservationForm, ReservationForm } from '../../../models/reservation-form';
import { GetPackageAddOnsService } from './getPackageAddOns.service';
import { GetPackageNameService } from './getPackageName.service';
import { AccountProfileService } from '../../../services/account-profile.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { PackageName } from '../../../models/packages';
import { GetAccountIdService } from './getAccountId.service';


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
  private location = inject(Location);
  private authService = inject(AuthService);
  private getAccountProfileIDService = inject(GetAccountIdService);
  private packageNameService = inject(GetPackageNameService);
  private packageAddOnsService = inject(GetPackageAddOnsService);

  packageID: PackageName | null | undefined;
  accountProfileId!: null | string | undefined;
  addOnsId: string[] = [];

  packages: any[] = [];
  accountProfileName: any[] = [];
  packageName:  PackageName | null | undefined;
  fullyBookedDates: Date[] = [];

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
      const accountProfileName = this.getAccountProfileIDService.getAccountProfileName();
      this.accountProfileId = accountProfileName?.accountProfileId;
      console.log('Account Profile ID:', this.accountProfileId);
      this.addOnsId = this.packageAddOnsService.addOnsId();
      console.log('Add-ons:', this.addOnsId);
    });
  }

  @ViewChild('stepper') stepper!: MatStepper;
  reservationForm!: FormGroup; // Use definite assignment operator
  confirmReservationForm!: FormGroup; // Use definite assignment operator

  @Input() item: any;
  @Output() reservationSubmitted = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

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

  fetchReservations() {
    this.reservationService.getReservations().subscribe({
      next: (data: EditedReservationForm[]) => {
        console.log('Fetched reservations:', data); // Debugging
        this.fullyBookedDates = this.getFullyBookedDates(data);
        console.log('Fully booked dates:', this.fullyBookedDates);
      },
      error: (error) => {
        console.error('Error fetching reservations:', error); // Error handling
      }
    });
  }

  getFullyBookedDates(reservations: EditedReservationForm[]): Date[] {
    // Logic to determine fully booked dates
    // For simplicity, assuming a date is fully booked if there are more than 5 reservations on that date
    const dateCounts: { [key: string]: number } = {};
    reservations.forEach(reservation => {
      const date = new Date(reservation.eventDate).toDateString();
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    return Object.keys(dateCounts)
      .filter(date => dateCounts[date] > 5)
      .map(date => new Date(date));
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day
    const isPastDate = date < today;
    const isFullyBooked = this.fullyBookedDates.some(
      bookedDate => bookedDate.toDateString() === date.toDateString()
    );
    const isAvailable = !isPastDate && !isFullyBooked;
    console.log(`Date ${date.toDateString()} is available: ${isAvailable}`); // Debugging
    return isAvailable;
  };

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
    if (this.reservationForm.valid) {
      const accountProfileId = this.authService.user()?.accountProfileId;
      // Ensure the status is properly set, defaulting to 'Pending' if undefined
      const statusValue: 'Pending' = this.reservationForm.value.status || 'Pending';
      const paymentStatusValue: 'PENDING' = this.reservationForm.value.paymentStatus || 'PENDING';

      // Map form values to the ReservationForm interface
      const reservationData: ReservationForm = {
        numberOfPax: this.step1.get("numberOfPax")?.value,
        name: this.step1.get("name")?.value || this.accountProfileName,
        contactNumber: this.step1.get("contactNumber")?.value,
        eventDate: this.step2.get("eventDate")?.value,
        eventTime: this.step2.get("eventTime")?.value,
        eventTheme: this.step3.get("eventTheme")?.value,
        cakeTheme: this.step3.get("cakeTheme")?.value,
        otherRequest: this.step3.get("otherRequest")?.value,
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
          this.close.emit();
          this.resetAddOns();
        },
        (error) => {
          console.error('Error creating reservation:', error);
        },
      );
    }
  }

  resetAddOns() {
    this.addOnsId = [];
    this.packageAddOnsService.setAddOnsId([]);
  }
}


