import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PsychologistStatus } from './../models/PsychologistStatus';
import { Psychologist } from '../models/Psychologist';
import { Observable } from 'rxjs';

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
		return this.http.get<Psychologist[]>(environment.baseAPIURL + '/api/Psychologist', {
			params: new HttpParams().set('psychologistStatusId', psychologistStatusId.toString())
		});
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
		return this.http.post(environment.baseAPIURL + '/api/Psychologist/disable', {psychologistId: id, reason: reason});
	}

	enable(id: number): Observable<any> {
		return this.http.post(environment.baseAPIURL + '/api/Psychologist/enable/' + id, null);
	}
	updatePsychologist(_psychologist:Psychologist):Observable<any> {
		return this.http.patch<any>(environment.baseAPIURL + '/api/Psychologist/update',_psychologist)
	};
}
