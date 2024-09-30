import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="modal">
      <div class="modal-content">
          <h2>Edit Reservation</h2>
          <form>
          <label>Package Type:</label>
          <input [(ngModel)]="editedItem.packageType" name="packageType" />
          
          <label>Customer Name:</label>
          <input [(ngModel)]="editedItem.customerName" name="customerName" />
          
          <label>Number of Pax:</label>
          <input [(ngModel)]="editedItem.numberofPax" name="numberofPax" type="number" />

          <label>Reservation Date:</label>
          <input [(ngModel)]="editedItem.reservationDate" name="reservationDate" />

          <label>Reservation Time:</label>
          <input [(ngModel)]="editedItem.reservationTime" name="reservationTime" />

          <label>Status:</label>
          <input [(ngModel)]="editedItem.status" name="status" />

          <button type="button" (click)="saveChanges()">Save</button>
          <button type="button" (click)="cancelEdit()">Cancel</button>
          </form>
      </div>
  </div>
  `,
  styleUrl: './edit-reservation-modal.component.scss'
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
