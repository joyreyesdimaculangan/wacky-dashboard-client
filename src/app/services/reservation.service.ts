import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development'; // Adjust based on your environment files

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservation: any = {
    inquiries: 0,
    pending: 0,
    approved: 0,
  };

  private apiUrl = environment.apiUrl + '/reservation'; // NestJS API endpoint

  constructor(private http: HttpClient) {}

  // Set the reservation data locally
  setReservationData(data: any) {
    this.reservation = data;
  }

  // Get all reservation data locally
  getReservationData() {
    return this.reservation;
  }

  // Get specific statistics locally
  getStatistics() {
    return {
      inquiries: this.reservation.inquiries,
      pending: this.reservation.pending,
      approved: this.reservation.approved,
    };
  }

  // ------------------- New Backend Methods -------------------

  // Fetch all reservations from the backend
  getReservations(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // GET request to the backend
  }

  // Fetch a specific reservation by ID
  getReservationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); // GET request for a specific reservation
  }

  // Create a new reservation
  createReservation(reservationData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservationData); // POST request to create a reservation
  }

  // Update an existing reservation
  updateReservation(id: string, reservationData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, reservationData); // PUT request to update a reservation
  }

  // Delete a reservation
  deleteReservation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); // DELETE request to remove a reservation
  }
}
