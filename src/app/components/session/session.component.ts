import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewChecked, SimpleChanges, OnChanges, HostListener } from '@angular/core';
import { Session } from 'src/app/models/Session';
import { SessionService } from 'src/app/services/session.service';
import { SessionMessage } from 'src/app/models/SessionMessage';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Subscription } from 'rxjs';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnDestroy {

  @ViewChild('recipientAbbrevDiv') private recipientAbbrevDiv: ElementRef;
  @ViewChild('messageInput') private messageInput: ElementRef;
  newMsgSubscription: Subscription;
  sessionMessages: SessionMessage[] = [];
  showSessionEmptyMsg: boolean;
  initialGetCount: number = 50;
  newMessageGetInterval: number = 30 * 1000;//30 secs
  messageText: string = '';
  loading: boolean = false;
  messagesPage: number = 1;
  noMoreToLoad: boolean = false;
  recipientAbbrev: string;
  showNewMessagePrompt: boolean = false;

  private _session: Session = new Session();
  @Input() set session(value: Session) {
    this._session = value;
    //Using a setter will let us run initiateSession() every time the value changes
    this.initiateSession();
  }
  get session() {
    return this._session;
  }

  constructor(private sessionService: SessionService, private helpersService: HelpersService) { }

  initiateSession() {
    this.loading = true;//Show spinner
    this.sessionMessages = [];//Clear any messages
    this.setRecipientAbbrev();

    //Initial get of last X messages
    this.sessionService.getSessionMessages(this.session.id, this.initialGetCount, this.messagesPage).subscribe(response => {
      this.loading = false;

      this.sessionMessages = response;

      if (this.sessionMessages.length == 0)
        this.showSessionEmptyMsg = true;

      //Set timer to get new messages
      this.newMsgSubscription = TimerObservable.create(this.newMessageGetInterval, this.newMessageGetInterval)
        .subscribe(() => {
          this.getNewMessages();
        });
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error));
    });
  }

  createMessage() {
    this.messageText = this.messageText.trim();
    if (this.messageText.length == 0)
      return;

    var newMessage = new SessionMessage();
    newMessage.sessionId = this.session.id;
    newMessage.text = this.messageText;
    newMessage.createDate = new Date(Date.now());
    newMessage.mine = true;

    this.resetMessageInput();

    //Insert new message at the beginning of array
    this.sessionMessages.unshift(newMessage);
    
    this.sessionService.createSessionMessage(newMessage).subscribe(response => {
      //success, replace the new message inserted above with the actual confirmed message returned
      this.sessionMessages[this.sessionMessages.indexOf(newMessage)] = response;
    }, error => {
      //fail, remove new message inserted above, and restore message input textbox
      this.sessionMessages.splice(0, 1);
      this.messageText = newMessage.text;

      console.error(JSON.stringify(error));
    })
  }

  getNewMessages() {
    this.sessionService.getNewSessionMessages(this.session.id)
      .subscribe(response => {
        //Only add new messages from the recipient
        var onlyRecipMessages = response.filter(x => !x.mine);

        if (onlyRecipMessages.length > 0) {
          this.sessionMessages.unshift(...onlyRecipMessages);
        }
      }, error => {
        console.error(JSON.stringify(error));
      });
  }

  ngOnDestroy() {
    //We need to unsubscribe, otherwise the getting of new messages will continue even if we navigate away from this component
    if (this.newMsgSubscription)
      this.newMsgSubscription.unsubscribe();
  }

  loadPreviousMessages() {
    this.loading = true;
    this.messagesPage++;
    this.sessionService.getSessionMessages(this.session.id, this.initialGetCount, this.messagesPage).subscribe(response => {
      this.loading = false;
      if (response.length > 0)
        this.sessionMessages.push(...response);
      else
        this.noMoreToLoad = true;
    }, error => {
      this.loading = false;
      this.messagesPage--;
      console.error(JSON.stringify(error));
    });
  }

  setRecipientAbbrev() {
    //Get first 2 letters of recipient name
    var substringLength = this.session.recipientName.length < 2 ? 1 : 2;
    this.recipientAbbrev = this.session.recipientName.substring(0, substringLength).toUpperCase();
    //Create a background colour from the recipient name
    this.recipientAbbrevDiv.nativeElement.style.backgroundColor = '#' + this.helpersService.getColourHashCode(this.session.recipientName);
    this.recipientAbbrevDiv.nativeElement.style.borderRadius = '50%';

    //Check if the background color is light or dark, then set the text color to either black or white
    var rgb = this.recipientAbbrevDiv.nativeElement.style.backgroundColor.replace('rgb(', '').replace(')', '').split(',').map(Number);
    var o = Math.round(((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000);
    if (o > 125) {
      this.recipientAbbrevDiv.nativeElement.style.color = 'black';
    } else {
      this.recipientAbbrevDiv.nativeElement.style.color = 'white';
    }
  }

  autoGrowMessageInput() {
    var maxMessageInputHeight = 150;
    var defaultMessageInputHeight = 60;
    if (this.messageInput.nativeElement.scrollHeight <= maxMessageInputHeight && this.messageInput.nativeElement.scrollHeight > defaultMessageInputHeight) {
      this.messageInput.nativeElement.style.overflow = 'hidden';
      this.messageInput.nativeElement.style.height = '0px';
      this.messageInput.nativeElement.style.height = this.messageInput.nativeElement.scrollHeight + 'px';
    }
    else {
      //We've reach our max height, starting using scrollbar
      this.messageInput.nativeElement.style.overflow = 'auto';
    }
  }

  private resetMessageInput() {
    this.messageText = '';
    this.messageInput.nativeElement.setAttribute('value', '');
    this.messageInput.nativeElement.setAttribute('style', 'line-height:1.2');
  }
}
