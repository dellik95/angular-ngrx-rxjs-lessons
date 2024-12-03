import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import { Observable, map, fromEvent, concat } from 'rxjs';
import { Lesson } from '../model/lesson';
import { httpGet } from '../common/util';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { debug, RxJsLoggingLevel, setLoggingLevel } from '../common/custom.operators';
import { StoreService } from '../common/store.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {


  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;


  @ViewChild('searchInput', { static: true }) input: ElementRef;

  courseId: number;


  constructor(private route: ActivatedRoute, private store: StoreService) {
    setLoggingLevel(RxJsLoggingLevel.TRACE);
  }

  ngOnInit() {
    this.courseId = parseInt(this.route.snapshot.params['id']);
    this.course$ = this.store.selectCourseById(this.courseId);
    this.lessons$ = this.loadLessons();
  }

  ngAfterViewInit() {
    let allLessons$ = this.loadLessons();
    let searchLessons$ = fromEvent<Event>(this.input.nativeElement, "keyup").pipe(
      map((event) => event.target["value"]),
      debug(RxJsLoggingLevel.DEBUG, "Message"),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((text: string)=> {
        return this.loadLessons(text);
      })
    );


    this.lessons$ = concat(allLessons$, searchLessons$);
  }


  loadLessons(filter: string = ""): Observable<Lesson[]> {
    return httpGet<{ payload: Lesson[] }>(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${filter}`).pipe(map(body => body.payload));
  }
}
