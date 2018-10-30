import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(tokenNotExpired());

  constructor(private http: HttpClient) { }

  setAccessToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getAccessToken(): string {
    return localStorage.getItem('token');
  }

  private updateIsLoggedInSubject(): void {
    this.isLoggedInSubject.next(tokenNotExpired());
  }

  public login(email: string, password: string): Observable<any> {
    var params = { params: { username: email, password: password }};
    
    return this.http.get<any>(environment.baseAPIURL + '/api/Auth/login', params)
      .pipe(map(result => {
        this.setAccessToken(result.token);
        this.updateIsLoggedInSubject();
      }));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.updateIsLoggedInSubject();
  }

  isLoggedIn() : Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
