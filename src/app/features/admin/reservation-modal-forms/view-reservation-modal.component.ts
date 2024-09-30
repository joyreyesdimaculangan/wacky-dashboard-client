import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-reservation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal">
      <div class="modal-content">
        <h2>View Reservation</h2>
        <p>Reservation ID: {{ item.reservationID }}</p>
        <p>Package Type: {{ item.packageType }}</p>
        <p>Customer Name: {{ item.customerName }}</p>
        <p>Number of Pax: {{ item.numberofPax }}</p>
        <p>Reservation Date: {{ item.reservationDate }}</p>
        <p>Reservation Time: {{ item.reservationTime }}</p>
        <p>Status: {{ item.status }}</p>
        <button (click)="closeView()">Close</button>
      </div>
    </div>`,
  styleUrl: './view-reservation-modal.component.scss'
})
export class ViewReservationModalComponent {
  @Input() item: any; // Input to receive the data from the parent
  @Output() close = new EventEmitter<void>(); // Event emitter to close the modal

  closeView() {
    this.close.emit(); // Emit event to close the view
  }
}
