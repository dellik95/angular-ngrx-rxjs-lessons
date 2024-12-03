import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[hightlighted]',
  standalone: true
})
export class HightlightedDirective implements OnInit {

  @HostBinding("class.is-hightlighted")
  isHightlighted: boolean;

  @HostListener("mouseover", ["$event"])
  mouseOver($event) {
    console.log($event);
    this.isHightlighted = true;
  }

  @HostListener("mouseleave", ["$event"])
  mouseLeave($event) {
    console.log($event);
    this.isHightlighted = false;
  }


  @Input("hightlighted")
  hightlighted: boolean;


  constructor(private container: ElementRef) { }


  ngOnInit(): void {
    this.isHightlighted = this.hightlighted;
  }

}
