import { Injectable } from '@angular/core';
import { HubConnection, IHttpConnectionOptions } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { SessionMessage } from '../models/SessionMessage';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Notification } from '../models/Notification';
import { Subject } from 'rxjs/internal/Subject';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  hubConnection: HubConnection;
  accessToken: string;
  reconnectTimeout: number = 5000;

  notificationSubject: Subject<Notification> = new ReplaySubject<Notification>();
  statusSubject: Subject<boolean> = new ReplaySubject<boolean>();
  connectRetryCount: number = 0;

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
    this.hubConnection.on('NOTIFICATION', (data: Notification) => {
      this.notificationSubject.next(data);
    });

    //Try reconnecting when connection is closed
    this.hubConnection.onclose(error => {
      this.statusSubject.next(false);
      this.tryReconnect(error);
    });

    //Only set true connected status if we're doing a tryReconnect
    if (this.connectRetryCount > 0)
      this.statusSubject.next(true);
  }

  private tryReconnect(error: any) {
    this.connectRetryCount++;
    console.error(error);
    setTimeout(() => this.connect(), this.reconnectTimeout);
  }

  getNotifications() {
    return this.notificationSubject.asObservable();
  }

  getStatus() {
    return this.statusSubject.asObservable();
  }
}
