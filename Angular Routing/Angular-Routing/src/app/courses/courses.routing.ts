import { lessonDetailResolver } from './resolvers/lesson-detail.resolver';
import { Route } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { LessonsListComponent } from "./lessons-list/lessons-list.component";
import { LessonDetailComponent } from './lesson/lesson-detail.component';
import { courseResolver, lessonsResolver } from "./resolvers"
import { authGuard, childAtuhGuard } from '../shared/guards/auth.guard';


export const COURSES_ROUTES: Route[] = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: ":courseUrl",
    canActivate: [authGuard],
    canActivateChild: [childAtuhGuard],
    component: CourseComponent,
    children: [
      {
        path: "",
        component: LessonsListComponent,
        resolve: {
          lessons: lessonsResolver
        }
      },
      {
        path: "lessons/:lessonSeqNo",
        component: LessonDetailComponent,
        resolve: {
          lesson: lessonDetailResolver
        }
      }
    ],
    resolve: {
      course: courseResolver
    }
  }
]
