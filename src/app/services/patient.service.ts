import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientQuestion } from '../models/PatientQuestion';
import { environment } from 'src/environments/environment';
import { PatientUser } from '../models/PatientUser';
import Psychologist from '../models/Psychologist';
import PsychologistPublic from '../models/PsychologistPublic';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<PatientQuestion[]> {
    return this.http.get<PatientQuestion[]>(environment.baseAPIURL + '/api/Patient/questions');
  }

  register(patientUser: PatientUser): Promise<any> {
    return this.http.post<any>(environment.baseAPIURL + '/api/User/patient', patientUser).toPromise();
  }

  getPsychologist(): Promise<PsychologistPublic> {
    return this.http.get<any>(environment.baseAPIURL + '/api/Patient/psychologist').toPromise();
  }
}
