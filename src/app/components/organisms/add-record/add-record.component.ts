import { Component } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { RecordService } from '../../../services/record.service';
import { Record } from '../../../models/record';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent extends BaseComponent {

  constructor(private recordService: RecordService) {
    super();
  }

  save(data: Record): void {
    this.recordService.save(data);
  }
  
}
