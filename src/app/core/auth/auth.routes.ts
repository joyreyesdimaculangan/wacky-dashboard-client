import { Routes } from "@angular/router";
import { hasTokenGuard } from "./guards/hasToken.guard";
import { hasRoleGuard } from "./guards/hasRole.guard";
import { ToastNotificationsComponent } from "../toastNotifications/toastNotifications.component";

export const AuthRoutes: Routes = [
  {
    path: 'register', 
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'password-recovery', 
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./pages/password-recovery/password-recovery.component').then(m => m.PasswordRecoveryComponent)
  }, 
  {
    path: 'email-verification',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./pages/email-verification/email-verification.component').then(m => m.EmailVerificationComponent),
  },
  {
    path: 'login', 
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent },
    ],
    loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent),
  },
  {
    path: 'verify-email', 
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent),
  },
  {
    path: 'reset-password',
    providers: [
      { provide: ToastNotificationsComponent, useClass: ToastNotificationsComponent } // Optional if using it as a service
    ],
    loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
  },
  {
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full'
  },
]
