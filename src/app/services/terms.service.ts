import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TermsService {
  private readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/terms-of-service';

  getTerms(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // GET request to the backend
  }

  updateTerms(termsData: FormData): Observable<any> {
    return this.http.patch<any>(this.apiUrl, termsData); // PATCH request to update the terms of service
  }

}
