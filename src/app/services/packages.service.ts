import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  private readonly http = inject(HttpClient)

  private apiUrl = environment.apiUrl + '/packages';

  getPackages(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // GET request to the backend
  }

  getPackageById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); // GET request for a specific package
  }

  createPackage(packageData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, packageData); // POST request to create a package
  }

  updatePackage(id: string, packageData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, packageData); // PATCH request to update a package
  }

  deletePackage(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); // DELETE request to remove a package
  }
}
