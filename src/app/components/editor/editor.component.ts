import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: EditorJS;
  
  @Output()
  editorOutputEventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.editor = new EditorJS({
      holder: 'editor',
      tools: {
        header: Header        
      },      
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
