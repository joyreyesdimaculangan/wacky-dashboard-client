import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Terms } from '../models/terms';

@Injectable({
  providedIn: 'root'
})
export class TermsService {
  private readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/terms-of-service';

  getTerms(): Observable<Terms> {
    return this.http.get<Terms>(`${this.apiUrl}/latest`); // GET request to the backend
  }

  createTerms(terms: Terms): Observable<Terms> {
    return this.http.post<any>(this.apiUrl, terms); // POST request to create the terms of service
  }

  updateTerms(terms: Terms): Observable<Terms> {
    return this.http.patch<any>(this.apiUrl, terms); // PATCH request to update the terms of service
  }

}
