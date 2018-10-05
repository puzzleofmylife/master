import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[actionMenuOrigin]'
})
export class ActionMenuOriginDirective {
  click = fromEvent(this.element, "click");

  constructor(public host: ElementRef) {
  }

  get element() {
    return this.host.nativeElement;
  }
  
}
