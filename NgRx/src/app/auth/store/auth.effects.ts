import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '.';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LoginSuccessfulAction),
      tap(profile => {
        localStorage.setItem("userProfile", JSON.stringify(profile.user));
      }));
  },
    {
      dispatch: false
    });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LogoutAction),
      tap(() => {
        localStorage.removeItem("userProfile");
        this.router.navigateByUrl("/login");
      }));
  }, {
    dispatch: false
  });

  constructor(private actions$: Actions, private router: Router) { }
}
