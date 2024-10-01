import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule],
  template: `
    <!-- Modal Background -->
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" *ngIf="item">
      <!-- Modal Content -->
      <div class="modal-content w-[800px] max-w-full relative">
        <!-- Close Button ('X') -->
        <button (click)="cancelEdit()" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl p-2 rounded-full focus:outline-none">
          &times;
        </button>

        <!-- Modal Header -->
        <h2 class="text-xl font-bold mb-6 text-green-700">Edit Reservation</h2>

        <!-- Edit Reservation Form -->
        <form class="space-y-5">
          <!-- Package Type Input -->
          <div>
            <label for="packageType" class="block text-sm font-medium text-gray-700">Package Type:</label>
            <input id="packageType" [(ngModel)]="editedItem.packageType" name="packageType" 
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <!-- Customer Name Input -->
          <div>
            <label for="customerName" class="block text-sm font-medium text-gray-700">Customer Name:</label>
            <input id="customerName" [(ngModel)]="editedItem.name" name="customerName" 
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <!-- Contact Number Input -->
          <div>
            <label for="contactNumber" class="block text-sm font-medium text-gray-700">Contact Number:</label>
            <input id="contactNumber" [(ngModel)]="editedItem.contactNumber" name="contactNumber" 
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <!-- Number of Pax Input -->
          <div>
            <label for="numberOfPax" class="block text-sm font-medium text-gray-700">Number of Pax:</label>
            <input id="numberOfPax" [(ngModel)]="editedItem.numberOfPax" name="numberOfPax" type="number" 
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <!-- Reservation Date Input -->
          <div>
            <label for="eventDate" class="block text-sm font-medium text-gray-700">Reservation Date:</label>
            <mat-form-field appearance="outline" class="w-full">
              <input
                id="eventDate" 
                [(ngModel)]="editedItem.eventDate" 
                name="eventDate" 
                matInput
                placeholder="Select a date"
                class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <mat-datepicker-toggle matSuffix></mat-datepicker-toggle>
              <mat-datepicker #datepicker></mat-datepicker>
            </mat-form-field>
          </div>

          <!-- Time Input -->
          <div id="reservationTime" class="mb-6">
            <label class="block text-sm font-medium text-gray-700">Reservation Time:</label>
            <ul class="grid grid-cols-2 gap-4">
              <li>
                <input type="radio" id="10-am" value="10:00 AM" [(ngModel)]="editedItem.eventTime" class="hidden peer" name="timetable" />
                <label for="10-am" class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-green-600 border-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500">10:00 AM</label>
              </li>
              <li>
                <input type="radio" id="10-30-am" value="10:30 AM" [(ngModel)]="editedItem.eventTime" class="hidden peer" name="timetable" />
                <label for="10-30-am" class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-green-600 border-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500">10:30 AM</label>
              </li>
              <li>
                <input type="radio" id="11-am" value="11:00 AM" [(ngModel)]="editedItem.eventTime" class="hidden peer" name="timetable" />
                <label for="11-am" class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-green-600 border-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500">11:00 AM</label>
              </li>
              <li>
                <input type="radio" id="3-pm" value="3:00 PM" [(ngModel)]="editedItem.eventTime" class="hidden peer" name="timetable" />
                <label for="3-pm" class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-green-600 border-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500">3:00 PM</label>
              </li>
              <li>
                <input type="radio" id="3-30-pm" value="3:30 PM" [(ngModel)]="editedItem.eventTime" class="hidden peer" name="timetable" />
                <label for="3-30-pm" class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-green-600 border-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500">3:30 PM</label>
              </li>
              <li>
                <input type="radio" id="4-pm" value="4:00 PM" [(ngModel)]="editedItem.eventTime" class="hidden peer" name="timetable" />
                <label for="4-pm" class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-green-600 border-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500">4:00 PM</label>
              </li>
            </ul>
          </div>

          <!-- Event Theme Input -->
          <div>
            <label for="eventTheme" class="block text-sm font-medium text-gray-700">Event Theme:</label>
            <input id="eventTheme" [(ngModel)]="editedItem.eventTheme" name="eventTheme" 
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <!-- Cake Theme Input -->
          <div>
            <label for="cakeTheme" class="block text-sm font-medium text-gray-700">Cake Theme:</label>
            <input id="cakeTheme" [(ngModel)]="editedItem.cakeTheme" name="cakeTheme" 
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <!-- Cake Message Input -->
          <div>
            <label for="cakeMessage" class="block text-sm font-medium text-gray-700">Cake Message:</label>
            <input id="cakeMessage" [(ngModel)]="editedItem.cakeMessage" name="cakeMessage" 
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <!-- Other Requests Input -->
          <div>
            <label for="otherRequest" class="block text-sm font-medium text-gray-700">Other Requests:</label>
            <textarea id="otherRequest" [(ngModel)]="editedItem.otherRequest" name="otherRequest" 
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
          </div>

          <!-- Status Input -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700">Status:</label>
            <select id="status" [(ngModel)]="editedItem.status" name="status" 
              class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <!-- Modal Footer with Buttons -->
          <div class="mt-8 flex justify-end space-x-4">
            <button type="button" (click)="saveChanges()" 
              class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none">
              Save
            </button>
            <button type="button" (click)="cancelEdit()" 
              class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['edit-reservation-modal.component.scss']
})
export class EditReservationModalComponent {
  @Input() item: any; // Input to receive the data from the parent
  @Output() save = new EventEmitter<any>(); // Event emitter to save the changes
  @Output() cancel = new EventEmitter<void>(); // Event emitter to cancel the operation

  editedItem: any;

  ngOnInit() {
    // Clone the input item to avoid directly editing the original data
    this.editedItem = { ...this.item };
  }

  saveChanges() {
    this.save.emit(this.editedItem); // Emit the edited data to the parent
  }

  cancelEdit() {
    this.cancel.emit(); // Emit event to cancel editing
  }
}
