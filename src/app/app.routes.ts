import { Routes } from '@angular/router';
import { hasTokenGuard } from './core/auth/guards/hasToken.guard';
import { authGuard } from './core/auth/guards/isAuthenticated.guard';
import { hasRoleGuard } from './core/auth/guards/hasRole.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Home Page',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.routes').then((m) => m.AuthRoutes),
    title: 'Authentication',
  },
  {
    path: 'password-recovery',
    loadChildren: () =>
      import('./core/password-recovery/password-recovery.component').then((m) => m.PasswordRecoveryComponent),
    title: 'Password Recovery',
  },
  {
    path: 'unauthorized',
    loadChildren: () =>
      import('./core/auth/pages/app-unauthorized/app-unauthorized.component').then((m) => m.AppUnauthorizedComponent),
    title: 'Unauthorized',
  },
  {
    path: 'customer',
    loadChildren: () => 
      import('./features/customer/customer-routes').then(m => m.CustomerRoutes),
    title: 'Wacky Customer Page',
  },
  {
    path: 'signInFirst',
    loadComponent: () =>
      import('./features/customer/reservation-form/signInFirst/signInFirst.component').then((m) => m.SignInFirstComponent),
    title: 'Sign In First',
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin-routes').then(m => m.AdminRoutes),
    title: 'Admin Page',
    canActivate: [hasRoleGuard],
    data: { roles: ['admin'] }
  }
];
