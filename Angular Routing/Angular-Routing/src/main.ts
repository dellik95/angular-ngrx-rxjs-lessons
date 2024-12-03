import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withDebugTracing, withRouterConfig } from '@angular/router';
import { APP_ROUTES } from './app/app.routing';



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      APP_ROUTES,
      withDebugTracing(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
      withComponentInputBinding()),
    importProvidersFrom(
      BrowserModule,
      MatMenuModule,
      MatButtonModule,
      MatIconModule,
      MatSidenavModule,
      MatToolbarModule,
      MatInputModule,
      MatCardModule,
      ReactiveFormsModule),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
  .catch(err => console.log(err));
