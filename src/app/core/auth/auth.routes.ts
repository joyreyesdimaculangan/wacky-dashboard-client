import { Routes } from "@angular/router";
import { hasTokenGuard } from "./guards/hasToken.guard";
import { hasRoleGuard } from "./guards/hasRole.guard";

export const AuthRoutes: Routes = [
  {
    path: 'register', 
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'password-recovery', 
    loadComponent: () => import('./pages/password-recovery/password-recovery.component').then(m => m.PasswordRecoveryComponent)
  }, 
  {
    path: 'email-verification',
    loadComponent: () => import('./pages/email-verification/email-verification.component').then(m => m.EmailVerificationComponent),
  },
  {
    path: 'login', 
    loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent),
  },
  {
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full'
  },
]
