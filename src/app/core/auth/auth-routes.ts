import { Routes } from "@angular/router";

export const AuthRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)},
  {path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)},
  {path: 'password-recovery', loadComponent: () => import('./pages/password-recovery/password-recovery.component').then(m => m.PasswordRecoveryComponent)}, 
]
