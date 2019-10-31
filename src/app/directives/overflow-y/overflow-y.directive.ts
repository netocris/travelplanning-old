import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[overflow-y]'
})
export class OverflowYDirective {

  //@Input()
  //isResume: boolean = false;

  @HostBinding('style.height.px')
  elHeight: number;

  //private maxOffset: number = 308;

  private minOffset: number = 205;

  private resumeOffset: number = 0;

  //private entityDataRendered: boolean = false;

  //private subscription = null;

  constructor() { }

  ngOnInit() {

    /*if(this.isResume){
      this.resumeOffset = 50;
    }

    // if company is in context
    if(!this.isEmptyValue(this.companySummary.companySummary.idPpalIci)){
      this.entityDataRendered = true;
    }

    // if company context changed
    if(this.isEmptyObject(this.subscription)){
      this.subscription = this.companySummary.companySummaryChanged.subscribe(() => {
        this.entityDataRendered = true;
        this.onWindowResize();
      });
    }*/

    this.onWindowResize();

  }

  ngOnDestroy() {
    //if(this.isEmptyObject(this.subscription)){
    //  this.subscription.unsubscribe();
    //}
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    let innerHeight = window.innerHeight;
    this.elHeight = innerHeight - this.minOffset - this.resumeOffset;
    /*if(this.entityDataRendered){
      this.elHeight = innerHeight - this.maxOffset - this.resumeOffset;
    } else {
      this.elHeight = innerHeight - this.minOffset - this.resumeOffset;
    }*/
  }

  /*private isEmptyObject(value: any) {
    if (value === undefined || value === null) {
      return true;
    }
    return false;
  }

  private isEmptyValue(value: string) {
    if (value === undefined || value === null || value.split(' ').join('') === '') {
      return true;
    }
    return false;
  }*/

}