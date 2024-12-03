import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';

export const courseResolver: ResolveFn<Course> = (route, state) => {
  let courseUrl = route.paramMap.get("courseUrl");
  var service = inject(CoursesService);
  return service.loadCourseByUrl(courseUrl);
}
