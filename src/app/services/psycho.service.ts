import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PsychologistStatus } from './../models/PsychologistStatus';
import { Psychologist } from '../models/Psychologist';
import { Observable } from 'rxjs';
import { PsychologistPaymentInfo } from '../models/PsychologistPaymentInfo';
import { Transaction } from '../models/Transaction';
import { PsychologistPayment } from '../models/PsychologistPayment';

@Injectable({
	providedIn: 'root'
})
export class PsychoService {

	constructor(private http: HttpClient) { }

	getAvailable(limit: number) {
		return this.http.get<Psychologist[]>(environment.baseAPIURL + '/api/Psychologist/available', {
			params: new HttpParams().set('limit', limit.toString())
		});
	}
	getStatuses() {
		return this.http.get<PsychologistStatus[]>(environment.baseAPIURL + '/api/Psychologist/statuses');
	}
	getByStatus(psychologistStatusId: number): Observable<Psychologist[]> {
		return this.http.get<Psychologist[]>(environment.baseAPIURL + '/api/Psychologist/status/' + psychologistStatusId);
	}

	getById(id: number): Observable<Psychologist> {
		return this.http.get<Psychologist>(environment.baseAPIURL + '/api/Psychologist/' + id);
	}

	register(psycho: Psychologist) {
		return this.http.post(environment.baseAPIURL + '/api/User/psychologist', psycho);
	}

	approveDeny(id: number, approve: boolean, denyMessage: string): Observable<any> {
		var params = { psychologistId: id, approve: approve, denyMessage: denyMessage };

		return this.http.post(environment.baseAPIURL + '/api/psychologist/approval', params);
	}

	getAttachmentById(attachmentId: number): Observable<any> {
		return this.http.get<any>(environment.baseAPIURL + '/api/Psychologist/attachment', {
			params: new HttpParams().set('attachmentId', attachmentId.toString())
		});
	}

	getPsychologist(): Observable<Psychologist> {
		return this.http.get<Psychologist>(environment.baseAPIURL + '/api/Psychologist');
	}

	disable(id: number, reason: string): Observable<any> {
		return this.http.post(environment.baseAPIURL + '/api/Psychologist/disable', { psychologistId: id, reason: reason });
	}

	enable(id: number): Observable<any> {
		return this.http.post(environment.baseAPIURL + '/api/Psychologist/enable/' + id, null);
	}

	updatePsychologist(_psychologist: Psychologist): Observable<any> {
		return this.http.patch<any>(environment.baseAPIURL + '/api/Psychologist/update', _psychologist)
	}

	getPaymentsDue(limit: number, page: number): Observable<PsychologistPaymentInfo[]> {
		return this.http.get<PsychologistPaymentInfo[]>(environment.baseAPIURL + '/api/Psychologist/payments/due',
			{
				params: new HttpParams()
					.set('limit', limit.toString())
					.set('page', page.toString())
			});
	}

	addPayment(psychologistPayment: PsychologistPayment): Observable<Transaction> {
		return this.http.post<Transaction>(environment.baseAPIURL + '/api/Psychologist/payments/add', psychologistPayment);
	}

	getTransactions(psychologistId: number, limit: number, page: number): Observable<Transaction[]> {
		return this.http.get<Transaction[]>(environment.baseAPIURL + '/api/Psychologist/transactions/' + psychologistId,
			{
				params: new HttpParams()
					.set('limit', limit.toString())
					.set('page', page.toString())
			});
	}

	getBalance(psychologistId: number): Observable<any> {
		return this.http.get<any>(environment.baseAPIURL + '/api/Psychologist/balance/' + psychologistId);
	}

	getBalanceDate(): Observable<any> {
		return this.http.get<any>(environment.baseAPIURL + '/api/Psychologist/balance/date');
	}
}
