import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Modal Background -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      *ngIf="item"
    >
      <!-- Modal Content -->
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            (click)="cancelDeletion()"
            class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl p-2 rounded-full focus:outline-none"
          >
            &times;
          </button>

          <div class="p-4 md:p-5 text-center">
            <svg
              class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3
              class="mb-5 text-lg font-normal text-gray-800 dark:text-gray-800"
            >
              Are you sure you want to delete this product?
            </h3>

            <!-- Modal Footer with Buttons -->
            <div class="flex justify-center space-x-4">
              <button
                (click)="deleteItem()"
                class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
              >
                Confirm
              </button>
              <button
                (click)="cancelDeletion()"
                class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./delete-reservation-modal.component.scss'],
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
