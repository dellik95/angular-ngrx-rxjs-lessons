import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { LessonSummary } from "../model/lesson-summary";
import { CoursesService } from "../services/courses.service";



export const lessonsResolver: ResolveFn<LessonSummary[]> = (route, state) => {
  let courseUrl = route.paramMap.get("courseUrl");
  var service = inject(CoursesService);
  return service.loadAllCourseLessonsSummary(courseUrl);
};
