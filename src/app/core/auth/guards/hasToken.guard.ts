import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

export const hasTokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenName = environment.TOKEN_NAME;
  const token = localStorage.getItem(tokenName);
  if (token) {
    router.navigate(['/admin/home']);
    return false;
  } else {
    return true;
  }
};
