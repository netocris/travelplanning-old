import { IRecord } from './../../models/i-record';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { BaseComponent } from '../base.component';
import { Record } from '../../models/record';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent extends BaseComponent {

  editor: EditorJS;

  @Input()
  previousData: IRecord = null;

  @Output()
  editorOutputEventEmitter = new EventEmitter();

  constructor() {
    super();
  }

  protected ngOnInitCustom(): void {
    this.editor = new EditorJS({
      holder: 'editor',
      tools: {
        header: Header
      },
      data: this.previousData
    });
  }

  save(): void {
    this.editor.save().then((data) => {
      delete data.version;
      this.editorOutputEventEmitter.emit(data);
    }).catch((error) => {
      console.error('Saving failed: ', error);
    });
  }

}
