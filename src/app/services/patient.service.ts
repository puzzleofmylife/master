import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientQuestion } from '../models/PatientQuestion';
import PatientQuestionAnswer from '../models/PatientQuestionAnswer';
import { Psychologist } from '../models/Psychologist';
import { Patient } from './../models/Patient';
import { CancelReason } from '../models/CancelReason';
import { PatientPackage } from '../models/PatientPackage';

@Injectable({
	providedIn: 'root'
})
export class PatientService {

	constructor(private http: HttpClient) { }

	getQuestions(): Observable<PatientQuestion[]> {
		return this.http.get<PatientQuestion[]>(environment.baseAPIURL + '/api/Patient/questions');
	}

	register(patientUser: Patient): Promise<any> {
		return this.http.post<any>(environment.baseAPIURL + '/api/User/patient', patientUser).toPromise();
	}

	getPsychologist(): Observable<Psychologist> {
		return this.http.get<any>(environment.baseAPIURL + '/api/Patient/psychologist');
	}

	getQuestionAnswers(patientId: number): Observable<PatientQuestionAnswer[]> {
		return this.http.get<PatientQuestionAnswer[]>(environment.baseAPIURL + '/api/Patient/questions/answers', {
			params: new HttpParams().set('patientId', patientId.toString())
		});
	}

	changePsychologist(newPsychologistId: number) {
		return this.http.post(environment.baseAPIURL + '/api/Patient/psychologist/change', newPsychologistId);
	}

	getPatient(): Observable<Patient> {
		return this.http.get<any>(environment.baseAPIURL + '/api/Patient');
	}

	updatePatient(_patient: Patient): Observable<any> {
		return this.http.patch<any>(environment.baseAPIURL + '/api/Patient', _patient);
	}

	getCurrentPatientPackage(): Observable<PatientPackage> {
		return this.http.get<PatientPackage>(environment.baseAPIURL + '/api/Patient/package');
	}

	changePatientPackage(newPackageId: number) {
		return this.http.post(environment.baseAPIURL + '/api/Patient/package/change/' + newPackageId, null);
	}

	cancelPatientPackage(cancelReason: string) {
		return this.http.post(environment.baseAPIURL + '/api/Patient/package/cancel', { cancelReason: cancelReason });
	}

	undoCancelPatientPackage() {
		return this.http.post(environment.baseAPIURL + '/api/Patient/package/cancel/undo', null);
	}

	reactivatePatientPackage() {
		return this.http.post(environment.baseAPIURL + '/api/Patient/package/reactivate', null);
	}

	getCancelReasons(limit: number, page: number): Observable<CancelReason[]> {
		return this.http.get<CancelReason[]>(environment.baseAPIURL + '/api/Patient/cancellations', {
			params: new HttpParams()
			.set('limit', limit.toString())
			.set('page', page.toString())

		});
	}

	applyVoucher(voucherCode: string) {
		return this.http.post(environment.baseAPIURL + '/api/Patient/voucher/apply/' + voucherCode, null);
	}
}
