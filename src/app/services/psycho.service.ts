import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Psychologist from '../models/Psychologist';
import PsychologistPublic from '../models/PsychologistPublic';
import { PsychologistStatus } from './../models/PsychologistStatus';



@Injectable({
  providedIn: 'root'
})
export class PsychoService {

  constructor(private http: HttpClient) { }

  getAvailable(limit: number) {
    return this.http.get<PsychologistPublic[]>(environment.baseAPIURL + '/api/Psychologist/available', {
      params: new HttpParams().set('limit', limit.toString())
    });
  }
  getStatus() {
    return this.http.get<PsychologistStatus[]>(environment.baseAPIURL + '/api/Psychologist/statuses');
  }
  getById(psychologistStatusId: number) {
    return this.http.get<PsychologistStatus[]>(environment.baseAPIURL + '/api/Psychologist', {
      params: new HttpParams().set('psychologistStatusId', psychologistStatusId.toString())
    });
  }

  register(psycho: Psychologist) {
    return this.http.post(environment.baseAPIURL + '/api/User/psychologist', psycho);
  }
}
