import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[overflow-y]'
})
export class OverflowYDirective {

  @Input()
  maxOffset: number = 0;

  @HostBinding('style.height.px')
  elHeight: number;

  private offset: number = 160;

  constructor() { }

  ngOnInit() {
    this.onWindowResize();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.elHeight = window.innerHeight - this.offset - this.maxOffset;
  }

}