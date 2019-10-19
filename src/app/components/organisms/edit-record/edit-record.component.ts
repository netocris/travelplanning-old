import { Component } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { RecordService } from './../../../services/record.service';
import { IRecord } from './../../../models/i-record';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent extends BaseComponent {
  
  constructor(private route: ActivatedRoute, private recordService: RecordService) {
    super();
  }

  protected ngOnInitCustom(): void {
    const id = this.route.snapshot.queryParams['id'];
    if(!this.isEmptyValue(id)){
      this.recordService.getRecordById(id);
    }
  }

  save(data: IRecord): void {
    this.recordService.save(data);
  }  

}
