import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { RecordService } from '../../../services/record.service';
import { Subscription } from 'rxjs';
import { RecordDto } from '../../../models/record-dto';
import { IRecordDto } from '../../../models/i-record-dto';
import { RecordBlockDto } from '../../../models/record-block-dto';
import { IRecord } from '../../../models/i-record';

@Component({
  selector: 'app-list-record',
  templateUrl: './list-record.component.html',
  styleUrls: ['./list-record.component.css']
})
export class ListRecordComponent extends BaseComponent {

  private recordsSubscription: Subscription = null;
  
  records: IRecordDto[] = [];

  record: IRecordDto = null;

  constructor(private recordService: RecordService) {
    super();
  }

  protected ngOnInitCustom(): void {    
    this.stillLoading = true;    
    this.recordsSubscription = this.recordService.getRecords().subscribe((data: IRecord[]) => {
      if (data) {
        //this.records = data;
        this.processData(data);
        this.stillLoading = false;
      }
    });    
  }

  protected ngOnDestroyCustom(): void {
    if (this.isEmptyObject(this.recordsSubscription)) {
      this.recordsSubscription.unsubscribe();
    }
  }

  private processData(data: IRecord[]): void {    
    if(!this.isEmptyArray(data)){
      data.filter(item => {
        let dto = new RecordDto();
        dto.time = item.time;
        dto.blocks = [];        
        item.blocks.filter((item1 => {
          let blockDto = new RecordBlockDto();          
          blockDto.type = item1.type;
          blockDto.value = item1.data.text;
          dto.blocks.push(blockDto);
        }));        
        
        this.records.push(dto);
      });
    }
  }

  edit(record: IRecordDto){
    this.record = record;
  }
  
}
