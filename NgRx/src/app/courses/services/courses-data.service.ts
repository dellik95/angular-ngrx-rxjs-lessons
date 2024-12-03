import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Course } from './../model/course';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpOptions } from '@ngrx/data/src/dataservices/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesDataService extends DefaultDataService<Course> {

  constructor(
    private httpClient: HttpClient,
    private ulrGenerator: HttpUrlGenerator) {
    super("Course", httpClient, ulrGenerator);
  }

  getAll(options?: HttpOptions): Observable<Course[]> {
    return this.http.get<{ payload: Course[] }>("/api/courses")
      .pipe(
        map(response => response.payload)
      );
  }
}
