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
      <div class="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-[800px] max-w-full relative max-h-[90vh] overflow-y-auto">
        <!-- Close Button ('X') -->
        <button (click)="closeView()" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl p-2 rounded-full focus:outline-none">
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
              [value]="item.name" readonly>
          </div>

          <div>
            <label for="contactNumber" class="block text-sm font-medium text-gray-700">Contact Number</label>
            <input id="contactNumber" type="number" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900" 
              [value]="item.contactNumber" readonly>
          </div>

          <div>
            <label for="numberOfPax" class="block text-sm font-medium text-gray-700">Number of Pax</label>
            <input id="numberOfPax" type="number" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900" 
              [value]="item.numberOfPax" readonly>
          </div>

          <div>
            <label for="eventDate" class="block text-sm font-medium text-gray-700">Reservation Date</label>
            <input id="eventDate" type="text" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900" 
              [value]="item.eventDate | date: 'mediumDate'" readonly>
          </div>

          <div>
            <label for="eventTime" class="block text-sm font-medium text-gray-700">Reservation Time</label>
            <input id="eventTime" type="text" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900" 
              [value]="item.eventTime" readonly>
          </div>

          <div>
            <label for="eventTheme" class="block text-sm font-medium text-gray-700">Event Theme</label>
            <input id="eventTheme" type="text" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900" 
              [value]="item.eventTheme" readonly>
          </div>

          <div>
            <label for="cakeTheme" class="block text-sm font-medium text-gray-700">Cake Theme</label>
            <input id="cakeTheme" type="text" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900" 
              [value]="item.cakeTheme" readonly>
          </div>

          <div>
            <label for="cakeMessage" class="block text-sm font-medium text-gray-700">Cake Message</label>
            <input id="cakeMessage" type="text" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900" 
              [value]="item.cakeMessage" readonly>
          </div>

          <div>
            <label for="otherRequest" class="block text-sm font-medium text-gray-700">Other Request</label>
            <input id="otherRequest" type="text" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900" 
              [value]="item.otherRequest" readonly>
          </div>

          <div>
            <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
            <input id="status" type="text" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900" 
              [value]="item.status" readonly>
          </div>

          <!-- Event Details (if needed) -->
          <div *ngIf="selectedEvent">
            <h3 class="text-lg font-semibold mt-4">Event Details:</h3>
            <div class="mt-2 text-gray-700">
              <p><strong>Event Name:</strong> {{ selectedEvent.name }}</p>
              <p><strong>Event Description:</strong> {{ selectedEvent.description }}</p>
              <!-- Add more fields as needed -->
            </div>
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
  @Input() selectedEvent: any; // Input to receive the selected event
  @Output() close = new EventEmitter<void>(); // Event emitter to close the modal

  closeView() {
    this.close.emit(); // Emit event to close the view
  }
}
