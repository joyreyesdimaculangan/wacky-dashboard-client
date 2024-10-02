import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'], // Fix styleUrl to styleUrls
})
export class ConfirmationComponent implements OnInit {
  @Input() item: any; // Input to receive the data from the parent
  @Output() close = new EventEmitter<void>(); // Event emitter to close the modal

  reservation = {
    packageType: '',
    name: '',
    contactNumber: '',
    numberOfPax: 50,
    eventDate: '',
    eventTime: '',
    eventTheme: '',
    cakeTheme: '',
    cakeMessage: '',
    otherRequest: '',
  };

  constructor(
    private reservationService: ReservationService,
    private router: Router // Inject Router
  ) {}

  ngOnInit() {
    // Fetch the reservation data on initialization
    this.reservation = this.reservationService.getReservationData();

    // Logging for debugging
    console.log("Retrieved reservation:", this.reservation);
  }

  calculateTotal(): number {
    const pricePerGuest = 20; // Example price
    // Ensure that reservation is defined and has the numberOfGuests property
    return this.reservation?.numberOfPax ? pricePerGuest * this.reservation.numberOfPax : 0;
  }

  confirmReservation() {
    // Navigate to payment component or initiate payment process
    this.router.navigate(['customer/home']);
  }

  cancelReservation() {
    window.history.back();
  }
}
