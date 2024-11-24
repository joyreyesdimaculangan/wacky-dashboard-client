import { Routes } from '@angular/router';
import { hasRoleGuard } from '../../core/auth/guards/hasRole.guard';
import { ToastNotificationsComponent } from '../../core/toastNotifications/toastNotifications.component';

export const CustomerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'reservations',
    pathMatch: 'full',
  },
  { 
    path: 'home',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./../home/home.component').then((m) => m.HomeComponent),
    canActivate: [hasRoleGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('../../features/customer/edit-profile/edit-profile.component').then(m => m.EditProfileComponent),
  },
  {
    path: 'reservations',
    loadComponent: () => import('./reservation-form/reservation-form.component').then((m) => m.ReservationFormComponent),
    canActivate: [hasRoleGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'reviews',
    loadComponent: () => import('./review-section/add-reviews/add-reviews.component').then((m) => m.AddReviewsComponent),
    canActivate: [hasRoleGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./reservation-form/confirmationPage/confirmationPage.component').then((m) => m.ConfirmationPageComponent),
  },
];
