import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent extends BaseComponent {

  private recordSubscription: Subscription = null;
  private toastSubscription: Subscription = null;

  private id: string = '-1';

  editor: EditorJS;

  record: IRecord = null;

  submitted: boolean = false;

  success: boolean = false;

  toasts: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private recordService: RecordService, public toastService: ToastService) {
    super();
  }

  protected ngOnInitCustom(): void {

    // use observable approach
    this.route.paramMap.subscribe((params) => {
      this.record = null;
      const id = params.get('id');
      if(!this.isEmptyValue(id) && this.isEmptyObject(this.recordSubscription)){
        this.stillLoading = true;
        this.recordSubscription = this.recordService.getRecordByIdSnap(id).subscribe((data: any) => {
          if (data) {
            this.record = this.processData(data);
            if(!this.isEmptyValue(this.record.id)){
              this.id = this.record.id;
            }
            this.initializeEditor(true);
            this.stillLoading = false;
          }
        });
      } else {
        this.initializeEditor(false);
      }
    });


    if (this.isEmptyObject(this.toastSubscription)) {
      this.toastSubscription = this.toastService.toastObservable.subscribe((data: any[]) => {
        if (data) {
          this.toasts = data;
        }
      });
    }

  }

  protected ngOnDestroyCustom(): void {

    if (!this.isEmptyObject(this.recordSubscription)) {
      this.recordSubscription.unsubscribe();
    }

    if (!this.isEmptyObject(this.toastSubscription)) {
      this.toastSubscription.unsubscribe();
    }

  }

  /**
   * save data
   */
  save(): void {
    this.submitted = true;
    this.success = false;
    setTimeout(() => {
      this.editor.save().then((data) => {
        if(data && !this.isEmptyArray(data.blocks)){
          delete data.version;
          if(this.id === '-1') {
            this.recordService.save(data);
          } else {
            this.recordService.edit(this.id, data);
          }
          this.success = true;
        }

        this.submitted = false;
        if(this.success){
          this.showMessageSuccess();
        }

      }).catch((error) => {
        console.error('Saving failed: ', error);
      });
    }, this.timeout);
  }

  /**
   * show success message
   */
  showMessageSuccess(): void {
    this.toastService.add('save.success', {classname: 'bg-success text-light'});
  }

  /**
   * hide success message
   *
   * @param toast
   */
  hideMessage(toast: any): void {
    this.toastService.delete(toast);
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

  /**
   * initialize editor instance
   *
   * @param edit
   */
  private initializeEditor(edit: boolean): void {
    setTimeout(() => {
      if(edit){
        this.editor = new EditorJS({
          holder: 'editor',
          tools: {
            header: Header
          },
          data: this.record
        });
      } else {
        this.editor = new EditorJS({
          holder: 'editor',
          tools: {
            header: Header
          }
        });
      }
    }, this.timeout);
  }

}
