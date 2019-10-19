import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRecord } from '../../../models/i-record';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input()
  records: IRecord[];

  @Input()
  page: number;

  @Input()
  pageSize: number;

  @Output()
  pageOutputEventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  pageEventEmitter(page: number){
    this.page = page;
    this.pageOutputEventEmitter.next(this.page);
  }

}
