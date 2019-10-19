import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { BaseComponent } from '../../base.component';
import { RecordService } from './../../../services/record.service';
import { IRecord } from './../../../models/i-record';
import { Record } from '../../../models/record';
import { IBlock } from '../../../models/i-block';
import { Block } from '../../../models/block';
import { IBlockContent } from '../../../models/i-block-content';
import { BlockContent } from '../../../models/block-content';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent extends BaseComponent {

  private recordSubscription: Subscription = null;

  record: IRecord = null;

  constructor(private route: ActivatedRoute, private recordService: RecordService) {
    super();
  }

  protected ngOnInitCustom(): void {
    this.record = new Record();
    const id = this.route.snapshot.queryParams['id'];
    if(!this.isEmptyValue(id)){
      this.recordSubscription = this.recordService.getRecordByIdSnap(id).subscribe((data: any) => {
        if (data) {
          this.record = this.processData(data);
          this.stillLoading = false;
        }
      });
    }
  }

  protected ngOnDestroyCustom(): void {
    if (!this.isEmptyObject(this.recordSubscription)) {
      this.recordSubscription.unsubscribe();
    }
  }

  private processData(data: any): IRecord {

    const record: IRecord = new Record();

    if(!this.isEmptyObject(data)){
      const doc = data.payload;
      if(!this.isEmptyObject(doc)){

        // store record id
        record.id = doc.id;

        // process data object
        const docData = doc.data();
        if(!this.isEmptyObject(docData)){
          record.time = docData.time;
          record.blocks = [];
          docData.blocks.filter(blockItem => {
            const block: IBlock = new Block();
            block.type = blockItem.type;
            const blockContent: IBlockContent = new BlockContent();
            blockContent.text = blockItem.data.text;
            block.data = blockContent;
            record.blocks.push(block);
          });
        }

      }
    }

    return this.record;

  };

  save(data: IRecord): void {
    this.recordService.save(data);
  }

}
