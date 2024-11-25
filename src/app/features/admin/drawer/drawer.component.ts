import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ToastNotificationsComponent } from '../../../core/toastNotifications/toastNotifications.component';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  toastNotifications = inject(ToastNotificationsComponent);
  isOpen = false;

  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }
  auth = inject(AuthService);

  logout() {
    try {
      this.auth.logout();
      this.toastNotifications.showSuccess('Logged out successfully', 'Success');
    } catch (error) {
      console.error('Logout failed:', error);
      this.toastNotifications.showError('Logout failed. Please try again.', 'Error');
    }
  }
}
