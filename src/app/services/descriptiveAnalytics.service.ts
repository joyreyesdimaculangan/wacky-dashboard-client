import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescriptiveAnalyticsService {
  private readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/analytics';

  getMonthlyTrends(year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/monthly-trends`); // GET request to the backend
  }

  getAnalyticsYearOverYear(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/year-over-year`); // GET request to the backend
  }
}
