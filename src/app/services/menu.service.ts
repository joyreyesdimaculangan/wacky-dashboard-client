import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EditMenuValues, Menu } from '../models/menu';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly http = inject(HttpClient)
 
  private apiUrl = environment.apiUrl + '/menu';

  getMenu() {
    return this.http.get<any>(this.apiUrl); // GET request to the backend
  }

  getMenuByMenuID(menuID: string) {
    return this.http.get<any>(`${this.apiUrl}/${menuID}`); // GET request for a specific
  }

  createMenu(menuData: Menu) {
    return this.http.post<any>(this.apiUrl, menuData); // POST request to create a menu
  }

  updateMenu(menuID: string, menuData: EditMenuValues) {
    return this.http.patch<any>(`${this.apiUrl}/${menuID}`, menuData); // PATCH request to update a menu
  }

  deleteMenu(menuID: string) {
    return this.http.delete<any>(`${this.apiUrl}/${menuID}`); // DELETE request to remove a menu
  }
}
