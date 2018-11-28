import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  confirmEmail(userId: string, confirmToken: string): Observable<any> {
    return this.http.get(environment.baseAPIURL + '/api/User/confirmemail', { params: { userId: userId, confirmToken: confirmToken } });
  }

  sendPasswordReset(email: string): Observable<any> {
    return this.http.get(environment.baseAPIURL + '/api/User/sendpasswordreset?email=' + encodeURIComponent(email));
  }

  resetPassword(userId: string, resetToken: string, newPassword: string): Observable<any> {
    return this.http.post(environment.baseAPIURL + '/api/User/resetpassword', { userId: userId, resetToken: resetToken, newPassword: newPassword });
  }
}
