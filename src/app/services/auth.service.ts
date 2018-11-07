import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoggedIn } from '../models/LoggedIn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInSubject: BehaviorSubject<LoggedIn> = new BehaviorSubject<LoggedIn>(this.getLoggedIn());

  constructor(private http: HttpClient, private jwtHelper: JwtHelper) { }

  private getLoggedIn(): LoggedIn {
    var loggedIn = new LoggedIn();
    loggedIn.IsLoggedIn = tokenNotExpired();

    if (loggedIn.IsLoggedIn) {
      var decodedToken = this.jwtHelper.decodeToken(this.getAccessToken());
      loggedIn.IsAdmin = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == "Admin";
    }

    return loggedIn;
  }

  private updateLoggedInSubject(): void {
    this.loggedInSubject.next(this.getLoggedIn());
  }

  setAccessToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getAccessToken(): string {
    return localStorage.getItem('token');
  }

  login(email: string, password: string): Observable<any> {
    var params = { params: { username: email, password: password } };

    return this.http.get<any>(environment.baseAPIURL + '/api/Auth/login', params)
      .pipe(map(result => {
        this.setAccessToken(result.token);
        this.updateLoggedInSubject();
      }));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.updateLoggedInSubject();
  }

  loggedIn(): Observable<LoggedIn> {
    return this.loggedInSubject.asObservable();
  }
}
