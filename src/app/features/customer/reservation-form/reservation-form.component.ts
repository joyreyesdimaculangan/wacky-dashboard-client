import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  effect,
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
import { ReservationForm } from '../../../models/reservation-form';
import { GetPackageAddOnsService } from './getPackageAddOns.service';
import { GetPackageNameService } from './getPackageName.service';
import { AccountProfileService } from '../../../services/account-profile.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { PackageName } from '../../../models/packages';


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
  private accountProfileService = inject(AccountProfileService);
  private packageNameService = inject(GetPackageNameService);
  private packageAddOnsService = inject(GetPackageAddOnsService);

  packages: any[] = [];
  addOns: any[] = [];
  packageName: PackageName | null = null;
  packageAddOns: string[] = [];
  accountProfileId: string = '';

  constructor() {
    effect(() => {
      console.log(this.packageNameService.packageName());
      console.log(this.packageAddOnsService.packageDetails());
    });
  }

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
      // packageID: [null, Validators.required],
      // addOnID: this.fb.array([]),
      // accountProfileId: [null, Validators.required],
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

    const packageName = this.packageNameService.getPackageName();
    if (packageName) {
      this.packageName = {
        packageId: packageName.packageId,
        packageName: packageName.packageName,
      };
    }

    const packageDetails = this.packageAddOnsService.getPackageDetails();
    if (packageDetails) {
      this.packageAddOns = packageDetails;
      const addOnsFormArray = this.reservationForm.get('addOns') as FormArray;
      this.packageAddOns.forEach(addOn => addOnsFormArray.push(this.fb.control(addOn)));
    }

    this.accountProfileService.getAccountProfile().subscribe(
      (profile) => {
        this.accountProfileId = profile.id;
      },
      (error) => {
        console.error('Error fetching account profile ID:', error);
      },
    );
    console.log('Account Profile ID:', this.accountProfileId);
    console.log('Package Name:', this.packageName);
    console.log('Package Add-Ons:', this.packageAddOns);
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
    this.location.back();
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
      const paymentStatusValue: 'PENDING' = this.reservationForm.value.paymentStatus || 'PENDING';

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
        packageID: this.reservationForm.get("packageID")?.value,
        accountProfileId: '',
        status: statusValue,
        paymentStatus: paymentStatusValue,
        addOnIds: this.reservationForm.get("addOnIds")?.value
      };

      console.log('Reservation submitted:', reservationData);

      this.reservationService.createReservation(reservationData).subscribe(
        (response) => {
          console.log('Reservation created:', response);
          this.reservationSubmitted.emit(response);
          this.close.emit();
        },
        (error) => {
          console.error('Error creating reservation:', error);
        },
      );
    }
  }
}
