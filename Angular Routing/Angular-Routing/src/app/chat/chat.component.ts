import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [MatButton, RouterLink]
})
export class ChatComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  onCloseChat() {
    this.router.navigate([{outlets: {chat: null}}]);
  }

}
