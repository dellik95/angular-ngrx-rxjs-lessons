import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../model/course';

@Pipe({
  name: 'filterByCategory',
  standalone: true
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(value: Course[], category: string): Course[] {
    return value.filter(x => x.category === category);
  }
}
