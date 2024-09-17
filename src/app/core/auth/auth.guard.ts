import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.isLoggedIn();
  if(!isLoggedIn) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};