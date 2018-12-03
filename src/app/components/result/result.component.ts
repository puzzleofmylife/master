import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() success: boolean;
  @Input() heading: string;
  @Input() text: string;
  @Input() buttonText: string;
  @Input() buttonLink: string;

  constructor() { }

  ngOnInit() {
  }

}
