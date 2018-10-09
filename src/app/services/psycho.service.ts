import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RegisterPsycho } from '../models/RegisterPsycho';
import Psychologist from '../models/Psychologist';

@Injectable({
  providedIn: 'root'
})
export class PsychoService {

  constructor(private http: HttpClient) { }

  getAll() {
    //return this.http.get<Psycho[]>(`/psychos`);
  }

  getById(id: number) {
    return this.http.get(`/psychos` + id);
  }

  register(psycho: Psychologist) {
    var x = environment.baseAPIURL + '/api/User/psychologist';
    var y = psycho;
    return this.http.post(environment.baseAPIURL + '/api/User/psychologist', psycho);
  }
}
