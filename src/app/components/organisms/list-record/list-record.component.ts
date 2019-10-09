import { Component, OnInit } from '@angular/core';
import { Record } from '../../../models/record';
import { BaseComponent } from '../../base.component';
import { RecordService } from '../../../services/record.service';

@Component({
  selector: 'app-list-record',
  templateUrl: './list-record.component.html',
  styleUrls: ['./list-record.component.css']
})
export class ListRecordComponent extends BaseComponent {

  records: Record[] = [];

  constructor(private recordService: RecordService) {
    super();
  }

  protected ngOnInitCustom(): void {    
    this.stillLoading = true;
    setTimeout(() => {
      this.subscribtion = this.recordService.getRecords().subscribe((data: Record[]) => {
        if (data) {
          this.records = data;
          this.stillLoading = false;
        }
      });
    }, this.timeout); 
  }

  protected ngOnDestroyCustom(): void {
    if (this.isEmptyObject(this.subscribtion)) {
      this.subscribtion.unsubscribe();
    }
  }
  
}
