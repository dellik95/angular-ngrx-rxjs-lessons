import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { AuthActions, authFeature } from './auth/store';
import { AppState } from './reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;
  isLoggerIn$: Observable<boolean>;
  isLoggerOut$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<AppState>) {

  }

  ngOnInit() {

    const userProfile = localStorage.getItem("userProfile");

    if (userProfile) {
        this.store.dispatch(AuthActions.LoginSuccessfulAction({user: JSON.parse(userProfile)}));
    }

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLoggerIn$ = this.store.select(authFeature.selectUserIsLoggedIn);
    this.isLoggerOut$ = this.store.select(authFeature.selectUserIsLoggedOut);
  }

  logout() {
    this.store.dispatch(AuthActions.LogoutAction());
  }

}
