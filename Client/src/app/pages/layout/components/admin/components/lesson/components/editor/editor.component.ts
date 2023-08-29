import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js';
import ImageResize from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module';
import { ContentChange, EditorChangeSelection } from 'ngx-quill';
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
})
export class EditorComponent implements OnInit {
  content: any;
  @Output('save') saveEvent: EventEmitter<string> = new EventEmitter();
  @Input('content')
  set contentInput(contentVal: string | undefined) {
    if (contentVal == undefined) return;
    console.log('raw', JSON.parse(contentVal));
    this.content = JSON.parse(contentVal);
  }
  @Input('isPreview') isPreview!: boolean;
  @Input('isSave')
  set isSaveInput(isSave: boolean) {
    if (isSave) {
      this.saveEvent.emit(JSON.stringify(this.content));
    }
  }
  ngOnInit(): void {}

  editor_modules = {};
  constructor() {
    this.editor_modules = {
      'emoji-shortname': true,
      'emoji-textarea': false,
      'emoji-toolbar': true,
      toolbar: [
        ['emoji'],
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['clean'], // remove formatting button
        ['link', 'image', 'video'],
      ],
      imageResize: true,
      imageDrop: true,
    };
  }

  blured = false;
  focused = false;

  created(event: any) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event);
  }

  changedContent(event: ContentChange | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event);
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    // console.log('focus', $event);
    this.focused = true;
    this.blured = false;
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    // console.log('blur', $event);
    this.focused = false;
    this.blured = true;
  }
}
