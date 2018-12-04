import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-payment-update',
	templateUrl: './payment-update.component.html',
	styleUrls: ['./payment-update.component.css']
})
export class PaymentUpdateComponent implements OnInit {
	paymentForm: FormGroup = new FormGroup({});
	environment = environment;

	constructor(
		private _renderer2: Renderer2,
		@Inject(DOCUMENT) private _document,
		private paymentService: PaymentService
	) { }

	ngOnInit() {
		this.updatePaymentCard();
	}

	async updatePaymentCard() {
		try {
			let checkout = await this.getCheckoutId();
			this.initPaymentForm(checkout.checkoutId);

		} catch (error) {
			console.log(JSON.stringify(error));
		}
	}

	initPaymentForm(checkoutId: string): void {
		let s = this._renderer2.createElement('script');
		s.src = environment.checkoutFormSrc + '?checkoutId=' + checkoutId;
		this._renderer2.appendChild(this._document.body, s);

		let payFormOptions = this._renderer2.createElement('script');
		payFormOptions.text = `
        var wpwlOptions = {
            onReady: function() {
                x=document.getElementsByClassName("wpwl-button-pay");  // Find the elements
                for(var i = 0; i < x.length; i++){
                x[i].innerText="Save card";    // Change the content
                }
            }
        }
    `;
		this._renderer2.appendChild(this._document.body, payFormOptions);
	}

	getCheckoutId(): Promise<any> {
		return this.paymentService.createCheckout();
	}
}
