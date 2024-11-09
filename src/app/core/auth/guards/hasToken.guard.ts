import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

export const hasTokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenName = environment.TOKEN_NAME;
  const token = localStorage.getItem(tokenName);
  console.log('Token:', token);
  if (token) {
    console.log('Redirecting to /customer/home'); // Debugging log
    router.navigate(['/customer/home']);
    return false;
  } else {
    console.log('Allowing access to login page'); // Debugging log
    return true;
  }
};
