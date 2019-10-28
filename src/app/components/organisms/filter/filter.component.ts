import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IRecord } from '../../../models/i-record';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent extends BaseComponent {

  value: string;

  @Input()
  records: IRecord[];

  @Output()
  searchOutputEventEmitter = new EventEmitter();

  constructor() {
    super();
  }

  search(): void {
    this.searchOutputEventEmitter.next(this.value);
  }

}
