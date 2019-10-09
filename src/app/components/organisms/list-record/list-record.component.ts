import { Component, OnInit } from '@angular/core';
import { Record } from '../../../models/record';
import { BaseComponent } from '../../base.component';
import { RecordService } from '../../../services/record.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-record',
  templateUrl: './list-record.component.html',
  styleUrls: ['./list-record.component.css']
})
export class ListRecordComponent extends BaseComponent {

  private recordsSubscription: Subscription = null;
  
  records: Record[] = [];

  constructor(private recordService: RecordService) {
    super();
  }

  protected ngOnInitCustom(): void {    
    this.stillLoading = true;    
    this.recordsSubscription = this.recordService.getRecords().subscribe((data: Record[]) => {
      if (data) {
        this.records = data;
        this.stillLoading = false;
      }
    });    
  }

  protected ngOnDestroyCustom(): void {
    if (this.isEmptyObject(this.recordsSubscription)) {
      this.recordsSubscription.unsubscribe();
    }
  }
  
}
