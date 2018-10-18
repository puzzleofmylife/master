import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientQuestion } from '../models/PatientQuestion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<PatientQuestion[]> {
    return this.http.get<PatientQuestion[]>(environment.baseAPIURL + '/api/Patient/questions');
  }
}
