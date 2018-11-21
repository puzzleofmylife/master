import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewChecked, SimpleChanges, OnChanges } from '@angular/core';
import { Session } from 'src/app/models/Session';
import { SessionService } from 'src/app/services/session.service';
import { SessionMessage } from 'src/app/models/SessionMessage';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/takeWhile';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnDestroy, AfterViewChecked {

  @ViewChild('chatDiv') private chatDiv: ElementRef;
  @ViewChild('messageInput') private messageInput: ElementRef;
  newMsgSubscription: Subscription;
  sessionMessages: SessionMessage[] = [];
  showSessionEmptyMsg: boolean;
  showSessionErrorMsg: boolean;
  initialGetCount: number = 50;
  newMessageGetInterval: number = 30 * 1000;//30 secs
  messageText: string = '';
  loaded: boolean = false;
  messagesAdded: boolean = false;
  messagesPage: number = 1;
  noMoreToLoad: boolean = false;

  private _session: Session = new Session();
  @Input() set session(value: Session) {
    this._session = value;
    this.initiateSession();
  }
  get session() {
    return this._session;
  }

  constructor(private sessionService: SessionService) { }

  initiateSession() {
    this.loaded = false;//Show spinner
    this.sessionMessages = [];//Clear any messages

    //Initial get of last X messages
    this.sessionService.getSessionMessages(this.session.id, this.initialGetCount, this.messagesPage).subscribe(response => {
      this.loaded = true;

      //Reverse the array because we want to show most recent at the bototm of the session chat window 
      this.sessionMessages = response.reverse();
      this.messagesAdded = true;

      if (this.sessionMessages.length == 0)
        this.showSessionEmptyMsg = true;

      //Set timer to get new messages
      this.newMsgSubscription = TimerObservable.create(this.newMessageGetInterval, this.newMessageGetInterval)
        .subscribe(() => {
          this.getNewMessages();
        });
    }, error => {
      this.loaded = true;

      this.showSessionErrorMsg = true;
      console.error(JSON.stringify(error));
    });
  }

  createMessage() {
    if (this.messageText.length == 0)
      return;

    var newMessage = new SessionMessage();
    newMessage.sessionId = this.session.id;
    newMessage.text = this.messageText;
    newMessage.createDate = new Date(Date.now());
    newMessage.mine = true;

    this.sessionMessages.push(newMessage);
    this.messagesAdded = true;
    var newMsgIndex = this.sessionMessages.length - 1;

    this.resetMessageInput();

    this.sessionService.createSessionMessage(newMessage).subscribe(response => {
      //success, replace the new message inserted above with the actual confirmed message returned
      this.sessionMessages[newMsgIndex] = response;
    }, error => {
      //fail, remove new message inserted above, and restore message input textbox
      this.sessionMessages.splice(newMsgIndex, 1);
      this.messageText = newMessage.text;

      console.error(JSON.stringify(error));
    })
  }

  getNewMessages() {
    var lastMessageDate = new Date(0).toDateString();
    //Get the most recent message from the recipient
    var lastRecipientMessageIndex = this.sessionMessages.map(x => x.mine).lastIndexOf(false);

    if (this.sessionMessages[lastRecipientMessageIndex])
      lastMessageDate = this.sessionMessages[lastRecipientMessageIndex].createDate.toString();

    this.sessionService.getSessionMessagesSince(this.session.id, lastMessageDate)
      .subscribe(response => {
        //Only add new messages from the recipient
        var onlyRecipMessages = response.filter(x => !x.mine);

        if (onlyRecipMessages.length > 0) {
          this.sessionMessages.push(...onlyRecipMessages.reverse());
          this.messagesAdded = true;
        }
      }, error => {
        console.error(JSON.stringify(error));
      });
  }

  private resetMessageInput() {
    this.messageText = '';
    this.messageInput.nativeElement.setAttribute('value', '');
    this.messageInput.nativeElement.setAttribute('style', '');
  }

  convertToLocalDate(utcDate: Date): Date {
    return moment.utc(utcDate).local().toDate();
  }

  autoGrowMessageInput() {
    var maxMessageInputHeight = 150;
    if (this.messageInput.nativeElement.scrollHeight <= maxMessageInputHeight) {
      this.messageInput.nativeElement.style.overflow = 'hidden';
      this.messageInput.nativeElement.style.height = '0px';
      this.messageInput.nativeElement.style.height = this.messageInput.nativeElement.scrollHeight + 'px';
    }
    else {
      //We've reach our max height, starting using scrollbar
      this.messageInput.nativeElement.style.overflow = 'auto';
    }
  }

  ngOnDestroy() {
    //We need to unsubscribe, otherwise the getting of new messages will continue even if we navigate away from this component
    if (this.newMsgSubscription)
      this.newMsgSubscription.unsubscribe();
  }

  ngAfterViewChecked() {
    if (this.messagesAdded) {
      this.scrollToBottom();
      this.messagesAdded = false;
    }
  }

  scrollToBottom() {
    this.chatDiv.nativeElement.scrollTop = this.chatDiv.nativeElement.scrollHeight;
  }

  loadMoreMessages() {
    this.loaded = false;
    this.messagesPage++;
    this.sessionService.getSessionMessages(this.session.id, this.initialGetCount, this.messagesPage).subscribe(response => {
      this.loaded = true;
      if (response.length > 0)
        this.sessionMessages.unshift(...response.reverse());
      else
        this.noMoreToLoad = true;
    }, error => {
      this.loaded = true;
      this.messagesPage--;
      console.error(JSON.stringify(error));
    });
  }
}
