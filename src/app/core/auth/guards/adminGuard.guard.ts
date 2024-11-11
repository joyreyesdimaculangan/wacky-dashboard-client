import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService);
  const user = _auth.user();
  const _router = inject(Router);

  if (user && user.account_type === 'admin') {
    return true;
  } else {
    _router.navigate(['/unauthorized']);
    return false;
  }
};
