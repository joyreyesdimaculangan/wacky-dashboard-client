import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservation: any = {
    inquiries: 0,
    pending: 0,
    approved: 0,
  };

  // Set the reservation data
  setReservationData(data: any) {
    this.reservation = data;
  }

  // Get all reservation data
  getReservationData() {
    return this.reservation;
  }

  // Get specific statistics
  getStatistics() {
    return {
      inquiries: this.reservation.inquiries,
      pending: this.reservation.pending,
      approved: this.reservation.approved,
    };
  }
}
