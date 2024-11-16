import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-reservation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Modal Background -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      *ngIf="item"
    >
      <!-- Modal Content -->
      <div
        class="bg-white shadow-xl rounded-lg w-[800px] max-w-full relative p-8 animate-fade-in"
      >
        <!-- Close Button ('X') -->
        <button
          (click)="closeView()"
          class="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl p-1 rounded-full focus:outline-none transition-all"
          aria-label="Close Modal"
        >
          &times;
        </button>

        <!-- Modal Header -->
        <h2 class="text-2xl font-semibold mb-6 text-green-700 border-b pb-4">
          View Reservation Details
        </h2>

        <!-- Reservation Details (Pre-filled Input Fields) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              for="reservationID"
              class="block text-sm font-medium text-gray-600"
              >Reservation ID</label
            >
            <input
              id="reservationID"
              type="text"
              class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
              [value]="item.reservationID"
              readonly
            />
          </div>

          <div>
            <label
              for="packageType"
              class="block text-sm font-medium text-gray-600"
              >Package Type</label
            >
            <input
              id="packageType"
              type="text"
              class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
              [value]="item.packageID"
              readonly
            />
          </div>

          <div>
            <label
              for="customerName"
              class="block text-sm font-medium text-gray-600"
              >Customer Name</label
            >
            <input
              id="customerName"
              type="text"
              class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
              [value]="item.name"
              readonly
            />
          </div>

          <div>
            <label
              for="contactNumber"
              class="block text-sm font-medium text-gray-600"
              >Contact Number</label
            >
            <input
              id="contactNumber"
              type="number"
              class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
              [value]="item.contactNumber"
              readonly
            />
          </div>

          <div>
            <label
              for="numberOfPax"
              class="block text-sm font-medium text-gray-600"
              >Number of Pax</label
            >
            <input
              id="numberOfPax"
              type="number"
              class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
              [value]="item.numberOfPax"
              readonly
            />
          </div>

          <div>
            <label
              for="eventDate"
              class="block text-sm font-medium text-gray-600"
              >Reservation Date</label
            >
            <input
              id="eventDate"
              type="text"
              class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
              [value]="item.eventDate | date : 'mediumDate'"
              readonly
            />
          </div>

          <div>
            <label
              for="eventTime"
              class="block text-sm font-medium text-gray-600"
              >Reservation Time</label
            >
            <input
              id="eventTime"
              type="text"
              class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
              [value]="item.eventTime"
              readonly
            />
          </div>

          <div>
            <label
              for="eventTheme"
              class="block text-sm font-medium text-gray-600"
              >Event Theme</label
            >
            <input
              id="eventTheme"
              type="text"
              class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
              [value]="item.eventTheme"
              readonly
            />
          </div>

          <div>
            <label
              for="cakeTheme"
              class="block text-sm font-medium text-gray-600"
              >Cake Theme</label
            >
            <input
              id="cakeTheme"
              type="text"
              class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
              [value]="item.cakeTheme"
              readonly
            />
          </div>

          <div>
            <label for="status" class="block text-sm font-medium text-gray-600"
              >Status</label
            >
            <input
              id="status"
              type="text"
              class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
              [value]="item.status"
              readonly
            />
          </div>

          <div>
            <label
              for="paymentStatus"
              class="block text-sm font-medium text-gray-600"
              >Payment Status</label
            >
            <input
              id="paymentStatus"
              type="text"
              class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
              [value]="item.paymentStatus"
              readonly
            />
          </div>
        </div>

        <!-- Modal Footer with Close Button -->
        <div class="mt-8 flex justify-end">
          <button
            (click)="closeView()"
            class="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-600 shadow-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./view-reservation-modal.component.scss'],
})
export class ViewReservationModalComponent {
  @Input() item: any; // Input to receive the data from the parent
  @Output() close = new EventEmitter<void>(); // Event emitter to close the modal

  closeView() {
    this.close.emit(); // Emit event to close the view
  }
}
