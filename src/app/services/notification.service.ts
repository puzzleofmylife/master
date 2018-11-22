import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Notifications } from '../models/Notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotifications(limit: number, page: number): Observable<Notifications> {
    return this.http.get<Notifications>(environment.baseAPIURL + '/api/notification', {
      params: new HttpParams()
        .set('limit', limit.toString())
        .set('page', page.toString())
    });
  }

  getNewNotificationCount(): Observable<Notifications>{
    return this.http.get<Notifications>(environment.baseAPIURL + '/api/notification/newcount');
  }
}
