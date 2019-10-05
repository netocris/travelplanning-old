import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: EditorJS;

  constructor() { }

  ngOnInit() {
    this.editor = new EditorJS({
      holder: 'editor',
      tools: {
        header: Header        
      },      
    });
  }

}
