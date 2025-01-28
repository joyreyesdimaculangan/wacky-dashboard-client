import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { TermsOfService, TermsSection } from '../models/terms';

@Injectable({
  providedIn: 'root'
})
export class TermsService {
  private readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/terms-of-service';

  getLatestTerms(): Observable<TermsOfService> {
    return this.http.get<TermsOfService>(`${this.apiUrl}/latest`); // GET request to the backend
  }

  createTerms(version: string, sections: TermsSection[]): Observable<TermsOfService> {
    return this.http.post<TermsOfService>(this.apiUrl, { version, sections });
  }

  updateTerms(id: string, sections: TermsSection[]): Observable<TermsOfService> {
    return this.http.patch<TermsOfService>(`${this.apiUrl}/${id}`, { sections });
  }

  deleteTermsSection(termsId: string, sectionId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${termsId}/sections/${sectionId}`);
  }
}
