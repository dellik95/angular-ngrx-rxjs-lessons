import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {LessonSummary} from "../model/lesson-summary";
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, RouterLinkActive]
})
export class LessonsListComponent {

  @Input()
  lessons:LessonSummary[];

  constructor() {

  }

}
