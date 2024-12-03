import { map } from 'rxjs/operators';
import { concatMap } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { Action } from 'rxjs/internal/scheduler/Action';
import { CourseActions } from '.';


@Injectable({
  providedIn: 'root'
})
export class CoursesEffects {

  constructor(private actions$: Actions, private coursesService: CoursesHttpService) { }

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.loadAllCoursesAction),
      concatMap(() => this.coursesService.findAllCourses()),
      map(result => CourseActions.allCoursesLoadedAction({
        courses: result
      }))
    );
  });


  saveCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.courseUpdatedAction),
      concatMap(
        action =>
          this.coursesService.saveCourse(action.update.id, action.update.changes)
      )
    );
  },
    {
      dispatch: false
    });
}
