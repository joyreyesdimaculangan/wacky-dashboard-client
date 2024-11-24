import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountProfileService {
  private readonly http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/account'; // NestJS API endpoint

  getAccountProfile() {
    return this.http.get<any>(this.apiUrl);
  }

  getAccountProfileByID(id: string){
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createAccountProfile(accountProfile: any) {
    return this.http.post<any>(this.apiUrl, accountProfile);
  }

  updateAccountProfile(id: string, accountProfile: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, accountProfile);
  }

  deleteAccountProfile(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
