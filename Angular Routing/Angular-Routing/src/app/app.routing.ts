import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChatComponent } from './chat/chat.component';

export const APP_ROUTES: Routes = [
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full"
  },
  {
    path: "helpdesk-chat",
    component: ChatComponent,
    outlet: "chat"
  },
  {
    path:"courses",
    loadChildren: () => import("./courses/courses.routing").then(m => m.COURSES_ROUTES)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];
