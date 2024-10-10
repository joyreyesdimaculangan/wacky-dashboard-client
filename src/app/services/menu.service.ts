import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Menu } from '../models/menu';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly http = inject(HttpClient)
 
  private apiUrl = environment.apiUrl + '/menu';

  getMenu(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // GET request to the backend
  }

  getMenuById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); // GET request for a specific
  }

  createMenu(menuData: Menu): Observable<any> {
    return this.http.post<any>(this.apiUrl, menuData); // POST request to create a menu
  }

  updateMenu(id: string, menuData: Menu): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, menuData); // PATCH request to update a menu
  }

  deleteMenu(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); // DELETE request to remove a menu
  }
}
