import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Modal Background -->
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" *ngIf="item">

    <!-- Modal Content -->
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">

      <!-- Modal Header -->
      <h2 class="text-lg font-bold text-green-700 mb-4 flex items-center">
        <svg class="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15h-2v-2h2v2zm0-4h-2V5h2v6z" />
        </svg>
        Delete Reservation
      </h2>

      <!-- Modal Body -->
      <p class="text-gray-700 mb-4">Are you sure you want to delete this reservation?</p>
      <p class="text-gray-700 font-semibold mb-6">Reservation ID: <span class="text-green-600">{{ item.reservationID }}</span></p>

      <!-- Modal Footer with Buttons -->
      <div class="flex justify-center space-x-4">
        <button (click)="deleteItem()" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50">
          Confirm
        </button>
        <button (click)="cancelDeletion()" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
          Cancel
        </button>
      </div>
    </div>
  </div>
  `
  ,
  styleUrls: ['./delete-reservation-modal.component.scss']
})
export class DeleteReservationModalComponent {
  @Input() item: any; // Input to receive the data from the parent
  @Output() confirmDelete = new EventEmitter<any>(); // Event emitter to confirm delete
  @Output() cancelDelete = new EventEmitter<void>(); // Event emitter to cancel delete
  inputReservationID: string = '';
  
  deleteItem() {
    this.confirmDelete.emit(this.item); // Emit event to confirm the deletion
  }

  // Call this method to cancel the deletion
  cancelDeletion() {
    this.inputReservationID = ''; // Clear the input
    // Logic to close the modal, e.g., set item to null
    this.item = null; // Assuming you set this to null to close the modal
  }
}