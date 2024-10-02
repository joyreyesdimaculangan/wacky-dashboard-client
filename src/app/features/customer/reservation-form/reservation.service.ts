import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  public reservation: any;

  setReservationData(data: any) {
    this.reservation = data;
  }

  getReservationData() {
    return this.reservation;
  }
}
