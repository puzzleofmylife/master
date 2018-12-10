import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentCard } from '../models/PaymentCard';
import { ChargeResponse } from '../models/ChargeResponse';

@Injectable({
	providedIn: 'root'
})
export class PaymentService {

	constructor(private http: HttpClient) { }

	createCheckout(): Promise<any> {
		return this.http.get<any>(environment.baseAPIURL + '/api/Payment/checkout').toPromise();
	}

	getCheckoutStatus(checkoutId: string): Promise<any> {
		var params = { params: new HttpParams().set('checkoutId', checkoutId) }
		return this.http.get<any>(environment.baseAPIURL + '/api/Payment/checkout/status', params).toPromise();
	}

	getPaymentCardDetails(): Observable<PaymentCard> {
		return this.http.get<PaymentCard>(environment.baseAPIURL + '/api/Payment/card');
	}

	getOutstandingBalance(): Observable<any> {
		return this.http.get<any>(environment.baseAPIURL + '/api/Payment/billing/outstanding');
	}

	settleOutstandingBalance(): Observable<ChargeResponse> {
		return this.http.post<ChargeResponse>(environment.baseAPIURL + '/api/Payment/billing/settleoutstanding', null);
	}
}
