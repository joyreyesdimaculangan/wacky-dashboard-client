import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService);
  const _router = inject(Router);
  const accountType = _auth.userInfo?.account_type;
  console.log('Account Type:', accountType);
  const isAuthorized = route.data['roles'].includes(accountType);
  if (!isAuthorized) {
    _router.navigate(['/auth/login']);
  }

  return isAuthorized || false;
};
