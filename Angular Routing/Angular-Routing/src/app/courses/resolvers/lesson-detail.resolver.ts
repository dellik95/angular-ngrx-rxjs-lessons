import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CoursesService } from "../services/courses.service";
import { LessonDetail } from "../model/lesson-detail";

export const lessonDetailResolver: ResolveFn<LessonDetail> = (route, state) => {
  let courseUrl = route.parent.paramMap.get("courseUrl");
  let seqNo = route.paramMap.get("lessonSeqNo");
  var service = inject(CoursesService);
  return service.loadLessonDetail(courseUrl, seqNo);
};
