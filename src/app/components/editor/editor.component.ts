import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent extends BaseComponent {

  editor: EditorJS;

  @Input()
  previousData = {
    id: '',
    time: 0,
    blocks: []
  };

  @Output()
  editorOutputEventEmitter = new EventEmitter();

  constructor() {
    super();
  }

  protected ngOnInitCustom(): void {
    setTimeout(() => {
      debugger;
      this.editor = new EditorJS({
        holder: 'editor',
        tools: {
          header: Header
        },
        data: this.previousData
      });
    }, this.timeout);
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
