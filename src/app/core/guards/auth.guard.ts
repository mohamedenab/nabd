import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authToken = localStorage.getItem('token')
  if (!authToken) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
