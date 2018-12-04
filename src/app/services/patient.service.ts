import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientQuestion } from '../models/PatientQuestion';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/Patient';
import { Psychologist } from '../models/Psychologist';
import { Package } from '../models/Package';

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

  getCurrentPatientPackage(): Observable<Package>{
    return this.http.get<Package>(environment.baseAPIURL + '/api/Patient/package');
  }
}
