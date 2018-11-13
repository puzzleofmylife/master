import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class HelpersService {

	constructor() { }

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
