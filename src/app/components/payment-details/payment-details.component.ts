import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-payment-details',
	templateUrl: './payment-details.component.html',
	styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

	constructor(private _router: Router) { }

	ngOnInit() {
	}

	navigateToUpdateCard() {
		this._router.navigate(['/update-card']);
	}
}
