import { Component, OnInit, AfterContentInit, OnDestroy, ContentChild, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { ActionMenuOriginDirective } from '../../directives/action-menu-origin.directive';
import { ActionMenuDropdownDirective } from '../../directives/action-menu-dropdown.directive';
import { Subscription } from 'rxjs';
import Popper from 'popper.js';

@Component({
  selector: 'action-menu',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./action-menu.component.css']
})
export class ActionMenuComponent implements AfterContentInit, OnDestroy {

  @ContentChild(ActionMenuOriginDirective) origin: ActionMenuOriginDirective;
  @ContentChild(ActionMenuDropdownDirective) dropdown: ActionMenuDropdownDirective;

  @Input() placement = "bottom-start";

  private _popper: Popper;
  private _open = false;
  private _originSub: Subscription;

  constructor(private host: ElementRef,
    private renderer: Renderer2) {
  }

  @HostListener("document:click", ["$event.target"])
  click(target) {
    if (!(this.host.nativeElement as HTMLElement).contains(target)) {
      this.close();
    }
  }
  /* close(): any {
    throw new Error("Method not implemented.");
  } */


  /**
   * Subscribe to the origin click event
   */
  ngAfterContentInit() {
    this._originSub = this.origin.click.subscribe(_ => {
      this._open = !this._open;
      if (this._open) {
        this.open();
      } else {
        this.close();
      }
    });
  }

  /**
   * Append the dropdown to body and init popper
   */
  open() {
    document.body.appendChild(this.dropdown.element);
    this._popper = new Popper(this.origin.element, this.dropdown.element, {
      modifiers: {
        applyStyle: {
          onLoad: () => {
            this._toggleDropdown()
          }
        }
      }
    });
  }

  /**
   *
   * @returns Partial<PopperOptions>
   * @private
   */
  private _getOptions() {
    return {
      placement: this.placement,
      modifiers: {
        applyStyle: {
          onLoad: () => {
            this._toggleDropdown()
          }
        }
      }
    }
  }

  /**
   * Destroy popper and hide the dropdown
   */
  close() {
    this._open = false;
    this._popper && this._popper.destroy();
    this._toggleDropdown(false);
  }

  /**
   *
   * @param {boolean} show
   * @private
   */
  private _toggleDropdown(show = true) {
    const display = show ? "block" : "none";
    this.renderer.setStyle(this.dropdown.element, "display", display);
  }

  /**
   * Cleaning
   */
  ngOnDestroy() {
    this._originSub && this._originSub.unsubscribe();
    this.close();
  }
}
