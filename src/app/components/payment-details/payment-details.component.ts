import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentCard } from '../../models/PaymentCard';
import { PaymentService } from './../../services/payment.service';

@Component({
	selector: 'app-payment-details',
	templateUrl: './payment-details.component.html',
	styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
	paymentCard: PaymentCard;
	loading = true;

	constructor(private _router: Router, private _paymentService: PaymentService) { }

	ngOnInit() {
		this._paymentService.getPaymentCardDetails().subscribe(response => {
			this.loading = false;
			this.paymentCard = response;

		}, error => {
			console.error(JSON.stringify(error));
			this.loading = false;
		})
	}

	navigateToUpdateCard() {
		this._router.navigate(['/update-card']);
	}
}
