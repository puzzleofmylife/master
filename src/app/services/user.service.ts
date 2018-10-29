import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PatientQuestion } from '../models/PatientQuestion';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  confirmEmail(userId: string, confirmToken: string): Observable<any> {
    return this.http.get(environment.baseAPIURL + '/api/User/confirmemail', { params: { userId: userId, confirmToken: confirmToken } });
  }

}
