import { Routes } from '@angular/router';
import { hasRoleGuard } from '../../core/auth/guards/hasRole.guard';
import { hasTokenGuard } from '../../core/auth/guards/hasToken.guard';
import { ToastNotificationsComponent } from '../../core/toastNotifications/toastNotifications.component';

export const AdminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'home',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('../home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'dashboard',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'reservations',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./datatables/datatables.component').then((m) => m.DatatablesComponent),
  },
  {
    path: 'calendar',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./admin-calendar/admin-calendar.component').then((m) => m.AdminCalendarComponent),
  },
  {
    path: 'customer_reviews',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./admin-review/admin-review.component').then((m) => m.AdminReviewComponent),
  },
  {
    path: 'add-reservations',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./reservation-modal-forms/add-reservation-modal.component').then((m) => m.AddReservationModalComponent),
  },
  {
    path: 'add-menu',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./admin-crm/menu-crm/createAddedMenu/offers-crm.component').then((m) => m.OffersCrmComponent),
  },
  {
    path: 'edit-menu/:menuID',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./admin-crm/menu-crm/patchMenu/edit-offers.component').then((m) => m.EditOffersComponent),
  },
  {
    path: 'add-packages',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./admin-crm/packages-crm/createAddedPackages/packages-crm.component').then((m) => m.PackagesCrmComponent),
  },
  {
    path: 'view-reservations/:reservationID',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./reservation-modal-forms/view-reservation-modal.component').then((m) => m.ViewReservationModalComponent),
  },
  {
    path: 'edit-reservations/:reservationID',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./reservation-modal-forms/edit-reservation-modal.component').then((m) => m.EditReservationModalComponent),
  },
  {
    path: 'notifications',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./notification-page/notification-page.component').then((m) => m.NotificationPageComponent),
  },
  {
    path: 'terms-and-conditions',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./terms-and-conditions/terms-and-conditions.component').then((m) => m.TermsAndConditionsComponent),
    title: 'Manage Terms & Conditions',
  }
];
