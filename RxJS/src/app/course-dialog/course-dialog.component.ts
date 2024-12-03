import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { Observable, from } from 'rxjs';
import { concatMap, debounceTime, filter } from 'rxjs/operators';
import { StoreService } from '../common/store.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {

  form: FormGroup;
  course: Course;

  @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course, private store: StoreService) {

    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });
  }

  /*ngOnInit() {
    this.form.valueChanges.pipe(
      debounceTime(300),
      filter(x => this.form.valid),
      concatMap(changes => {
        return this.saveCourse(this.course.id, changes);
      }))
      .subscribe(x => {
      });
  }*/

  saveCourse(id, changes): Observable<Response> {
    return from(fetch(`/api/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(changes),
      headers: {
        "content-type": "application/json"
      }
    }))
  }


  ngAfterViewInit() {


  }



  close() {
    this.dialogRef.close();
  }

  save() {
    this.store.saveCourse(this.course.id, this.form.value).subscribe(
      () => this.close(),
      error => console.log(error));
  }
}
