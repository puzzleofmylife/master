import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class HelpersService {

	constructor() { }

  getColourHashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    var c = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }

  convertToLocalDate(utcDate: Date): Date {
    return moment.utc(utcDate).local().toDate();
  }
  
	getPsychStatusClass(statusId: number): string {
		let status: string;

		switch (statusId) {
			case 1:
				status = 'pending_approval';
				break;
			case 2:
				status = 'active';
				break;
			case 3:
				status = 'denied';
				break;
		}
       return status;
	}
}
