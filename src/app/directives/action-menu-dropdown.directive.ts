import { Directive, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[actionMenuDropdown]'
})
export class ActionMenuDropdownDirective {
  @HostBinding('style.display') display = 'none';

  constructor(public host: ElementRef) {
  }

  get element() {
    return this.host.nativeElement;
  }

}
