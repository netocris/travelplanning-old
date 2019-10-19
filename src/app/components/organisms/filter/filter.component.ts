import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IRecord } from '../../../models/i-record';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  value: string;

  @Input()
  records: IRecord[];

  @Output()
  searchOutputEventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  search(): void {
    this.searchOutputEventEmitter.next(this.value);
  }

}
