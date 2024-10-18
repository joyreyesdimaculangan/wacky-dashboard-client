import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageInclusionsService {
  private readonly http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/inclusions';

  getInclusions(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // GET request to the backend
  }

  getInclusionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); // GET request for a specific inclusion
  }

  createInclusion(inclusionData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, inclusionData); // POST request to create an inclusion
  }

  updateInclusion(id: string, inclusionData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, inclusionData); // PATCH request to update an inclusion
  }

  deleteInclusion(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); // DELETE request to remove an inclusion
  }
}
