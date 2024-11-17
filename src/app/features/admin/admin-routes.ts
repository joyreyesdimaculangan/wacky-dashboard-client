import { Routes } from '@angular/router';
import { hasRoleGuard } from '../../core/auth/guards/hasRole.guard';
import { hasTokenGuard } from '../../core/auth/guards/hasToken.guard';

export const AdminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('../home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'reservations',
    loadComponent: () => import('./datatables/datatables.component').then((m) => m.DatatablesComponent),
  },
  {
    path: 'calendar',
    loadComponent: () => import('./admin-calendar/admin-calendar.component').then((m) => m.AdminCalendarComponent),
  },
  {
    path: 'customer_reviews',
    loadComponent: () => import('./admin-review/admin-review.component').then((m) => m.AdminReviewComponent),
  },
  {
    path: 'add-reservations',
    loadComponent: () => import('./reservation-modal-forms/add-reservation-modal.component').then((m) => m.AddReservationModalComponent),
  },
  {
    path: 'add-menu',
    loadComponent: () => import('./admin-crm/menu-crm/createAddedMenu/offers-crm.component').then((m) => m.OffersCrmComponent),
  },
  {
    path: 'edit-menu/:menuID',
    loadComponent: () => import('./admin-crm/menu-crm/patchMenu/edit-offers.component').then((m) => m.EditOffersComponent),
  },
  {
    path: 'add-packages',
    loadComponent: () => import('./admin-crm/packages-crm/createAddedPackages/packages-crm.component').then((m) => m.PackagesCrmComponent),
  },
  {
    path: 'view-reservations/:reservationID',
    loadComponent: () => import('./reservation-modal-forms/view-reservation-modal.component').then((m) => m.ViewReservationModalComponent),
  },
  {
    path: 'edit-reservations/:reservationID',
    loadComponent: () => import('./reservation-modal-forms/edit-reservation-modal.component').then((m) => m.EditReservationModalComponent),
  }
];
