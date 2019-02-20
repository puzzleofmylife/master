import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
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

  constructor() {
    this.connect();
  }

  private connect() {
    this.accessToken = localStorage.getItem('token');

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.baseAPIURL + '/push-service?access_token=' + this.accessToken)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    if (this.accessToken) {
      this.hubConnection
        .start()
        .then(() => {
          this.handleOnStart();
        })
        .catch(error => {
          this.tryReconnect(error);
        });
    }
  }

  private handleOnStart() {
    //Handler for recieving a new session message
    this.hubConnection.on('NOTIFICATION', (data: Notification) => {
      this.notificationSubject.next(data);
    });

    //Try reconnecting when connection is closed
    this.hubConnection.onclose(error => {
      this.statusSubject.next(false);
      //If we have an error we want to try reconnect
      if (error)
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

  stop() {
    this.hubConnection.stop();
  }

  start() {
    if (this.hubConnection.state == signalR.HubConnectionState.Disconnected)
      this.connect();
  }
}
