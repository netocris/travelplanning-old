import { OnInit } from '@angular/core';

export abstract class BaseComponent implements OnInit {

  protected stillLoading: boolean = false;
  protected timeout: number = 200;

  constructor() { }

  ngOnInit() {
    this.ngOnInitCustom();
  }

  protected abstract ngOnInitCustom(): void

}
