import { Component, OnInit, ViewChild } from '@angular/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { Location } from '@angular/common';
import { PsychoService } from 'src/app/services/psycho.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-psychologist-pause',
  templateUrl: './psychologist-pause.component.html',
  styleUrls: ['./psychologist-pause.component.css']
})
export class PsychologistPauseComponent implements OnInit {

  @ViewChild('returnDateCmp') returnDateCmp: DatepickerComponent;
  returnDate: Date;
  invalidDate: boolean;
  psychologistId: number;
  loading: boolean;

  constructor(private _location: Location, 
    private psychService: PsychoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.psychologistId = this.route.snapshot.paramMap.get('id') as any;
  }

  confirm() {
    var returnDate = this.returnDateCmp.getDate();
    if (this.isValidDate(returnDate)) {
      this.invalidDate = true;
      return;
    } 
    
    this.loading = true;
    this.psychService.pause(this.psychologistId, returnDate).subscribe(x => {
      this.loading = false;
      this.router.navigate(['/profile/psychologist', this.psychologistId]);
		}, error => {
			this.loading = false;
			console.log(JSON.stringify(error));
		});
  }

  cancel() {
    this._location.back();
  }

  isValidDate(date: Date) {
    return date.toString() == 'Invalid Date';
  }
}
