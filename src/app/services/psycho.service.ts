import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Psycho } from '../models/Pyscho';

@Injectable({
  providedIn: 'root'
})
export class PsychoService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Psycho[]>(`/psychos`);
  }

  getById(id: number) {
    return this.http.get(`/psychos` + id);
  }

  register(user: Psycho) {
    return this.http.post(`/psycho/register`, Psycho);
  }
}
