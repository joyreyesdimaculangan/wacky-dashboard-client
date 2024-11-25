import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private readonly VAPID_PUBLIC_KEY = environment.vapidPublicKey;
  private swPush = inject(SwPush);
  private http = inject(HttpClient);

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(subscription => {
      console.log('Sending subscription to server', subscription);
      this.http.post(`${environment.apiUrl}/subscribe`, subscription)
        .subscribe(() => console.log('Subscribed to notifications'));
    })
    .catch(err => console.error('Could not subscribe to notifications', err));
  }

  listenForNotifications() {
    this.swPush.messages.subscribe(message => {
      console.log('Received push message', message);
      // Handle the push message here
    });

    this.swPush.notificationClicks.subscribe(event => {
      console.log('Notification click', event);
      // Handle the notification click here
    });
  }
}
