import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
  effect,
} from '@angular/core';
import {
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
import { ActivatedRoute, Router } from '@angular/router';
import { EditedReservationForm } from '../../../models/reservation-form';
import { GetAccountIdService } from '../../customer/reservation-form/getAccountId.service';
import { PackageName } from '../../../models/packages';
import { GetPackageNameService } from '../../customer/reservation-form/getPackageName.service';
import { GetPackageAddOnsService } from '../../customer/reservation-form/getPackageAddOns.service';
import { ToastNotificationsComponent } from '../../../core/toastNotifications/toastNotifications.component';
import { Location } from '@angular/common';
import { Timeslot } from '../../../models/timeslot';

@Component({
  selector: 'app-edit-reservation-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <div
      class="flex-1 bg-green-100 min-h-screen flex flex-col sticky top-0 z-50"
    >
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <button
            (click)="cancelEdit()"
            class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl p-2 rounded-full focus:outline-none"
          >
            &times;
          </button>
          <!-- Page Header -->
          <h2
            id="edit-reservation-title"
            class="text-2xl font-semibold mb-6 text-green-700 border-b pb-4"
          >
            Edit Reservation
          </h2>
          <div
            *ngIf="venue"
            class="mb-6 px-4 py-3 bg-green-50 rounded-lg border border-green-200"
          >
            <p class="text-lg font-medium text-green-800">
              Assigned Venue: {{ venue }}
            </p>
          </div>

          <!-- Edit Reservation Form -->
          <form [formGroup]="adminEditReservationForm" 
          (enterSubmit)="saveChanges()"
          appEnterSubmit
          class="space-y-6">
            <!-- Input Field Group -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Customer Name -->
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Customer Name:
                </label>
                <input
                  id="name"
                  formControlName="name"
                  name="name"
                  class="mt-2 w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <!-- Contact Number -->
              <div>
                <label
                  for="contactNumber"
                  class="block text-sm font-medium text-gray-700"
                >
                  Contact Number:
                </label>
                <input
                  id="contactNumber"
                  formControlName="contactNumber"
                  name="contactNumber"
                  class="mt-2 w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <!-- Number of Pax -->
              <div>
                <label
                  for="numberOfPax"
                  class="block text-sm font-medium text-gray-700"
                >
                  Number of Pax:
                </label>
                <input
                  id="numberOfPax"
                  formControlName="numberOfPax"
                  name="numberOfPax"
                  type="number"
                  class="mt-2 w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <!-- Event Theme -->
              <div>
                <label
                  for="eventTheme"
                  class="block text-sm font-medium text-gray-700"
                >
                  Event Theme:
                </label>
                <input
                  id="eventTheme"
                  formControlName="eventTheme"
                  name="eventTheme"
                  class="mt-2 w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <!-- Cake Theme -->
              <div>
                <label
                  for="cakeTheme"
                  class="block text-sm font-medium text-gray-700"
                >
                  Cake Theme:
                </label>
                <input
                  id="cakeTheme"
                  formControlName="cakeTheme"
                  name="cakeTheme"
                  class="mt-2 w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <!-- Reservation Date -->
            <div>
              <label
                for="eventDate"
                class="block text-sm font-medium text-gray-700"
              >
                Reservation Date:
              </label>
              <mat-form-field appearance="outline" class="w-full mt-2">
                <input
                  id="eventDate"
                  formControlName="eventDate"
                  matInput
                  [matDatepicker]="datepicker"
                  [matDatepickerFilter]="dateFilter"
                  placeholder="Select a date"
                  class="w-full"
                />
                <mat-datepicker-toggle
                  matSuffix
                  [for]="datepicker"
                ></mat-datepicker-toggle>
                <mat-datepicker #datepicker></mat-datepicker>
              </mat-form-field>
            </div>

            <!-- Time Slots -->
            <div class="form-group mb-6">
                    <label
                      class="block text-[clamp(0.875rem,1.2vw,1rem)] font-semibold text-gray-700 mb-2"
                    >
                      Time
                    </label>
                    <div
                      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                    >
                      <button
                        *ngFor="let slot of availableTimeSlots"
                        type="button"
                        [disabled]="!slot.isAvailable"
                        (click)="selectTime(slot.time)"
                        [class.bg-green-600]="
                          adminEditReservationForm.get('eventTime')?.value === slot.time
                        "
                        [class.text-white]="
                          adminEditReservationForm.get('eventTime')?.value === slot.time
                        "
                        class="p-[clamp(0.5rem,1vw,0.75rem)] text-[clamp(0.875rem,1.2vw,1rem)] border rounded-lg transition-colors duration-200 font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-green-50 enabled:hover:border-green-500"
                      >
                        {{ slot.time }}
                        <span
                          *ngIf="slot.bookingCount > 0"
                          class="text-[clamp(0.75rem,1vw,0.875rem)] block mt-1"
                        >
                          ({{ maxBookingPerSlot - slot.bookingCount }} slots
                          left)
                        </span>
                      </button>
                    </div>
                  </div>

            <!-- Textareas -->
            <div>
              <label
                for="otherRequest"
                class="block text-sm font-medium text-gray-700"
              >
                Other Requests:
              </label>
              <textarea
                id="otherRequest"
                formControlName="otherRequest"
                rows="4"
                class="mt-2 w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>

            <!-- Status Dropdown -->
            <div class="mb-6">
              <label
                for="status"
                class="block text-base font-semibold text-gray-700 mb-2"
              >
                Reservation Status
              </label>
              <select
                id="status"
                formControlName="status"
                class="w-full py-3 px-4 text-base bg-white border-2 border-gray-300 rounded-lg shadow-sm 
           hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 
           transition-all duration-200 cursor-pointer appearance-none"
              >
                <option
                  value="Pending"
                  class="py-2 text-yellow-600 font-medium"
                >
                  Pending
                </option>
                <option
                  value="Approved"
                  class="py-2 text-green-600 font-medium"
                >
                  Approved
                </option>
                <option value="Cancelled" class="py-2 text-red-600 font-medium">
                  Cancelled
                </option>
              </select>
            </div>

            <!-- Reference Number Input (if applicable) -->
            <div
              *ngIf="
                adminEditReservationForm.get('paymentStatus')?.value ===
                  'FULLY_PAID' ||
                adminEditReservationForm.get('paymentStatus')?.value ===
                  'PARTIALLY_PAID'
              "
              class="mb-6"
            >
              <label
                for="referenceNumber"
                class="block text-base font-semibold text-gray-700 mb-2"
              >
                Payment Reference Number (Optional)
              </label>
              <input
                id="referenceNumber"
                formControlName="referenceNumber"
                type="text"
                placeholder="Enter payment reference number"
                class="w-full py-3 px-4 text-base bg-white border-2 border-gray-300 rounded-lg shadow-sm 
           hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 
           transition-all duration-200"
              />
            </div>

            <!-- Payment Status Dropdown -->
            <div class="mb-6">
              <label
                for="paymentStatus"
                class="block text-base font-semibold text-gray-700 mb-2"
              >
                Payment Status
              </label>
              <select
                id="paymentStatus"
                formControlName="paymentStatus"
                class="w-full py-3 px-4 text-base bg-white border-2 border-gray-300 rounded-lg shadow-sm 
           hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 
           transition-all duration-200 cursor-pointer appearance-none"
              >
                <option
                  value="PENDING"
                  class="py-2 text-yellow-600 font-medium"
                >
                  PENDING
                </option>
                <option
                  value="PARTIALLY_PAID"
                  class="py-2 text-blue-600 font-medium"
                >
                  PARTIALLY PAID
                </option>
                <option
                  value="FULLY_PAID"
                  class="py-2 text-green-600 font-medium"
                >
                  FULLY PAID
                </option>
              </select>
            </div>

            <!-- Buttons -->
            <div class="mt-8 flex justify-end gap-4">
              <button
                type="button"
                (click)="cancelEdit()"
                class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                (click)="saveChanges()"
                (enterSubmit)="saveChanges()"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['edit-reservation-modal.component.scss'],
})
export class EditReservationModalComponent implements OnInit {
  @Input() item: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  adminEditReservationForm!: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly reservationService = inject(ReservationService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  packageID!: null | string | undefined;
  accountProfileId!: null | string | undefined;
  addOnsId: string[] = [];

  venue: string = '';
  location = inject(Location);
  packages: any[] = [];
  accountProfileName: any[] = [];
  packageName: PackageName | null = null;
  toastNotifications = inject(ToastNotificationsComponent);

  fullyBookedDates: Date[] = [];
  fullyBookedTimes: { [date: string]: string[] } = {};
  
  availableTimeSlots: Timeslot[] = [];
  maxBookingPerSlot = 4;

  reservations: EditedReservationForm[] = [];

  ngOnInit() {
    this.adminEditReservationForm = this.fb.group({
      name: [this.item?.name || '', Validators.required],
      contactNumber: [this.item?.contactNumber || '', Validators.required],
      numberOfPax: [
        this.item?.numberOfPax || '',
        [Validators.required, Validators.min(1)],
      ],
      eventDate: [this.item?.eventDate || '', Validators.required],
      eventTime: [this.item?.eventTime || '', Validators.required],
      eventTheme: [this.item?.eventTheme || ''],
      cakeTheme: [this.item?.cakeTheme || ''],
      otherRequest: [this.item?.otherRequest || ''],
      addOns: [this.item?.addOns || []],
      status: [this.item?.status || 'Pending', Validators.required],
      paymentStatus: [
        this.item?.paymentStatus || 'PENDING',
        Validators.required,
      ],
      referenceNumber: [''],
    });

    this.adminEditReservationForm
      .get('numberOfPax')
      ?.valueChanges.subscribe((pax) => {
        if (pax) {
          this.venue = this.getVenueBasedOnPax(pax);
        }
      });

    this.adminEditReservationForm
      .get('paymentStatus')
      ?.valueChanges.subscribe((status) => {
        if (status === 'FULLY_PAID' || status === 'PARTIALLY_PAID') {
          this.adminEditReservationForm.get('referenceNumber')?.enable();
        } else {
          this.adminEditReservationForm.get('referenceNumber')?.disable();
        }
      });

    this.getReservationById();
    this.fetchReservations();
    this.getFullyBookedDates(this.reservations);

    const today = new Date();
    this.generateTimeSlots(today);
  }

  generateTimeSlots(selectedDate: Date) {
    this.availableTimeSlots = [];
    const startHour = 10; // 10 AM
    const endHour = 20;   // 8 PM

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute of [0, 30]) {
        const timeString = this.formatTime(hour, minute);
        const bookingCount = this.getBookingCount(selectedDate, timeString);
        
        this.availableTimeSlots.push({
          time: timeString,
          isAvailable: bookingCount < this.maxBookingPerSlot,
          bookingCount: bookingCount
        });
      }
    }
  }

  private formatTime(hour: number, minute: number): string {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const minuteString = minute.toString().padStart(2, '0');
    return `${displayHour}:${minuteString} ${period}`;
  }

  private getBookingCount(date: Date, time: string): number {
    return this.reservations
      .filter(reservation => {
        const reservationDate = new Date(reservation.eventDate);
        return reservationDate.toDateString() === date.toDateString() && 
               reservation.eventTime === time;
      }).length;
  }

  onDateChange(event: any): void {
    const selectedDate = event.value;
    if (selectedDate) {
      this.generateTimeSlots(selectedDate);
    }
  }


  getVenueBasedOnPax(pax: number): string {
    if (pax >= 100 && pax <= 200) {
      return 'Venue A (100-200 Pax)';
    } else if (pax >= 50 && pax < 100) {
      return 'Venue B (50-99 Pax)';
    } else {
      return 'Venue C (less than 50 Pax)';
    }
  }

  fetchReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (data: EditedReservationForm[]) => {
        console.log('Fetched reservations:', data);
        this.reservations = data.reverse(); // Reverse to show latest reservations first
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

    // Return fully booked dates (more than 4 reservations)
    return Object.keys(dateCounts)
      .filter((date) => dateCounts[date] >= 4)
      .map((date) => new Date(date));
  }

  selectTime(time: string): void {
    // Update form control with selected time
    this.adminEditReservationForm.patchValue({ eventTime: time });

    // Optional: Validate time selection
    if (this.adminEditReservationForm.get('eventTime')?.value) {
      this.adminEditReservationForm.get('eventTime')?.markAsTouched();
    }
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

    // const isWithinOneMonth = date >= today && date <= oneMonthFromToday;
    const isFullyBooked = this.fullyBookedDates.some(
      (bookedDate) =>
        bookedDate.toLocaleDateString('en-CA') ===
        date.toLocaleDateString('en-CA')
    );

    const isAvailable = !isPastDate && !isFullyBooked;

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
    const selectedDate = this.adminEditReservationForm.get('eventDate')?.value;
    if (!selectedDate) {
      return false; // No date selected yet
    }

    const selectedDateISO = new Date(selectedDate).toLocaleDateString('en-CA');
    return this.fullyBookedTimes[selectedDateISO]?.includes(time) || false;
  }

  getReservationById() {
    const reservationID = this.route.snapshot.params['reservationID'];
    this.reservationService
      .getReservationById(reservationID)
      .subscribe((reservation) => {
        this.adminEditReservationForm.patchValue(reservation);
        this.packageID = reservation.packageID;
        this.accountProfileId = reservation.accountProfileId;
        this.addOnsId = reservation.addOnIds;
      });
  }

  saveChanges() {
    const reservationID = this.route.snapshot.params['reservationID'];
    const updatedReservation: EditedReservationForm = {
      reservationID,
      accountProfileId: this.accountProfileId,
      packageID: this.packageID,
      ...this.adminEditReservationForm.value,
    };

    this.reservationService
      .updateReservation(reservationID, updatedReservation)
      .subscribe(
        () => {
          console.log('Reservation updated successfully', reservationID);
          this.toastNotifications.showSuccess(
            'Reservation updated successfully',
            'Success'
          );
          this.save.emit(this.adminEditReservationForm.value);
          this.router.navigate(['/admin/reservations']); // Navigate back to reservations list
        },
        (error: any) => {
          console.error('Error updating reservation:', reservationID, error);
          this.toastNotifications.showError(
            'Error updating reservation',
            'Error'
          );
        }
      );
  }

  cancelEdit() {
    this.location.back();
  }
}
