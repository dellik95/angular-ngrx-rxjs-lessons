import { tap } from 'rxjs/operators';
import { AuthState, authFeature } from './store/index';
import { Store , select} from '@ngrx/store';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {

    var store = inject(Store<AuthState>);
    var router = inject(Router);
    return store.pipe(
      select(authFeature.selectUserIsLoggedIn),
      tap(loggedIn => {
        if(!loggedIn) {
          router.navigateByUrl("/login");
        }
      }));
}
