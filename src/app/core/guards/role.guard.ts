import {CanActivateFn} from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  console.log(route);
  return route.data.role.includes(localStorage.getItem('role')) ;
};
