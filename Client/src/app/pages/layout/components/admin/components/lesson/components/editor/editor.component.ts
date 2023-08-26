import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
})
export class EditorComponent implements OnInit {
  @Input('content') content: any;
  ngOnInit(): void {}

  constructor() {}
  notify(event: any) {
    console.log(event);
    this.content = event;
  }
}
