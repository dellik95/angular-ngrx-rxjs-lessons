import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable, shareReplay } from 'rxjs';
import { Course } from '../model/course';
import { httpGet } from './util';``
import { filter } from 'rxjs/operators';
import { debug, RxJsLoggingLevel } from './custom.operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  private subject = new BehaviorSubject<Course[]>([]);


  public courses$: Observable<Course[]> = this.subject.asObservable();

  constructor() { }

  public init() {
    let http$ = httpGet<{ payload: Course[] }>("/api/courses")
      .pipe(map(data => Object.values(data.payload)))
      .subscribe(courses => {
        this.subject.next(courses);
      });
  }


  selectAdvancedCourses(): Observable<Course[]> {
    return this.filterByCategory("BEGINNER");
  }

  selectBeginnerCourses(): Observable<Course[]> {
    return this.filterByCategory("ADVANCED");
  }

  filterByCategory(category: string) {
    return this.courses$.pipe(map(x => x.filter(d => d.category == category)))
  }

  saveCourse(id: number, changes: any): Observable<any> {
    let courses = this.subject.getValue();
    let courseIdx = courses.findIndex(x => x.id === id);
    let newCourses = courses.slice(0);

    newCourses[courseIdx] = {
      ...courses[courseIdx],
      ...changes
    };

    this.subject.next(newCourses);

    return from(fetch(`/api/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(changes),
      headers: {
        "content-type": "application/json"
      }
    }));
  }


  selectCourseById(courseId: number): Observable<Course> {
    return this.courses$.pipe(debug(RxJsLoggingLevel.TRACE, "value"), map(x => x.find(d => d.id === courseId), filter(x => !!x)));
  }
}
