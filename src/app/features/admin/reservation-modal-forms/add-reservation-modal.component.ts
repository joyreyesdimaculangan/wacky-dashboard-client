import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule],
  template: `
    <!-- Modal Background -->
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" *ngIf="showModal">
      <!-- Modal Content -->
      <div class="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Close Button ('X') -->
        <button (click)="closeAddReservation()" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl p-2 rounded-full focus:outline-none">
          &times;
        </button>

        <!-- Modal Header -->
        <h2 class="text-2xl font-bold mb-6 text-green-700">Create Reservation</h2>

        <!-- Reservation Form -->
        <form (ngSubmit)="submitForm()">
          <div class="space-y-6">
            <div>
              <label for="packageType" class="block text-sm font-medium text-gray-700">Package Type</label>
              <input id="packageType" type="text" [(ngModel)]="reservation.packageType" name="packageType" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 text-gray-900" required>
            </div>

            <div>
              <label for="customerName" class="block text-sm font-medium text-gray-700">Customer Name</label>
              <input id="customerName" type="text" [(ngModel)]="reservation.name" name="customerName" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 text-gray-900" required>
            </div>

            <div>
              <label for="contactNumber" class="block text-sm font-medium text-gray-700">Contact Number</label>
              <input id="contactNumber" type="tel" [(ngModel)]="reservation.contactNumber" name="contactNumber" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 text-gray-900" required>
            </div>

            <div>
              <label for="numberOfPax" class="block text-sm font-medium text-gray-700">Number of Pax</label>
              <input id="numberOfPax" type="number" [(ngModel)]="reservation.numberOfPax" name="numberOfPax" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 text-gray-900" required min="1">
            </div>

            <!-- Reservation Date Input -->
            <div>
              <label for="eventDate" class="block text-sm font-medium text-gray-700">Reservation Date:</label>
              <mat-form-field appearance="outline" class="w-full">
                <input
                  id="eventDate" 
                  [matDatepicker]="datepicker"
                  [(ngModel)]="reservation.eventDate" 
                  name="eventDate" 
                  matInput
                  placeholder="Select a date"
                  class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <mat-datepicker-toggle matSuffix [for]="datepicker"></mat-datepicker-toggle>
                <mat-datepicker #datepicker></mat-datepicker>
              </mat-form-field>
            </div>

            <!-- Time Input -->
            <div id="reservationTime" class="mb-6">
              <label class="block text-sm font-medium text-gray-700">Reservation Time:</label>
              <ul class="grid grid-cols-2 gap-4">
                <li>
                  <input type="radio" id="10-am" value="10:00 AM" [(ngModel)]="reservation.eventTime" class="hidden peer" name="timetable" />
                  <label for="10-am" class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-green-600 border-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500">10:00 AM</label>
                </li>
                <li>
                  <input type="radio" id="10-30-am" value="10:30 AM" [(ngModel)]="reservation.eventTime" class="hidden peer" name="timetable" />
                  <label for="10-30-am" class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-green-600 border-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500">10:30 AM</label>
                </li>
                <li>
                  <input type="radio" id="11-am" value="11:00 AM" [(ngModel)]="reservation.eventTime" class="hidden peer" name="timetable" />
                  <label for="11-am" class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-green-600 border-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500">11:00 AM</label>
                </li>
                <li>
                  <input type="radio" id="3-pm" value="3:00 PM" [(ngModel)]="reservation.eventTime" class="hidden peer" name="timetable" />
                  <label for="3-pm" class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-green-600 border-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500">3:00 PM</label>
                </li>
                <li>
                  <input type="radio" id="3-30-pm" value="3:30 PM" [(ngModel)]="reservation.eventTime" class="hidden peer" name="timetable" />
                  <label for="3-30-pm" class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-green-600 border-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500">3:30 PM</label>
                </li>
                <li>
                  <input type="radio" id="4-pm" value="4:00 PM" [(ngModel)]="reservation.eventTime" class="hidden peer" name="timetable" />
                  <label for="4-pm" class="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-green-600 border-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500">4:00 PM</label>
                </li>
              </ul>
            </div>

            <div>
              <label for="eventTheme" class="block text-sm font-medium text-gray-700">Event Theme</label>
              <input id="eventTheme" type="text" [(ngModel)]="reservation.eventTheme" name="eventTheme" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 text-gray-900">
            </div>

            <div>
              <label for="cakeTheme" class="block text-sm font-medium text-gray-700">Cake Theme</label>
              <input id="cakeTheme" type="text" [(ngModel)]="reservation.cakeTheme" name="cakeTheme" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 text-gray-900">
            </div>

            <div>
              <label for="cakeMessage" class="block text-sm font-medium text-gray-700">Cake Message</label>
              <input id="cakeMessage" type="text" [(ngModel)]="reservation.cakeMessage" name="cakeMessage" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 text-gray-900">
            </div>

            <div>
              <label for="otherRequest" class="block text-sm font-medium text-gray-700">Other Request</label>
              <input id="otherRequest" type="text" [(ngModel)]="reservation.otherRequest" name="otherRequest" class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 text-gray-900">
            </div>
          </div>

          <!-- Modal Footer with Submit and Close Buttons -->
          <div class="mt-8 flex justify-end">
            <button type="button" (click)="closeAddReservation()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md mr-3">Cancel</button>
            <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md">Submit</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./add-reservation-modal.component.scss']
})
export class AddReservationModalComponent {
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
    cakeMessage: '',
    otherRequest: ''
  };

  closeAddReservation() {
    this.showModal = false; // Hides the modal
    this.closeModal.emit(); // Emits event to the parent component
  }

  submitForm() {
    // Handle the form submission logic
    console.log(this.reservation);
    this.closeAddReservation(); // Close the modal after submission
  }
}
