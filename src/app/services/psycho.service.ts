import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Psychologist from '../models/Psychologist';
import PsychologistPublic from '../models/PsychologistPublic';

@Injectable({
  providedIn: 'root'
})
export class PsychoService {

  constructor(private http: HttpClient) { }

  getAvailable(limit: number) {
    return this.http.get<PsychologistPublic[]>(environment.baseAPIURL + '/api/Psychologist/available', { params: new HttpParams().set('limit', limit.toString()) });
  }

  register(psycho: Psychologist) {
    return this.http.post(environment.baseAPIURL + '/api/User/psychologist', psycho);
  }
}
