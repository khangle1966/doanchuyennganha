import { Component, Input, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js';
import ImageResize from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module';
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
})
export class EditorComponent implements OnInit {
  @Input('content') content: any;
  ngOnInit(): void {}
  editor_modules = {};
  constructor() {
    this.editor_modules = {
      'emoji-shortname': true,
      'emoji-textarea': true,
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
  notify(event: any) {
    console.log(event);
    this.content = event;
  }

  // addBindingCreated(quill: Quill) {
  //   quill.keyboard.addBinding(
  //     {
  //       key: 'b',
  //     },
  //     (range, context) => {
  //       // tslint:disable-next-line:no-console
  //       console.log('KEYBINDING B', range, context);
  //     }
  //   );

  //   quill.keyboard.addBinding(
  //     {
  //       key: 'B',
  //       shiftKey: true,
  //     } as any,
  //     (range, context) => {
  //       // tslint:disable-next-line:no-console
  //       console.log('KEYBINDING SHIFT + B', range, context);
  //     }
  //   );
  // }

  blured = false;
  focused = false;

  addBindingCreated(quill: Quill) {
    quill.keyboard.addBinding(
      {
        key: 'b',
      },
      (range, context) => {
        // tslint:disable-next-line:no-console
        console.log('KEYBINDING B', range, context);
      }
    );

    quill.keyboard.addBinding(
      {
        key: 'B',
        shiftKey: true,
      } as any,
      (range, context) => {
        // tslint:disable-next-line:no-console
        console.log('KEYBINDING SHIFT + B', range, context);
      }
    );
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event);
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event);
    this.focused = true;
    this.blured = false;
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event);
    this.focused = false;
    this.blured = true;
  }
}
