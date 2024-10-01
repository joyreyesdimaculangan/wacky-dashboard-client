import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-reservation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Modal Background -->
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" *ngIf="item">

    <!-- Modal Content -->
    <div class="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">

      <!-- Close Button ('X') -->
      <button (click)="closeView()" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
        &times;
      </button>

      <!-- Modal Header -->
      <h2 class="text-xl font-bold mb-6 text-green-700">View Reservation</h2>

      <!-- Reservation Details (Pre-filled Input Fields) -->
      <div class="space-y-4">
        <div>
          <label for="reservationID" class="block text-sm font-medium text-gray-700">Reservation ID</label>
          <input id="reservationID" type="text" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
            [value]="item.reservationID" readonly>
        </div>

        <div>
          <label for="packageType" class="block text-sm font-medium text-gray-700">Package Type</label>
          <input id="packageType" type="text" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
            [value]="item.packageType" readonly>
        </div>

        <div>
          <label for="customerName" class="block text-sm font-medium text-gray-700">Customer Name</label>
          <input id="customerName" type="text" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
            [value]="item.customerName" readonly>
        </div>

        <div>
          <label for="numberofPax" class="block text-sm font-medium text-gray-700">Number of Pax</label>
          <input id="numberofPax" type="number" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
            [value]="item.numberofPax" readonly>
        </div>

        <div>
          <label for="reservationDate" class="block text-sm font-medium text-gray-700">Reservation Date</label>
          <input id="reservationDate" type="text" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
            [value]="item.reservationDate | date: 'mediumDate'" readonly>
        </div>

        <div>
          <label for="reservationTime" class="block text-sm font-medium text-gray-700">Reservation Time</label>
          <input id="reservationTime" type="text" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
            [value]="item.reservationTime" readonly>
        </div>

        <div>
          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
          <input id="status" type="text" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
            [value]="item.status" readonly>
        </div>
      </div>

      <!-- Modal Footer with Close Button (Bottom Right) -->
      <div class="mt-6 flex justify-end">
        <button (click)="closeView()" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Close
        </button>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./view-reservation-modal.component.scss']
})
export class ViewReservationModalComponent {
  @Input() item: any; // Input to receive the data from the parent
  @Output() close = new EventEmitter<void>(); // Event emitter to close the modal

  closeView() {
    this.close.emit(); // Emit event to close the view
  }
}
