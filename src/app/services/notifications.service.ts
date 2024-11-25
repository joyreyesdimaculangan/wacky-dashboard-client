import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/notifications';
  private notifications: any[] = [];

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(notifications => {
        this.notifications = notifications;
        return notifications;
      })
    );
  }

  markAsRead(notificationId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${notificationId}/mark-as-read/`, {}).pipe(
      map(response => {
        this.notifications = this.notifications.map(notification =>
          notification.notificationId === notificationId ? { ...notification, isNew: false } : notification
        );
        return response;
      })
    );
  }

  markAllAsRead(): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/mark-all-as-read`, {}).pipe(
      map(response => {
        this.notifications = this.notifications.map(notification => ({
          ...notification,
          isNew: false
        }));
        return response;
      })
    );
  }

  createNotification(notificationData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, notificationData); // POST request to create a notification
  }
}