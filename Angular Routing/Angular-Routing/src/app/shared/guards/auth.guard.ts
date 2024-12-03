import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot, Router, Route, CanActivateChildFn, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from '../../services/auth.store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkIfLoggedIn(state);
}

export const childAtuhGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkIfLoggedIn(state);
}
function checkIfLoggedIn(state: RouterStateSnapshot): Observable<boolean | UrlTree> {
  let authStore = inject(AuthStore);
  let routerSerice = inject(Router);

  return authStore.isLoggedIn$
    .pipe(map(isLoggedIn => {
      if (isLoggedIn) {
        return isLoggedIn;
      }
      return routerSerice.parseUrl(`/login?navigatePage=${state.url}`);
    }));
}
