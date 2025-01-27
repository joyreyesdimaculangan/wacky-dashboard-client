import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NotificationsService } from '../../../services/notifications.service';
import { Notifications } from '../../../models/notifications';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerComponent } from '../drawer/drawer.component';
import { PackageName } from '../../../models/packages';
import { GetPackageNameService } from '../../customer/reservation-form/getPackageName.service';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [CommonModule, DatePipe, MatIconModule, DrawerComponent],
  template: `
    <div class="flex h-screen bg-gray-100">
      <app-drawer></app-drawer>
      <section class="dashboard-page flex-1 overflow-auto">
        <div class="dashboard-content">
          <header class="header">
            <h1>Notifications</h1>
          </header>

          <div class="content">
            <!-- Loading State -->
            <div *ngIf="loading" class="spinner-container">
              <div class="spinner"></div>
              <p>Loading notifications...</p>
            </div>

            <!-- Error State -->
            <div *ngIf="!loading && errorMessage" class="error-message">
              <p>{{ errorMessage }}</p>
            </div>

            <!-- Notifications List -->
            <div
              *ngIf="!loading && notifications.length > 0"
              class="notification-list flex-1 p-6 overflow-auto"
            >
              <div class="button-container">
                <button (click)="markAllAsRead()" class="mark-all-button">
                  Mark All as Read
                </button>
              </div>
              <ul class="space-y-3">
                <li
                  *ngFor="let notification of notifications; trackBy: trackById"
                  [ngClass]="{
                    'bg-yellow-100': notification.isNew,
                    'bg-white': !notification.isNew
                  }"
                  class="flex items-start text-gray-700 mb-2 p-2 border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                  (click)="navigateToReservation(notification)"
                >
                  <i class="fas fa-bell text-green-500 mr-3"></i>
                  <div>
                    <p class="font-semibold">{{ notification.title }} </p>
                    <p class="text-sm text-gray-500">
                      {{ notification.message }}
                    </p>
                    <span class="text-xs text-gray-400">{{
                      notification.date | date : 'short'
                    }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Empty State -->
            <div
              *ngIf="!loading && notifications.length === 0"
              class="empty-state"
            >
              <p>No notifications available.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./notification-page.component.scss'],
})
export class NotificationPageComponent implements OnInit {
  newNotifications: Notifications[] = [];
  notifications: Notifications[] = [];
  loading = true;
  errorMessage: string | null = null;
  location = inject(Location);
  reservationId: string = '';
  private readonly packageService = inject(GetPackageNameService);
  packageNames: { [key: string]: string } = {};
 
  private readonly notificationService = inject(NotificationsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    this.fetchNotifications();
    this.fetchNewNotifications();
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (data: Notifications[]) => {
        this.notifications = data;
        this.loading = false;
        console.log('Notifications:', this.notifications);
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
        this.errorMessage =
          'Unable to fetch notifications. Please try again later.';
        this.loading = false;
      },
    });
  }

  fetchNewNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data: any[]) => {
        this.newNotifications = data.filter(
          (notification) => notification.isNew
        );
      },
      error: (error) => {
        console.error('Error fetching new notifications:', error);
      },
    });
  }

  navigateToReservation(notification: any): void {
    if (notification.isNew) {
      this.markAsRead(notification.id);
      console.log('Notification marked as read:', notification.id);
    }
    this.router.navigate([
      '/admin/edit-reservations',
      notification.reservationId,
    ]);
  }

  getNotificationById() {
    const notificationId = this.route.snapshot.params['id'];
    console.log('Notification ID:', notificationId);
    this.notificationService.getNotificationById(notificationId).subscribe({
      next: (notification) => {
        this.reservationId = notification.reservationId;
      },
      error: (error) => {
        console.error('Error fetching notification:', error);
      },
    });
  }

  getPackageName(notification: Notifications): string {
    return notification.reservation?.package?.name || 'Package not found';
  }

  markAsRead(notificationId: string): void {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        this.notifications = this.notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isNew: false }
            : notification
        );
        this.fetchNewNotifications(); // Update the list of new notifications
      },
      error: (error) => {
        console.error('Error marking notification as read:', error);
      },
    });
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications = this.notifications.map((notification) => ({
          ...notification,
          isNew: false,
        }));
        this.fetchNewNotifications(); // Update the list of new notifications
      },
      error: (error) => {
        console.error('Error marking all notifications as read:', error);
      },
    });
  }

  trackById(index: number, item: any): string {
    return item.notificationId || index.toString();
  }

  onClose() {
    this.location.back();
  }
}
