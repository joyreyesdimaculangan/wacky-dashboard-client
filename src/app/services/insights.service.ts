import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsightsService {
  private readonly http = inject(HttpClient);
 
  private apiUrl = environment.apiUrl + '/sales';

  analyzeMonthlyTrends(year: number): Observable<any> {
    const endpoint = `${this.apiUrl}/analyze`;
    return this.http.post(endpoint, { year });
  }
}
