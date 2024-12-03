import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LessonDetail } from "../model/lesson-detail";
import { MatIcon } from '@angular/material/icon';
import { NgIf, AsyncPipe } from '@angular/common';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lesson',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
  standalone: true,
  imports: [MatIcon, NgIf, SafeUrlPipe, AsyncPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LessonDetailComponent {

  @Input()
  lesson: LessonDetail;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {

  }

  onPrevious(lesson: LessonDetail): void {
    let prevSeqNo = lesson.seqNo - 1;
    this.router.navigate(["lessons", prevSeqNo], {
      relativeTo: this.activeRoute.parent
    });
  }

  onNext(lesson: LessonDetail): void {
    let nextSeqNo = lesson.seqNo + 1;
    this.router.navigate(["lessons", nextSeqNo], {
      relativeTo: this.activeRoute.parent
    });
  }

}
