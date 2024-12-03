import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Course } from './model/course';
import { CourseCardComponent } from './course/course-card/course-card.component';
import { Observable } from 'rxjs';
import { CoursesService } from './course/services/courses.service';
import { IConfiguration } from '../environments/configuration.interface';
import { CONFIG_TOKEN } from '../environments/token';
import { tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CourseCardComponent, CommonModule],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AppComponent implements AfterViewInit, OnInit {

  courses$: Observable<Course[]>;
  coursesTotal: number;

  @ViewChild(CourseCardComponent)
  card: CourseCardComponent;

  prefetchData: boolean = false;
  display: boolean = false;
  constructor(private coursesService: CoursesService, @Inject(CONFIG_TOKEN) private config: IConfiguration) {
    console.log("constructor", this.card);
  }

  ngOnInit(): void {
    this.courses$ = this.coursesService.getCourses().pipe(tap(result => {
      this.coursesTotal = result.length ?? 0;
    }));
  }


  ngAfterViewInit(): void {

  }

  onViewClick(id: number): void {
    console.log("View clicked in App", id);
  }


  trackCourse(index: number, course: Course) {
    return course.id
  }

  getCardClasses(first: boolean, last: boolean) {
    return { 'is-first': first, 'is-last': last };
  }


  onCourseSave(course: Course) {
    this.coursesService.saveCourse(course).subscribe();
  }

  onEdidCourse() {
    throw new Error('Method not implemented.');
  }

  onPrefetchClick() {
    this.prefetchData = true;
  }

  onDisplayClick() {
    this.display = true;
  }
}
