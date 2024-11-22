import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NotificationsService } from '../../../services/notifications.service';
import { Notifications } from '../../../models/notifications';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `<section class="p-6 bg-gray-100 min-h-screen">
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold text-green-600 mb-6">Notifications</h1>

    <!-- Loading State -->
    <div *ngIf="loading" class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
      <p class="text-gray-600 mt-4">Loading notifications...</p>
    </div>

    <!-- Error State -->
    <div *ngIf="!loading && errorMessage" class="text-center text-red-600">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Notifications List -->
    <div *ngIf="!loading && notifications.length > 0" class="bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-xl font-semibold text-green-600 mb-4">Your Notifications</h2>
      <ul class="space-y-4 max-h-80 overflow-y-auto">
        <li
          *ngFor="let notification of notifications; let i = index"
          class="flex items-start text-gray-700 p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out"
        >
          <i class="fas fa-bell text-green-500 mr-4"></i>
          <div>
            <p class="font-semibold">{{ notification.title }}</p>
            <p class="text-sm text-gray-500">{{ notification.message }}</p>
            <span class="text-xs text-gray-400">{{
              notification.date | date : 'short'
            }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Empty State -->
    <div *ngIf="!loading && notifications.length === 0" class="text-center text-gray-500">
      <p>No notifications available.</p>
    </div>
  </div>
</section>
`,
  styleUrls: ['./notification-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationPageComponent implements OnInit {
  notifications: Notifications[] = [];
  loading = true;
  errorMessage: string | null = null;

  private readonly notificationService = inject(NotificationsService);

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (data: Notifications[]) => {
        this.notifications = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
        this.errorMessage = 'Unable to fetch notifications. Please try again later.';
        this.loading = false;
      },
    });
  }
}
