import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IRecordDto } from '../../../models/i-record-dto';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  value: string;

  @Input()
  records: IRecordDto[];

  @Output()
  searchOutputEventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  search(): void {
    this.searchOutputEventEmitter.next(this.value);
  }

}
