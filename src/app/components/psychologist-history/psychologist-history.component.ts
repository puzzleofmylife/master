import { Component, OnInit, Input } from '@angular/core';
import { PsychologistHistory } from '../../models/PsychologistHistory';

@Component({
  selector: 'app-psychologist-history',
  templateUrl: './psychologist-history.component.html',
  styleUrls: ['./psychologist-history.component.css']
})
export class PsychologistHistoryComponent implements OnInit {

  @Input() psychologistHistory: PsychologistHistory[];
  show: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
