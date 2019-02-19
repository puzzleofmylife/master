import { Injectable } from '@angular/core';
import { HubConnection, IHttpConnectionOptions } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { SessionMessage } from '../models/SessionMessage';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  hubConnection: HubConnection;
  accessToken: string;
  reconnectTimeout: number = 5000;

  sessionMessageSubject: Subject<SessionMessage> = new ReplaySubject<SessionMessage>();

  constructor(private authService: AuthService) {
    this.connect();
  }

  private connect() {
    this.accessToken = this.authService.getAccessToken();

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.baseAPIURL + '/push-service?access_token=' + this.accessToken)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        this.handleOnStart();
      })
      .catch(error => {
        this.tryReconnect(error);
      });
  }

  private handleOnStart() {
    //Handler for recieving a new session message
    this.hubConnection.on('SESSION_MESSAGE', (data: SessionMessage) => {
      this.sessionMessageSubject.next(data);
    });

    //Try reconnecting when connection is closed
    this.hubConnection.onclose(error => {
      this.tryReconnect(error);
    });
  }

  private tryReconnect(error: any) {
    console.error(error);
    setTimeout(() => this.connect(), this.reconnectTimeout);
  }

  getSessionMessages() {
    return this.sessionMessageSubject.asObservable();
  }
}
