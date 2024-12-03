import { AfterContentChecked, AfterViewChecked, ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../model/course';
import { NgxUnlessDirective } from '../directives/ngx-unless.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'course-card',
  standalone: true,
  imports: [CommonModule, NgxUnlessDirective, FormsModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent implements OnInit, OnDestroy, OnChanges, AfterContentChecked, AfterViewChecked {

  isEditMode: boolean = false;



  onViewClickEvent = output<number>({
    alias: "onViewClick"
  });

  onSaveClickEvent = output<Course>({
    alias: "onCourseChanged"
  });


  course = input.required<Course>();

  index = input.required();




  constructor() {
    console.log("called ctor");
  }
  ngAfterContentChecked(): void {
    console.log("called ngAfterContentChecked");
  }
  ngAfterViewChecked(): void {
    console.log("called ngAfterViewChecked");
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }


  ngOnInit(): void {
    console.log("called ngOnInit");
  }

  ngOnDestroy(): void {
    console.log("called ngOnDestroy");
  }

  getCardClasses() {
    return {
      "beginner": this.course()?.category === "BEGINNER"
    }
  }

  onViewClick() {
    console.log("View clicked in CourceCard");
    this.onViewClickEvent.emit(this.course().id);
  }

  onSaveClick() {
    this.onSaveClickEvent.emit({
      ...this.course()
    });
    this.isEditMode = false;
  }

  changeMode() {
    this.isEditMode = !this.isEditMode;
  }
}
