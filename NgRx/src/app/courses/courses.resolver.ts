import { tap, filter, first } from 'rxjs/operators';
import { map, concatMap } from 'rxjs/operators';
import { CourseEntityService } from './services/course-entity.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CoursesResolver implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.courseEntityService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.courseEntityService.getAll();
        }
      }),
      filter(loaded => !!loaded),
      first());

  }

  constructor(private courseEntityService: CourseEntityService) {

  }
}
