import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MessagesService} from './messages.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, AsyncPipe, MatIcon]
})
export class MessagesComponent implements OnInit {

  showMessages = false;

  errors$: Observable<string[]>;


  constructor(public messagesService: MessagesService) {

      console.log("Created messages component");

  }

  ngOnInit() {
      this.errors$ = this.messagesService.errors$
          .pipe(
              tap(() => this.showMessages = true)
          );

  }


  onClose() {
      this.showMessages = false;

  }

}
