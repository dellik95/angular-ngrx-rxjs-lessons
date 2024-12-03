import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  standalone: true,
  imports: [NgIf, RouterOutlet]
})
export class CourseComponent implements OnInit {

  @Input()
  course: Course;

  @Input()
  couponCode: string;


  constructor() {


  }

  ngOnInit() {


  }

}
