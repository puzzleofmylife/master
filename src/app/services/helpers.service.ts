import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  getPsychStatusClass(statusId: number) {
    switch (statusId) {
      case 1:
        return 'pending_approval';
        break;
      case 2:
        return 'active';
        break;
      case 3:
        return 'denied';
        break;
    }
  }

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
}
