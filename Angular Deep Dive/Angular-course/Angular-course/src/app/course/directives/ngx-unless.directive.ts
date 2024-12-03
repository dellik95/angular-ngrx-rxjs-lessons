import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngxUnless]',
  standalone: true
})
export class NgxUnlessDirective {

  @Input()
  set ngxUnless(condition: boolean) {
    if (!condition) {
      this.container.createEmbeddedView(this.templateRef, { condition: condition });
    } else {
      this.container.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private container: ViewContainerRef) { }

}
