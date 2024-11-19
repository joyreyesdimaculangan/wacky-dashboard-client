import { CommonModule } from '@angular/common';
import {
  Component,
  Output,
  EventEmitter,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReservationService } from '../../../services/reservation.service';
import { PackagesService } from '../../../services/packages.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { PackageAddOnsService } from '../../../services/packageAddOns.service';
import { AvailableAddOns, Packages } from '../../../models/packages';
import { PackageAddOns } from '../../../models/packageAddOns';
import { environment } from '../../../../environments/environment.development';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { EditedReservationForm } from '../../../models/reservation-form';

@Component({
  selector: 'app-add-reservation-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      *ngIf="showModal"
    >
      <div
        class="relative bg-white p-8 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition duration-300 ease-in-out scale-95"
      >
        <!-- Close Button -->
        <button
          (click)="closeAddReservation()"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl p-2 rounded-full focus:outline-none transition-colors duration-200 ease-in-out"
          aria-label="Close"
        >
          &times;
        </button>

        <!-- Modal Header -->
        <h2
          class="text-3xl font-extrabold mb-8 text-green-700 text-center text-green py-2 rounded-lg"
        >
          Create Reservation
        </h2>

        <!-- Reservation Form -->
        <form [formGroup]="adminReservationForm">
          <div class="space-y-6">
            <!-- Package Type -->
            <div class="relative">
              <label
                for="packageID"
                class="block text-sm font-medium text-gray-700"
                >Package Type</label
              >
              <mat-select
                id="packageID"
                type="text"
                formControlName="packageID"
                name="packageType"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-green focus:ring-green-500 focus:border-green-500 transition-all"
                required
              >
                <mat-option
                  *ngFor="let package of packages"
                  [value]="package.packageID"
                >
                  {{ package.name }}
                </mat-option>
              </mat-select>
            </div>

            <!-- Customer Name -->
            <div class="relative">
              <label for="name" class="block text-sm font-medium text-gray-700"
                >Customer Name</label
              >
              <input
                id="name"
                type="text"
                formControlName="name"
                name="name"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-green-500 focus:border-green-500 transition-all"
                required
              />
              <mat-error *ngIf="adminReservationForm.get('name')?.hasError('required') && adminReservationForm.get('name')?.touched">
                Please enter a name
              </mat-error>
              <mat-error *ngIf="adminReservationForm.get('name')?.hasError('pattern') && adminReservationForm.get('name')?.touched">
                Please enter a valid name
              </mat-error>
            </div>

            <!-- Contact Number -->
            <div class="relative">
              <label
                for="contactNumber"
                class="block text-sm font-medium text-gray-700"
                >Contact Number</label
              >
              <input
                id="contactNumber"
                type="tel"
                formControlName="contactNumber"
                name="contactNumber"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-green-500 focus:border-green-500 transition-all"
                required
              />
              <mat-error *ngIf="adminReservationForm.get('contactNumber')?.hasError('required') && adminReservationForm.get('contactNumber')?.touched">
                Please enter a contact number
              </mat-error>
              <mat-error *ngIf="adminReservationForm.get('contactNumber')?.hasError('pattern') && adminReservationForm.get('contactNumber')?.touched">
                Please enter a valid contact number
              </mat-error>
            </div>

            <!-- Number of Pax -->
            <div class="relative">
              <label
                for="numberOfPax"
                class="block text-sm font-medium text-gray-700"
                >Number of Pax</label
              >
              <input
                id="numberOfPax"
                type="number"
                formControlName="numberOfPax"
                name="numberOfPax"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-green-500 focus:border-green-500 transition-all"
                required
                min="1"
              />
              <mat-error *ngIf="adminReservationForm.get('numberOfPax')?.hasError('required') && adminReservationForm.get('numberOfPax')?.touched">
                Please enter the number of pax
              </mat-error>
              <mat-error *ngIf="adminReservationForm.get('numberOfPax')?.hasError('min') && adminReservationForm.get('numberOfPax')?.touched">
                Minimum of 50 pax
              </mat-error>
              <mat-error *ngIf="adminReservationForm.get('numberOfPax')?.hasError('max') && adminReservationForm.get('numberOfPax')?.touched">
                Maximum of 200 pax
              </mat-error>
              <mat-error *ngIf="adminReservationForm.get('numberOfPax')?.hasError('pattern') && adminReservationForm.get('numberOfPax')?.touched">
                Please enter a valid number
              </mat-error>
            </div>

            <!-- Reservation Date -->
            <div class="form-group relative">
              <label
                for="eventDate"
                class="block text-sm font-medium text-gray-700"
                >Reservation Date</label
              >
              <mat-form-field appearance="outline" class="w-full">
                <input
                  matInput
                  [matDatepicker]="datepicker"
                  [matDatepickerFilter]="dateFilter"
                  formControlName="eventDate"
                  placeholder="Select a date"
                  class="text-sm p-3 text-gray-900 focus:ring-green-500 focus:border-green-500 w-full rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out"
                />
                <mat-error *ngIf="adminReservationForm.get('eventDate')?.hasError('required') && adminReservationForm.get('eventDate')?.touched">
                  Please select a date
                </mat-error>
                <mat-error
                    *ngIf="
                      adminReservationForm.get('eventDate')?.hasError('matDatepickerFilter') &&
                      adminReservationForm.get('eventDate')?.touched
                    "
                    >Event date is unavailable</mat-error
                  >
                <mat-datepicker-toggle
                  matSuffix
                  [for]="datepicker"
                ></mat-datepicker-toggle>
                <mat-datepicker #datepicker></mat-datepicker>
              </mat-form-field>
            </div>

            <!-- Time Picker -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700"
                >Select Time</label
              >
              <ul class="grid grid-cols-2 gap-4 mt-2">
                <li *ngFor="let time of availableTimes; let i = index">
                  <input
                    type="radio"
                    [id]="'time' + i"
                    [value]="time"
                    class="hidden peer"
                    formControlName="eventTime"
                    [disabled]="
                      isTimeDisabled(
                        adminReservationForm.get('eventDate')?.value,
                        time
                      )
                    "
                    required
                  />
                  <label
                    [for]="'time' + i"
                    class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border border-green-600 rounded-lg cursor-pointer text-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500 transition duration-300 ease-in-out"
                    [ngClass]="{
                      'opacity-50 cursor-not-allowed': isTimeDisabled(
                        adminReservationForm.get('eventDate')?.value,
                        time
                      )
                    }"
                  >
                    {{ time }}
                  </label>
                </li>
                <mat-error
                    *ngIf="
                      adminReservationForm.get('eventTime')?.hasError('required') &&
                      adminReservationForm.get('eventTime')?.touched
                    "
                    >Event time is required</mat-error
                  >
                  <mat-error
                    *ngIf="
                      adminReservationForm
                        .get('eventTime')
                        ?.hasError('matDatepickerFilter') &&
                        adminReservationForm.get('eventTime')?.touched
                    "
                    >Event time is unavailable</mat-error
                  >
              </ul>
            </div>

            <!-- Additional Fields -->
            <div class="relative">
              <label
                for="eventTheme"
                class="block text-sm font-medium text-gray-700"
                >Event Theme</label
              >
              <input
                id="eventTheme"
                type="text"
                formControlName="eventTheme"
                name="eventTheme"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-green-500 focus:border-green-500 transition-all"
              />
              <mat-error *ngIf="adminReservationForm.get('eventTheme')?.hasError('required') && adminReservationForm.get('eventTheme')?.touched">
                Please enter an event theme
              </mat-error>
              <mat-error *ngIf="adminReservationForm.get('eventTheme')?.hasError('pattern') && adminReservationForm.get('eventTheme')?.touched">
                Please enter a valid event theme
              </mat-error>
            </div>

            <div class="relative">
              <label
                for="cakeTheme"
                class="block text-sm font-medium text-gray-700"
                >Cake Theme</label
              >
              <input
                id="cakeTheme"
                type="text"
                formControlName="cakeTheme"
                name="cakeTheme"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-green-500 focus:border-green-500 transition-all"
              />
              <mat-error *ngIf="adminReservationForm.get('cakeTheme')?.hasError('required') && adminReservationForm.get('cakeTheme')?.touched">
                Please enter a cake theme
              </mat-error>
              <mat-error *ngIf="adminReservationForm.get('cakeTheme')?.hasError('pattern') && adminReservationForm.get('cakeTheme')?.touched">
                Please enter a valid cake theme
              </mat-error>
            </div>

            <div class="relative">
              <label
                for="otherRequest"
                class="block text-sm font-medium text-gray-700"
                >Other Requests</label
              >
              <input
                id="otherRequest"
                type="text"
                formControlName="otherRequest"
                name="otherRequest"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-green-500 focus:border-green-500 transition-all"
              />
              <mat-error *ngIf="adminReservationForm.get('otherRequest')?.hasError('pattern') && adminReservationForm.get('otherRequest')?.touched">
                Please enter a valid request
              </mat-error>
            </div>

            <!-- AddOns -->
            <div class="relative">
              <label
                for="addOns"
                class="block text-sm font-medium text-gray-700"
                >AddOns Included</label
              >
              <mat-select
                id="addOns"
                formControlName="addOns"
                name="addOns"
                multiple
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-green focus:ring-green-500 focus:border-green-500 transition-all"
              >
                <mat-option
                  *ngFor="let availableAddOns of addonsPackageSelected()"
                  [value]="availableAddOns.addOnID"
                >
                  {{ availableAddOns.name }}
                </mat-option>
              </mat-select>
              <mat-error *ngIf="adminReservationForm.get('addOns')?.hasError('required') && adminReservationForm.get('addOns')?.touched">
                Please select at least one add-on
              </mat-error>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="mt-8 flex justify-end gap-3">
            <button
              type="button"
              (click)="closeAddReservation()"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              (click)="submitForm()"
              class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./add-reservation-modal.component.scss'],
})
export class AddReservationModalComponent implements OnInit {
  private readonly packageService = inject(PackagesService);
  private readonly reservationService = inject(ReservationService);
  private readonly getPackageAddOnsService = inject(PackageAddOnsService);
  private readonly authService = inject(AuthService);
  private fb = inject(FormBuilder);

  adminReservationForm!: FormGroup;
  availableAddOns: PackageAddOns[] = [];
  packages: Packages[] = [];
  addOns: PackageAddOns[] = [];
  packageSelected!: Packages | undefined;

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

  constructor() {
    this.adminReservationForm = this.fb.group({
      packageID: ['', Validators.required],
      name: ['', Validators.required, Validators.pattern('^[a-zA-Z ]+$')],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      numberOfPax: [50, [Validators.required, Validators.min(50), Validators.max(200), Validators.pattern('^[0-9]+$')]], 
      eventDate: ['', Validators.required, this.dateFilter, Validators.pattern('^[0-9]+$') ],
      eventTime: ['', Validators.required, this.isTimeDisabled, Validators.pattern('^[0-9]+$')],
      eventTheme: ['', Validators.required, Validators.pattern('^[a-zA-Z ]+$')],
      cakeTheme: ['', Validators.required, Validators.pattern('^[a-zA-Z ]+$')],
      addOns: [[], Validators.required],
      otherRequest: ['', Validators.pattern('^[a-zA-Z ]+$')],
      paymentStatus: ['PENDING'],
      status: ['Pending'],
    });
  }

  addonsPackageSelected = signal<PackageAddOns[]>([]);
  ngOnInit() {
    this.fetchPackages();
    this.fetchAddOnsId(this.adminReservationForm.value.packageType);
    this.fetchReservations();
    this.getFullyBookedDates(this.reservations);
    this.populateFullyBookedTimes(this.reservations);

    // Assign Selected Package on packageSelected
    this.adminReservationForm
      .get('packageID')
      ?.valueChanges.subscribe((packageId) => {
        const selectedPackage = this.packages.find(
          (pkg: Packages) => pkg.packageID === packageId
        );
        console.log('Selected Package:', selectedPackage?.availableAddOns);
        if (selectedPackage?.availableAddOns) {
          this.addonsPackageSelected.set(selectedPackage.availableAddOns);
        }
        console.log('Selected Package:', this.addonsPackageSelected());
        this.packageSelected = selectedPackage;
      });
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
      const date = new Date(reservation.eventDate).toISOString().split('T')[0]; // Use ISO string for consistent date comparison
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    // Return fully booked dates (more than 6 reservations)
    return Object.keys(dateCounts)
      .filter((date) => dateCounts[date] > 6)
      .map((date) => new Date(date));
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    const isPastDate = date < today;
    const isFullyBooked = this.fullyBookedDates.some(
      (bookedDate) =>
        bookedDate.toISOString().split('T')[0] ===
        date.toISOString().split('T')[0]
    );

    const isAvailable = !isPastDate && !isFullyBooked;

    console.log(`Date ${date.toDateString()} is available: ${isAvailable}`); // Debugging
    return isAvailable;
  };

  populateFullyBookedTimes(reservations: EditedReservationForm[]): void {
    this.fullyBookedTimes = {}; // Reset before populating

    reservations.forEach((reservation) => {
      const date = new Date(reservation.eventDate).toISOString().split('T')[0];
      if (!this.fullyBookedTimes[date]) {
        this.fullyBookedTimes[date] = [];
      }
      this.fullyBookedTimes[date].push(reservation.eventTime); // Assume reservation.eventTime is a string like '10:00 AM'
    });
  }

  isTimeDisabled(date: string, time: string): boolean {
    const selectedDate = this.adminReservationForm.get('eventDate')?.value;
    if (!selectedDate) {
      return false; // No date selected yet
    }

    const selectedDateISO = new Date(selectedDate).toISOString().split('T')[0];
    return this.fullyBookedTimes[selectedDateISO]?.includes(time) || false;
  }

  fetchPackages() {
    this.packageService.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }

  fetchAddOnsId(packageId: string) {
    this.getPackageAddOnsService
      .getAddOnById(packageId)
      .subscribe((data: AvailableAddOns[]) => {
        this.availableAddOns = data;
      });
  }

  @Output() closeModal = new EventEmitter<void>();
  showModal = true; // Initial value to show the modal
  reservation = {
    packageType: '',
    name: '',
    contactNumber: '',
    numberOfPax: 1,
    eventDate: null,
    eventTime: '',
    eventTheme: '',
    cakeTheme: '',
    otherRequest: '',
    addOns: '',
  };

  closeAddReservation() {
    this.showModal = false; // Hides the modal
    this.closeModal.emit(); // Emits event to the parent component
  }

  submitForm() {
    const user = this.authService.getUser(
      localStorage.getItem(environment.TOKEN_NAME) || ''
    );
    const accountProfileId = this.authService.userInfo?.accountProfileId;
    console.log('Account Profile ID:', accountProfileId);
    const reservationData = {
      ...this.adminReservationForm.value,
      accountProfileId,
    };
    console.log('Reservation Data:', reservationData);
    this.reservationService.createReservation(reservationData).subscribe(
      (response) => {
        console.log('Reservation created:', response);
        this.closeAddReservation();
      },
      (error) => {
        console.error('Error creating reservation:', error);
      }
    );
  }
}
