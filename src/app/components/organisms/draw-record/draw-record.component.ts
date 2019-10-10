import { Component, OnInit, Input } from '@angular/core';
import { RecordDto } from '../../../models/record-dto';

@Component({
  selector: 'app-draw-record',
  templateUrl: './draw-record.component.html',
  styleUrls: ['./draw-record.component.css']
})
export class DrawRecordComponent implements OnInit {

  @Input()
  record: RecordDto = null;

  constructor() { }

  ngOnInit() {
  }

}
