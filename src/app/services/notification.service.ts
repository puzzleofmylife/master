import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/Notification';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	constructor(private http: HttpClient) { }

	getNotifications(limit: number, page: number): Observable<Notification[]> {
		return this.http.get<Notification[]>(environment.baseAPIURL + '/api/notification',
			{
				params: new HttpParams()
					.set('limit', limit.toString())
					.set('page', page.toString())
			});
	}

	getNewNotificationCount(): Observable<any> {
		return this.http.get<any>(environment.baseAPIURL + '/api/notification/newcount');
	}

	markNotificationAsRead(): Observable<any> {
		return this.http.post(environment.baseAPIURL + '/api/Notification/markasread', null);
	}
}
