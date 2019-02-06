import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  @ViewChild('yearSelect') yearSelect: ElementRef
  @ViewChild('monthSelect') monthSelect: ElementRef
  @ViewChild('daySelect') daySelect: ElementRef

  years: number[] = [];
	days: number[] = [];

  constructor() { }

  ngOnInit() {
    this.getYears();
  }

  getDate(): Date {
		let day: any = this.daySelect.nativeElement.value
		let month: any = this.monthSelect.nativeElement.value
		let year: any = this.yearSelect.nativeElement.value
		let resultDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
		return resultDate;
	}

	getYears() {
		var yearsToGet = 10;
		var currentYear = new Date().getFullYear();
		var endYear = currentYear + yearsToGet;
		for (let index = currentYear; index < endYear; index++) {
			this.years.push(index);
		}
	}

	setDays() {
		var selectedMonth = this.monthSelect.nativeElement.value;
		var selectedYear = this.yearSelect.nativeElement.value;
		if (!selectedMonth || !selectedYear) {
			this.days = [];
			return;
		}

		var daysInMonth = new Date(parseInt(selectedYear), parseInt(selectedMonth), 0).getDate();
		this.days = [];
		for (let day = 1; day <= daysInMonth; day++) {
			this.days.push(day);
		}
	}

}
