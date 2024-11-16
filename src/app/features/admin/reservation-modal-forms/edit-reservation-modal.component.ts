import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';

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
    <!-- Modal Background -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      *ngIf="item"
      role="dialog"
      aria-labelledby="edit-reservation-title"
      aria-modal="true"
    >
      <!-- Modal Content -->
      <div
        class="modal-content w-[90%] md:w-[800px] max-w-full relative bg-white p-6 rounded-lg shadow-lg"
      >
        <!-- Close Button ('X') -->
        <button
          (click)="cancelEdit()"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Close"
        >
          &times;
        </button>

        <!-- Modal Header -->
        <h2
          id="edit-reservation-title"
          class="text-2xl font-semibold mb-6 text-green-700"
        >
          Edit Reservation
        </h2>

        <!-- Edit Reservation Form -->
        <form [formGroup]="adminEditReservationForm" class="space-y-6">
          <!-- Input Field Group -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Customer Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
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
                [matDatepicker]="datepicker"
                formControlName="eventDate"
                matInput
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

          <!-- Time Input -->
          <div class="form-group mb-6">
            <label
              class="block text-base font-semibold text-gray-800 mb-2 text-left"
              >Time</label
            >
            <ul class="grid grid-cols-2 gap-4">
              <li
                *ngFor="
                  let time of [
                    '10:00 AM',
                    '10:30 AM',
                    '11:00 AM',
                    '3:00 PM',
                    '3:30 PM',
                    '4:00 PM'
                  ];
                  let i = index
                "
              >
                <input
                  type="radio"
                  [id]="'time' + i"
                  [value]="time"
                  class="hidden peer"
                  formControlName="eventTime"
                  required
                />
                <label
                  [for]="'time' + i"
                  class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border border-green-600 rounded-lg cursor-pointer text-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500 transition duration-300 ease-in-out"
                >
                  {{ time }}
                </label>
              </li>
            </ul>
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
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700">
              Status:
            </label>
            <select
              id="status"
              formControlName="status"
              class="mt-2 w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <!-- Payment Status Dropdown -->
          <div>
            <label
              for="paymentStatus"
              class="block text-sm font-medium text-gray-700"
            >
              Payment Status:
            </label>
            <select
              id="paymentStatus"
              formControlName="paymentStatus"
              class="mt-2 w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">PAID</option>
              <option value="CANCELLED">FAILED</option>
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
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['edit-reservation-modal.component.scss'],
})
export class EditReservationModalComponent {
  @Input() item: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  adminEditReservationForm!: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly reservationService = inject(ReservationService);
  private readonly route = inject(ActivatedRoute);

  editedItem: any;

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
      status: [this.item?.status || 'Pending', Validators.required],
      paymentStatus: [
        this.item?.paymentStatus || 'PENDING',
        Validators.required,
      ],
    });

    this.getReservationById();
  }

  getReservationById() {
    const reservationID = this.route.snapshot.params['reservationID'];
    this.reservationService
      .getReservationById(reservationID)
      .subscribe((reservation) => {
        this.adminEditReservationForm.patchValue(reservation);
      });
  }

  saveChanges() {
    const reservationID = this.route.snapshot.params['reservationID'];
    this.reservationService
      .updateReservation(reservationID, this.adminEditReservationForm.value)
      .subscribe(
        () => {
          console.log('Reservation updated successfully');
          this.save.emit(this.adminEditReservationForm.value);
        },
        (error: any) => {
          console.error('Error updating reservation:', error);
        }
      );
  }

  cancelEdit() {
    this.cancel.emit(); // Emit event to cancel editing
  }
}
