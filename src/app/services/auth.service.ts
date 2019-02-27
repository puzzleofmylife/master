import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthState } from '../models/AuthState';
import { PushService } from './push.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authStateSubject: BehaviorSubject<AuthState> = new BehaviorSubject<AuthState>(this.getAuthState());

	constructor(private http: HttpClient, private jwtHelper: JwtHelper, private pushService: PushService) { }

	getAuthState(): AuthState {
		var authState = new AuthState();
		authState.IsLoggedIn = tokenNotExpired();

		if (authState.IsLoggedIn) {
			var decodedToken = this.jwtHelper.decodeToken(this.getAccessToken());
			authState.IsAdmin = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == "Admin";
			authState.IsPatient = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == "Patient";
			authState.IsPsychologist = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == "Psychologist";
		}

		return authState;
	}

	private updateLoggedInSubject(): void {
		this.authStateSubject.next(this.getAuthState());
	}

	setAccessToken(token: string): void {
		localStorage.setItem('token', token);
		this.pushService.start();
		this.updateLoggedInSubject();
	}

	getAccessToken(): string {
		return localStorage.getItem('token');
	}

	login(email: string, password: string): Observable<any> {
		return this.http.get<any>(environment.baseAPIURL + '/api/Auth/login?username=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password))
			.pipe(map(result => {
				this.setAccessToken(result.token);
				this.pushService.start();
			}));
	}

	logout(): void {
		localStorage.removeItem('token');
		this.pushService.stop();
		this.updateLoggedInSubject();
	}

	authState(): Observable<AuthState> {
		return this.authStateSubject.asObservable();
	}
}
