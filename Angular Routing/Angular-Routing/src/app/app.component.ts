import { Component, OnInit } from '@angular/core';
import { AuthStore } from './services/auth.store';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { MessagesComponent } from './shared/messages/messages.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatToolbar,
    MatAnchor,
    MatIcon,
    NgIf,
    AsyncPipe,
    MessagesComponent,
    LoadingComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive]
})
export class AppComponent implements OnInit {

  constructor(public auth: AuthStore, private router: Router) {

  }

  ngOnInit() {


  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }
}
