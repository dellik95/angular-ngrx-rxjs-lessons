import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, Observable, of, timer } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, filter } from 'rxjs/operators';
import { httpGet } from '../common/util';
import { StoreService } from '../common/store.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  beginnerCourses$: Observable<Course[]> = null;
  advancedCourses$: Observable<Course[]> = null;
  constructor(private store: StoreService) {

  }

  ngOnInit() {

    this.advancedCourses$ = this.store.selectAdvancedCourses();
    this.beginnerCourses$ = this.store.selectBeginnerCourses();
  }

}
