import { Course } from './../model/course';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, EntityServices } from '@ngrx/data';

@Injectable({
  providedIn: 'root'
})
export class CourseEntityService extends EntityCollectionServiceBase<Course> {

  constructor(sef: EntityCollectionServiceElementsFactory) {
    super("Course", sef);
  }

}



