import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent implements OnInit {

  @Input() heading: string;
  @Input() text: string;
  @Input() inputLabel: string;
  @Output() promptResultEvt = new EventEmitter();
  @ViewChild('inputText') inputText: ElementRef;
  showInputRequired: boolean;

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.promptResultEvt.emit({ proceed: false });
  }

  proceed() {
    var result: any = {};

    if (this.inputLabel) {
      if (!this.inputText.nativeElement.value) {
        this.showInputRequired = true;
        return;
      }
      result.value = this.inputText.nativeElement.value;
    } 

    result.proceed = true;
    this.promptResultEvt.emit(result);
  }

}
