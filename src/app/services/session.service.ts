import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Session } from '../models/Session';
import { SessionMessage } from '../models/SessionMessage';
import { PsychologistSession } from '../models/PsychologistSession';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  getPatientSession(): Observable<Session> {
    return this.http.get<Session>(environment.baseAPIURL + '/api/Session/patient');
  }

  getSessionMessages(sessionId: number, limit: number, page: number = 1): Observable<SessionMessage[]> {
    return this.http.get<SessionMessage[]>(environment.baseAPIURL + '/api/Session/messages', {
      params: new HttpParams()
        .set('sessionId', sessionId.toString())
        .set('limit', limit.toString())
        .set('page', page.toString())
    });
  }

  getSessionMessagesSince(sessionId: number, sinceDate: string): Observable<SessionMessage[]> {
    return this.http.get<SessionMessage[]>(environment.baseAPIURL + '/api/Session/messages/since', {
      params: new HttpParams()
        .set('sinceDate', sinceDate)
        .set('sessionId', sessionId.toString())
    });
  }

  createSessionMessage(sessionMessage: SessionMessage): Observable<SessionMessage> {
    return this.http.post<SessionMessage>(environment.baseAPIURL + '/api/Session/message/create', sessionMessage);
  }

  getNewSessionMessages(sessionId: number): Observable<SessionMessage[]> {
    return this.http.get<SessionMessage[]>(environment.baseAPIURL + '/api/Session/messages/new', {
      params: new HttpParams()
        .set('sessionId', sessionId.toString())
    });
  }

  getPsychologistSessions(): Observable<PsychologistSession[]> {
    return this.http.get<PsychologistSession[]>(environment.baseAPIURL + '/api/Session/psychologist');
  }

  getPsychologistSessionsNewMessageCount(): Observable<PsychologistSession[]> {
    return this.http.get<PsychologistSession[]>(environment.baseAPIURL + '/api/Session/psychologist/newmessages');
  }
}
