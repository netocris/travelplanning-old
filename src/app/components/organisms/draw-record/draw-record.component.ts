import { Component, OnInit, Input } from '@angular/core';
import { Record } from '../../../models/record';

@Component({
  selector: 'app-draw-record',
  templateUrl: './draw-record.component.html',
  styleUrls: ['./draw-record.component.css']
})
export class DrawRecordComponent implements OnInit {

  @Input()
  record: Record = null;

  constructor() { }

  ngOnInit() {
  }

}
