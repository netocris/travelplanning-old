import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IRecord } from '../../../models/i-record';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent extends BaseComponent {

  @Input()
  records: IRecord[];

  @Input()
  page: number;

  @Input()
  pageSize: number;

  @Output()
  pageOutputEventEmitter = new EventEmitter();

  constructor() {
    super();
  }

  pageEventEmitter(page: number){
    this.page = page;
    this.pageOutputEventEmitter.next(this.page);
  }

}
