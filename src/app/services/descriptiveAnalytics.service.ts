import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescriptiveAnalyticsService {
  private readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/analytics';

  getMonthlyTrends(year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/monthly-trends`, {
      params: { year: year.toString() },
    });
  }

  getAnalyticsYearOverYear(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/year-over-year`); // GET request to the backend
  }

  getMonthlyTrendsOfPackages(year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservations-by-package/${year}`);
  }

  getReservationsByTime(year: number): Observable<any[]> {
    return this.http.get< {data: any[]} >(`${this.apiUrl}/reservations/time/${year}`).pipe(
      map((response) => response.data), // Adjust this based on your API's structure
      catchError((error: HttpErrorResponse) => {
        console.error('Error in ReservationService:', error);
        return throwError(() => error);
      })
    );
  };
}
function throwError(arg0: () => HttpErrorResponse): Observable<never> {
  return observableThrowError(arg0());
}

