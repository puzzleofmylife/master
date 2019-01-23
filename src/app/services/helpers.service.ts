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
			case 4:
				status = 'disabled';
		}
		return status;
	}

	getPackageStatusClass(statusId: number): string {
		let status: string;

		switch (statusId) {
			case 1:
				status = 'active';
				break;
			case 2:
				status = 'pending_payment';
				break;
			case 3:
				status = 'cancelled';
				break;
		}
		return status;
	}

	hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ?
			[parseInt(result[1], 16),
			parseInt(result[2], 16),
			parseInt(result[3], 16)]
			: null;
	}

	getDynamicColourAvatarStyle(inputString: string) {
		var backgroundColor = this.getColourHashCode(inputString);
    var borderRadius = '50%';

    var color = 'black';
    //Check if the background color is light or dark, then set the text color to either black or white
    var rgb = this.hexToRgb(backgroundColor);
    var o = Math.round(((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000);
    if (o < 125) {
      color = 'white';
		}
		
		return `background-color:#${backgroundColor};border-radius:${borderRadius};color:${color};width:50px;height:50px;text-align:center;`;
	}

	getVoucherGroupStatusClass(statusKey: boolean): string {
		let statusValue: string;

		switch (statusKey) {
			case true:
				statusValue = 'success';
				break;
			case false:
				statusValue = 'error';
				break;
		}
		return statusValue;
	}
}
