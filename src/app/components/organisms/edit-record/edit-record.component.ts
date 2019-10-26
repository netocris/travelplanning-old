import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

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

  private subscription: Subscription = null;

  private id: string = '-1';

  editor: EditorJS;

  record: IRecord = null;

  submitted: boolean = false;

  success: boolean = false;

  toasts: any[] = [];

  constructor(private route: ActivatedRoute, private recordService: RecordService) {
    super();
  }

  protected ngOnInitCustom(): void {
    const id = this.route.snapshot.queryParams['id'];
    if(!this.isEmptyValue(id)){
      if (this.isEmptyObject(this.subscription)) {
        this.stillLoading = true;
        this.subscription = this.recordService.getRecordByIdSnap(id).subscribe((data: any) => {
          if (data) {
            this.record = this.processData(data);
            if(!this.isEmptyValue(this.record.id)){
              this.id = this.record.id;
            }
            this.stillLoading = false;
          }
        });
      }
    }
  }

  protected ngOnDestroyCustom(): void {
    if (!this.isEmptyObject(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    //if(this.isEmptyObject(this.editor)){
      setTimeout(() => {
        if(this.isEmptyObject(this.record)){
          this.editor = new EditorJS({
            holder: 'editor',
            tools: {
              header: Header
            }
          });
        } else {
          this.editor = new EditorJS({
            holder: 'editor',
            tools: {
              header: Header
            },
            data: this.record
          });
        }
      }, this.timeout);
    //}
  }

  /**
   * save data
   */
  save(): void {
    this.submitted = true;
    this.success = false;
    setTimeout(() => {
      this.editor.save().then((data) => {
        delete data.version;
        if(this.id === '-1') {
          this.recordService.save(data);
        } else {
          this.recordService.edit(this.id, data);
        }
        this.submitted = false;
        this.success = true;
      }).catch((error) => {
        console.error('Saving failed: ', error);
      });
    }, this.timeout);
  }

  /**
   * process data from service
   *
   * @param data data
   */
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

    return record;

  }

}
