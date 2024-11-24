import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-toast-notifications',
  standalone: true,
  imports: [CommonModule, MatCardModule, ToastrModule],
  template: `
    <div class="toast-container">
      <mat-card class="toast-card">
        <mat-card-title class="toast-title">Toast Notifications</mat-card-title>
        <mat-card-content>
          <div class="button-container">
            <button
              mat-raised-button
              color="primary"
              (click)="showSuccess('Success message', 'Success')"
            >
              Show Success
            </button>
            <button
              mat-raised-button
              color="accent"
              (click)="showError('Error message', 'Error')"
            >
              Show Error
            </button>
            <button
              mat-raised-button
              color="warn"
              (click)="showWarning('Warning message', 'Warning')"
            >
              Show Warning
            </button>
            <button
              mat-raised-button
              color="basic"
              (click)="showInfo('Info message', 'Info')"
            >
              Show Info
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./toastNotifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastNotificationsComponent {
  private readonly toastr = inject(ToastrService);

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title);
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title);
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title);
  }
}
