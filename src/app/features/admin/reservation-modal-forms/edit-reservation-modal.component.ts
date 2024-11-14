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
    >
      <!-- Modal Content -->
      <div
        class="modal-content w-[800px] max-w-full relative bg-white p-6 rounded-lg shadow-lg"
      >
        <!-- Close Button ('X') -->
        <button
          (click)="cancelEdit()"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl p-2 rounded-full focus:outline-none"
        >
          &times;
        </button>

        <!-- Modal Header -->
        <h2 class="text-xl font-bold mb-6 text-green-700">Edit Reservation</h2>

        <!-- Edit Reservation Form -->
        <form [formGroup]="adminEditReservationForm" class="space-y-5">
          <!-- Package Type Input -->
          <div>
            <label
              for="packageType"
              class="block text-sm font-medium text-gray-700"
              >Package Type:</label
            >
            <input
              id="packageType"
              formControlName="packageType"
              name="packageType"
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <!-- Customer Name Input -->
          <div>
            <label
              for="customerName"
              class="block text-sm font-medium text-gray-700"
              >Customer Name:</label
            >
            <input
              id="customerName"
              formControlName="customerName"
              name="customerName"
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <!-- Contact Number Input -->
          <div>
            <label
              for="contactNumber"
              class="block text-sm font-medium text-gray-700"
              >Contact Number:</label
            >
            <input
              id="contactNumber"
              formControlName="contactNumber"
              name="contactNumber"
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <!-- Number of Pax Input -->
          <div>
            <label
              for="numberOfPax"
              class="block text-sm font-medium text-gray-700"
              >Number of Pax:</label
            >
            <input
              id="numberOfPax"
              formControlName="numberOfPax"
              name="numberOfPax"
              type="number"
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <!-- Reservation Date Input -->
          <div>
            <label
              for="datepicker"
              class="block text-sm font-medium text-gray-700"
              >Reservation Date:</label
            >
            <mat-form-field appearance="outline" class="w-full">
              <input
                id="eventDate"
                [matDatepicker]="datepicker"
                formControlName="eventDate"
                name="eventDate"
                matInput
                placeholder="Select a date"
                class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
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

          <!-- Event Theme Input -->
          <div>
            <label
              for="eventTheme"
              class="block text-sm font-medium text-gray-700"
              >Event Theme:</label
            >
            <input
              id="eventTheme"
              formControlName="eventTheme"
              name="eventTheme"
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <!-- Cake Theme Input -->
          <div>
            <label
              for="cakeTheme"
              class="block text-sm font-medium text-gray-700"
              >Cake Theme:</label
            >
            <input
              id="cakeTheme"
              formControlName="cakeTheme"
              name="cakeTheme"
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <!-- Other Requests Input -->
          <div>
            <label
              for="otherRequest"
              class="block text-sm font-medium text-gray-700"
              >Other Requests:</label
            >
            <textarea
              id="otherRequest"
              formControlName="otherRequest"
              name="otherRequest"
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          <!-- Status Input -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700"
              >Status:</label
            >
            <select
              id="status"
              formControlName="status"
              name="status"
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <!-- Payment Status Input -->
          <div>
            <label
              for="paymentStatus"
              class="block text-sm font-medium text-gray-700"
              >Payment Status:</label
            >
            <select
              id="paymentStatus"
              formControlName="paymentStatus"
              name="paymentStatus"
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="50% Downpayment">50% Downpayment</option>
              <option value="Fully Paid">Fully Paid</option>
            </select>
          </div>

          <!-- Modal Footer with Buttons -->
          <div class="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              (click)="cancelEdit()"
              class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
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
  @Input() item: any; // Input to receive the data from the parent
  @Output() save = new EventEmitter<any>(); // Event emitter to save the changes
  @Output() cancel = new EventEmitter<void>(); // Event emitter to cancel the operation
  adminEditReservationForm!: FormGroup; // Define a property to store the form data

  private readonly fb = inject(FormBuilder); // Inject the form builder service
  editedItem: any;

  ngOnInit() {
    this.adminEditReservationForm = this.fb.group({
      packageType: [this.item?.packageType || '', Validators.required],
      customerName: [this.item?.customerName || '', Validators.required],
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
        this.item?.paymentStatus || '50% Downpayment',
        Validators.required,
      ],
    });
  }

  saveChanges() {
    this.save.emit(this.adminEditReservationForm.value); // Emit the edited data to the parent
  }

  cancelEdit() {
    this.cancel.emit(); // Emit event to cancel editing
  }
}
