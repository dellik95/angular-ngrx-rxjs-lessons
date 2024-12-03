import { Course } from '../model/course';
import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';
import { Update } from '@ngrx/entity';


export const loadAllCoursesAction = createAction("[Courses Module] Load All Courses");

export const allCoursesLoadedAction = createAction(
  "[Courses Module] All Courses Loaded",
  props<{ courses: Course[] }>());

export const courseUpdatedAction = createAction(
  "[Edit Course Dialog] Course Updated",
  props<{ update: Update<Course> }>());
