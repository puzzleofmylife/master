import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
  @Input() text: string;
  @Input() top: string;
  @Input() left: string;
  @Input() width: string;
  show: boolean = false;

  tooltipStyles: any;
  constructor() { }

  ngOnInit() {
    this.tooltipStyles = {
      'position': 'absolute',
      'left': this.left,
      'top': this.top,
      'width': this.width
      }
  }

  toggleTooltip() {
    this.show = !this.show;
  }
}
