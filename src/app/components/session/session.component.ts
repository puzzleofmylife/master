import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
export class SessionComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input() session: Session;
  @ViewChild('chatDiv') private chatDiv: ElementRef;
  @ViewChild('messageInput') private messageInput: ElementRef;
  newMsgSubscription: Subscription;
  sessionMessages: SessionMessage[] = [];
  showSessionEmptyMsg: boolean;
  showSessionErrorMsg: boolean;
  initialGetCount: number = 100;
  newMessageGetInterval: number = 30 * 1000;//30 secs
  messageText: string = '';
  loaded: boolean = false;
  messagesAdded: boolean = false;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    //Temp
    this.session = new Session();
    this.session.id = 1;
    this.session.recipientName = 'Dane Williams';
    this.session.recipientPhotoUrl = 'https://eeip.blob.core.windows.net/puzzle-public-dev/00fa16d9-b4c4-43fd-b170-faeca2afb011.jpg';

    //Initial get of last X messages
    this.sessionService.getSessionMessages(this.session.id, this.initialGetCount).subscribe(response => {
      this.loaded = true;

      this.sessionMessages = response;
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
        response.forEach(item => {
          //Only add new messages from the recipient
          if (!item.mine) {
            this.sessionMessages.push(item);
            this.messagesAdded = true;
          }
        });
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
    if (this.messageInput.nativeElement.scrollHeight <= 150) {
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

  scrollToBottom(): void {
    this.chatDiv.nativeElement.scrollTop = this.chatDiv.nativeElement.scrollHeight;
  }
}
