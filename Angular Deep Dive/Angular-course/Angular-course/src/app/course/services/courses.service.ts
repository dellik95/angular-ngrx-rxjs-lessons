import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../model/course';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: "root"
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  public getCourses(page: number = 1, pageSize: number = 10): Observable<Course[]> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("pageSize", pageSize.toString());

    return this.http.get<{ payload: Course[] }>("api/courses", {
      params: params
    }).pipe(map(result => result.payload))
  }

  public saveCourse(course: Course) {
    return this.http.put(`api/courses/${course.id}`, course);
  }
}
