import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageAddOnsService {
  private readonly http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/add-ons';

  getAddOns(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // GET request to the backend
  }

  getAddOnById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); // GET request for a specific add-on
  }

  createAddOn(addOnData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, addOnData); // POST request to create an add-on
  }

  updateAddOn(id: string, addOnData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, addOnData); // PATCH request to update an add-on
  }

  deleteAddOn(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); // DELETE request to remove an add-on
  }
}
