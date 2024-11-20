import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateMenu, EditMenuValues, Menu } from '../models/menu';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly http = inject(HttpClient);
 
  private apiUrl = environment.apiUrl + '/menu';

  getMenu(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // GET request to the backend
  }

  getMenuByMenuID(menuID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${menuID}`); // GET request for a specific
  }

  createMenu(menuData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, menuData); // POST request to create a menu
  }

  updateMenu(menuID: string, menuData: EditMenuValues): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${menuID}`, menuData); // PATCH request to update a menu
  }

  updateMenuOrder(orderedMenu: { menuID: string; position: number }[]): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/order`, orderedMenu); // PATCH request to update the order of the menu
  }

  deleteMenu(menuID: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${menuID}`); // DELETE request to remove a menu
  }
}
