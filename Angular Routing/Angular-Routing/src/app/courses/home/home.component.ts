import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {Observable} from 'rxjs';
import {CoursesService} from "../services/courses.service";
import {map} from "rxjs/operators";
import {LoadingService} from "../../shared/loading/loading.service";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    CoursesCardListComponent
  ]
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private courses: CoursesService,
    private loading: LoadingService) {

  }

  ngOnInit() {

      this.reloadCourses();

  }

  reloadCourses() {

    const courses$ = this.courses.loadAllCourses();

      this.beginnerCourses$ = this.filterByCategory(courses$, "BEGINNER");

      this.advancedCourses$ = this.filterByCategory(courses$, "ADVANCED");

  }

  filterByCategory(courses$: Observable<Course[]>, category:string) {
    return this.loading.showLoaderUntilCompleted(courses$)
      .pipe(
        map(courses => courses.filter(course => course.category == category).sort(sortCoursesBySeqNo))
      );
  }

}


