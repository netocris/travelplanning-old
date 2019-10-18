import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: EditorJS;

  @Input()
  previousData = {
    time: 0,
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "teste"
        }
      }
    ]
  };
  
  @Output()
  editorOutputEventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
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
