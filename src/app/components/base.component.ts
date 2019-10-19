import { OnInit } from '@angular/core';

export abstract class BaseComponent implements OnInit {

  stillLoading: boolean = false;
  protected timeout: number = 100;
  
  constructor() { }

  ngOnInit() {
    this.ngOnInitCustom();
  }

  ngOnDestroy() {
    this.ngOnDestroyCustom();
  }

  protected ngOnInitCustom(): void {
  }

  protected ngOnDestroyCustom(): void {
  }

  protected isEmptyObject(value: any) {
    if (value === undefined || value === null) {
        return true;
    }
    return false;
  }

  protected isEmptyArray(value: any[]) {
    if (value === undefined || value === null || value.length <= 0) {
        return true;
    }
    return false;
  }

  protected isEmptyValue(value: string) {
    if (value === undefined || value === null || value.split(' ').join('') === '') {
        return true;
    }
    return false;
  }

}
