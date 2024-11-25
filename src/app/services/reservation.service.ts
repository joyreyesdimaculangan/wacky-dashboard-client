import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { ReservationForm } from '../models/reservation-form';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly http = inject(HttpClient)
  private reservations: any[] = [];

  private apiUrl = environment.apiUrl + '/reservation'; // NestJS API endpoint

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
  createReservation(reservationData: ReservationForm): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservationData); // POST request to create a reservation
  }

  // Update an existing reservation
  updateReservation(id: string, reservationData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, reservationData); // PATCH request to update a reservation
  }

  // Delete a reservation
  deleteReservation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); // DELETE request to remove a reservation
  }

  getPackageID(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAccountProfileById(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  markAsRead(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/viewed/${id}`, {}).pipe(
      map(response => {
        this.reservations = this.reservations.map(reservations =>
          reservations.id === id ? { ...reservations, isNew: false } : reservations
        );
        return response;
      })
    );
  }

  markAllAsRead(): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/viewed/all`, {}).pipe(
      map(response => {
        this.reservations = this.reservations.map(reservations => ({
          ...reservations,
          isNew: false
        }));
        return response;
      })
    );
  }

  getStatus(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
