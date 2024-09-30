import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="modal">
      <div class="modal-content">
          <h2>Delete Reservation</h2>
          <p>Are you sure you want to delete this reservation?</p>
          <p>Reservation ID: {{ item.reservationID }}</p>
          <button (click)="deleteItem()">Yes, Delete</button>
          <button (click)="cancelDeletion()">Cancel</button>
      </div>
  </div>
`,
  styleUrl: './delete-reservation-modal.component.scss'
})
export class DeleteReservationModalComponent {
  @Input() item: any; // Input to receive the data from the parent
  @Output() confirmDelete = new EventEmitter<any>(); // Event emitter to confirm delete
  @Output() cancelDelete = new EventEmitter<void>(); // Event emitter to cancel delete

  deleteItem() {
    this.confirmDelete.emit(this.item); // Emit event to confirm the deletion
  }

  cancelDeletion() {
    this.cancelDelete.emit(); // Emit event to cancel deletion
  }
}
