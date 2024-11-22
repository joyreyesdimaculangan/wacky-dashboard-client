import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private readonly http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/notifications';

  getNotifications(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // GET request to the backend
  }

  createNotification(notificationData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, notificationData); // POST request to create a notification
  }
}
