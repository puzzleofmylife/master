import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientQuestion } from '../models/PatientQuestion';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/Patient';
import { Psychologist } from '../models/Psychologist';
import PatientQuestionAnswer from '../models/PatientQuestionAnswer';

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

  getPsychologist(): Promise<Psychologist> {
    return this.http.get<any>(environment.baseAPIURL + '/api/Patient/psychologist').toPromise();
  }

  getQuestionAnswers(patientId: number): Observable<PatientQuestionAnswer[]> {
    return this.http.get<PatientQuestionAnswer[]>(environment.baseAPIURL + '/api/Patient/questions/answers',{
			params: new HttpParams().set('patientId', patientId.toString())
		});
  }
}
