import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterPsycho } from '../models/RegisterPsycho';

@Injectable({
  providedIn: 'root'
})
export class PsychoService {

  baseAPIURL: String = "https://localhost:5001";

  constructor(private http: HttpClient) { }

  getAll() {
    //return this.http.get<Psycho[]>(`/psychos`);
  }

  getById(id: number) {
    return this.http.get(`/psychos` + id);
  }

  register(psycho: RegisterPsycho) {
    return this.http.post(this.baseAPIURL + '/api/User/psychologist', psycho);
  }
}
