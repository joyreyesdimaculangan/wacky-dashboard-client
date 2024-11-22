import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/dashboard/statistics';

  getStatistics(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // GET request to the backend
  }

  getReservations(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/reservations'); // GET request to the backend
  }
}
