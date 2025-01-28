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
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('../../features/customer/edit-profile/edit-profile.component').then(m => m.EditProfileComponent),
  },
  {
    path: 'reservations',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./reservation-form/reservation-form.component').then((m) => m.ReservationFormComponent),
    canActivate: [hasRoleGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'confirmed-reservations',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./confirmed-reservations/confirmed-reservations.component').then((m) => m.ConfirmedReservationsComponent),
    canActivate: [hasRoleGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'confirmation',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./reservation-form/confirmationPage/confirmationPage.component').then((m) => m.ConfirmationPageComponent),
  },
];
