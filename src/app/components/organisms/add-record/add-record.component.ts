import { Component } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { RecordService } from '../../../services/record.service';
import { IRecord } from '../../../models/i-record';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent extends BaseComponent {

  constructor(private recordService: RecordService) {
    super();
  }

  save(data: IRecord): void {
    this.recordService.save(data);
  }
  
}
