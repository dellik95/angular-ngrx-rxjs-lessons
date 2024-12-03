import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from "@angular/forms";
import * as moment from 'moment';
import { CoursesService } from "../services/courses.service";
import { LoadingService } from "../../shared/loading/loading.service";
import { MessagesService } from "../../shared/messages/messages.service";
import { LoadingComponent } from '../../shared/loading/loading.component';
import { MatFormField } from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatOption } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MessagesComponent } from '../../shared/messages/messages.component';


@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  providers: [
    LoadingService,
    MessagesService
  ],
  imports: [
    MessagesComponent,
    LoadingComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule],
  standalone: true
})
export class CourseDialogComponent {

  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private courses: CoursesService) {

    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });

  }

  save() {

    const changes = this.form.value;

    this.courses.saveCourse(this.course.id, changes)
      .subscribe();

    this.dialogRef.close(changes);

  }

  close() {
    this.dialogRef.close();
  }

}
