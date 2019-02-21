import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewChecked, SimpleChanges, OnChanges, HostListener, Output, EventEmitter } from '@angular/core';
import { Session } from 'src/app/models/Session';
import { SessionService } from 'src/app/services/session.service';
import { SessionMessage } from 'src/app/models/SessionMessage';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Subscription } from 'rxjs';
import { HelpersService } from 'src/app/services/helpers.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { SessionMessageAttachment } from 'src/app/models/SessionMessageAttachment';
import { SessionAttachmentStatus } from 'src/app/models/SessionAttachmentStatus';
import { ToastService } from 'src/app/services/toast.service';
import { SessionAttachmentsComponent } from '../session-attachments/session-attachments.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnDestroy {

  readonly initialGetCount: number = 50;
  readonly newMessageGetInterval: number = 60 * 1000;//60 secs
  readonly maxMessageChars: number = 5000;

  @Output() newMessagesEvent = new EventEmitter<number>();
  @ViewChild('messageInput') private messageInput: ElementRef;
  @ViewChild('attachmentsCmp') private attachmentsCmp: SessionAttachmentsComponent;
  newMsgSubscription: Subscription;
  recipientAbbrev: string;
  dynamicColourAvatarStyle: SafeStyle;
  messageText: string;
  loading: boolean;
  messagesPage: number;
  noMoreToLoad: boolean;
  sessionMessages: SessionMessage[];
  sessionMessageCache: any[] = [];
  initialGetMaxedOut: boolean;
  showAttachments: boolean = false;
  attachmentsSessionId: number;
  messageCharsLeft: number = this.maxMessageChars;

  private _session: Session;
  sessionMessageAttachment: SessionMessage;
  @Input() set session(value: Session) {
    ////Using a setter will let us run initiateSession() every time the value changes

    //Cache current session messages before setting/initiating the new session
    if (this._session) {
      this.unloadSession();
    }

    //Set new session value and initiate
    this._session = value;
    if (this._session) {
      this.initiateSession();
    }
  }
  get session() {
    return this._session;
  }

  constructor(private sessionService: SessionService, private helpersService: HelpersService, private sanitizer: DomSanitizer, private toastService: ToastService) {
    this.initProperties();
  }

  initProperties(): any {
    //Set defaults
    this.sessionMessages = [];
    this.messageText = '';
    this.loading = false;
    this.messagesPage = 1;
    this.noMoreToLoad = false;
    this.initialGetMaxedOut = true;
  }

  unloadSession(): any {
    //We need to unsubscribe from any previous session's subscription, 
    //otherwise the getting of new messages will continue even after changing sessions
    this.unsubscribeToNewMessages();
    this.cacheSession();
    this.handleAttachmentsClose();
  }

  cacheSession(): void {
    var sessionCacheEntry = {
      id: this.session.id,
      sessionMessages: this.sessionMessages,
      initialGetMaxedOut: this.initialGetMaxedOut,
      messagesPage: this.messagesPage,
      noMoreToLoad: this.noMoreToLoad,
      recipientAbbrev: this.recipientAbbrev,
      dynamicColourAvatarStyle: this.dynamicColourAvatarStyle,
      messageText: this.messageText,
    }

    var existingEntryIndex = this.sessionMessageCache.findIndex(x => x.id == this.session.id);
    if (existingEntryIndex > - 1)
      //Replace
      this.sessionMessageCache.splice(existingEntryIndex, 1, sessionCacheEntry);
    else
      //Push new
      this.sessionMessageCache.push(sessionCacheEntry);
  }

  initiateSession() {
    //Reset properties
    this.initProperties();

    if (!this.loadFromCache()) {
      this.loading = true;//Show spinner
      this.dynamicColourAvatarStyle = this.getDynamicColourAvatarStyle(this.session.recipientName);
      this.recipientAbbrev = this.getRecipientAbbrev(this.session.recipientName);

      //Initial get of last X messages
      this.sessionService.getSessionMessages(this.session.id, this.initialGetCount, this.messagesPage).subscribe(response => {
        this.loading = false;
        this.sessionMessages = response;

        if (this.sessionMessages.length == 0) {
          this.initialGetMaxedOut = false;
        } else if (this.sessionMessages.length < this.initialGetCount) {
          this.initialGetMaxedOut = false;
        }

        //Set timer to get new messages
        this.subscribeToNewMessages(this.newMessageGetInterval, this.newMessageGetInterval);
      }, error => {
        this.loading = false;
        this.toastService.setError();
        console.error(JSON.stringify(error));
      });
    } else {
      //Set timer to get new messages right away
      this.subscribeToNewMessages(0, this.newMessageGetInterval);
    }
  }

  public subscribeToNewMessages(initalDelay: number = this.newMessageGetInterval, period: number = this.newMessageGetInterval) {
    this.newMsgSubscription = TimerObservable.create(initalDelay, period)
      .subscribe(() => {
        this.getNewMessages();
      });
  }

  public unsubscribeToNewMessages() {
    if (this.newMsgSubscription)
      this.newMsgSubscription.unsubscribe();
  }

  loadFromCache(): boolean {
    var existingEntry = this.sessionMessageCache.filter(x => x.id == this.session.id)[0];
    if (existingEntry) {
      this.sessionMessages = existingEntry.sessionMessages;
      this.initialGetMaxedOut = existingEntry.initialGetMaxedOut;
      this.messagesPage = existingEntry.messagesPage;
      this.noMoreToLoad = existingEntry.noMoreToLoad;
      this.recipientAbbrev = existingEntry.recipientAbbrev;
      this.dynamicColourAvatarStyle = existingEntry.dynamicColourAvatarStyle;
      this.messageText = existingEntry.messageText;

      return true;
    }
    else
      return false;
  }

  getSessionMessageCache(): SessionMessage[] {
    var existingEntry = this.sessionMessageCache.filter(x => x.id == this.session.id)[0];
    if (existingEntry)
      return existingEntry.sessionMessages;
    else
      return null;
  }

  createMessage() {
    this.messageText = this.messageText.trim();
    if (this.messageText.length == 0)
      return;

    var newMessage = this.insertMessage(1, this.messageText);//Text type message
    this.resetMessageInput();

    this.sessionService.createSessionMessage(newMessage).subscribe(response => {
      //success, replace the new message inserted above with the actual confirmed message returned
      this.sessionMessages[this.sessionMessages.indexOf(newMessage)] = response;
      this.messageCharsLeft = this.maxMessageChars;
    }, error => {
      //fail, remove new message inserted above, and restore message input textbox
      this.sessionMessages.splice(this.sessionMessages.indexOf(newMessage), 1);

      //If we dont have text in the input box, 
      //Set it to the failed message text
      //And autogrow the input box
      if (!this.messageText) {
        this.messageText = newMessage.text;
        this.autoGrowMessageInput();
      }

      if (error.error && error.error.Text)
        this.toastService.setError(error.error.Text[0]);
      else if (error.name == 'TimeoutError')
        this.toastService.setError(error.message);
      else
        this.toastService.setError();

      console.error(JSON.stringify(error));
    })
  }

  private insertMessage(messageType: number, messageText: string = null, filename: string = null) {
    var newMessage = new SessionMessage();
    newMessage.sessionId = this.session.id;
    newMessage.text = messageText;
    newMessage.createDate = new Date(Date.now());
    newMessage.mine = true;
    newMessage.sessionMessageTypeId = messageType;
    newMessage.sessionMessageAttachment = new SessionMessageAttachment();
    newMessage.sessionMessageAttachment.fileName = filename;
    newMessage.loading = true;
    //Insert new message at the beginning of array
    this.sessionMessages.unshift(newMessage);

    return newMessage;
  }

  getNewMessages() {
    this.sessionService.getNewSessionMessages(this.session.id)
      .subscribe(response => {
        //Only add new messages from the recipient
        var onlyRecipMessages = response.filter(x => !x.mine);

        if (onlyRecipMessages.length > 0) {
          this.sessionMessages.unshift(...onlyRecipMessages);
          //Notify parent of the number of new messages
          this.newMessagesEvent.emit(onlyRecipMessages.length);
          //If attachment, add it to the attachmentsCmp
          onlyRecipMessages.forEach(message => {
            if (message.sessionMessageTypeId === 2) {
              var newAttachment = new SessionMessageAttachment();
              newAttachment.fileName = message.sessionMessageAttachment.fileName;
              newAttachment.url = message.sessionMessageAttachment.url;

              this.attachmentsCmp.addAttachment(newAttachment);
            }
          });
        }
      }, error => {
        console.error(JSON.stringify(error));
      });
  }

  ngOnDestroy() {
    //We need to unsubscribe, otherwise the getting of new messages will continue even if we navigate away from this component
    this.unsubscribeToNewMessages();
  }

  loadPreviousMessages() {
    this.loading = true;
    this.messagesPage++;
    this.sessionService.getSessionMessages(this.session.id, this.initialGetCount, this.messagesPage).subscribe(response => {
      this.loading = false;
      if (response.length < this.initialGetCount)
        this.noMoreToLoad = true;

      this.sessionMessages.push(...response);
    }, error => {
      this.loading = false;
      this.messagesPage--;
      console.error(JSON.stringify(error));
    });
  }

  getDynamicColourAvatarStyle(patientName: string) {
    return this.sanitizer.bypassSecurityTrustStyle(this.helpersService.getDynamicColourAvatarStyle(patientName));
  }

  autoGrowMessageInput() {
    var maxMessageInputHeight = 150;
    var minMessageInputHeight = 60;
    var heightOfText = this.messageInput.nativeElement.scrollHeight;

    if (heightOfText > maxMessageInputHeight) {
      this.messageInput.nativeElement.style.height = '0px';
      this.messageInput.nativeElement.style.height = maxMessageInputHeight + 'px';
      //We've reach our max height, starting using scrollbar
      this.messageInput.nativeElement.style.overflow = 'auto';
    }
    else if (heightOfText < minMessageInputHeight) {
      this.messageInput.nativeElement.style.overflow = 'hidden';
      //Reset the height to 0px before setting it
      this.messageInput.nativeElement.style.height = '0px';
      this.messageInput.nativeElement.style.height = minMessageInputHeight + 'px';
    } else {
      this.messageInput.nativeElement.style.overflow = 'hidden';
      //Reset the height to 0px before setting it
      this.messageInput.nativeElement.style.height = '0px';
      this.messageInput.nativeElement.style.height = this.messageInput.nativeElement.scrollHeight + 'px';
    }

    //Set chars left
    this.messageCharsLeft = this.maxMessageChars - this.messageText.length;
  }

  private resetMessageInput() {
    this.messageText = '';
    this.messageInput.nativeElement.setAttribute('value', '');
    this.messageInput.nativeElement.setAttribute('style', 'line-height:1.2; height:60px');
  }

  getRecipientAbbrev(recipName: string) {
    //Get first 2 letters of recipient name
    var substringLength = recipName.length < 2 ? 1 : 2;
    return recipName.substring(0, substringLength).toUpperCase();
  }

  attachmentIsImage(sessionMessageAttachment: SessionMessageAttachment) {
    var imgExts = ['jpeg', 'jpg', 'png'];
    var incomingFileExt = sessionMessageAttachment.fileName.split(".").pop();
    return imgExts.filter(x => x === incomingFileExt).length > 0;
  }

  handleFileUpload(event: any) {
    switch (event.status) {
      case SessionAttachmentStatus.pending:
        this.showAttachments = false;
        this.sessionMessageAttachment = this.insertMessage(2, null, event.filename);
        break;
      case SessionAttachmentStatus.success:
        //success, replace the new message inserted above with the actual confirmed message returned
        this.sessionMessages[this.sessionMessages.indexOf(this.sessionMessageAttachment)] = event.message;
        break;
      case SessionAttachmentStatus.failed:
        this.sessionMessages.splice(this.sessionMessages.indexOf(this.sessionMessageAttachment), 1);
        this.toastService.setError(event.errorMsg);
        break;
      default:
        break;
    }
  }

  handleAttachmentsClose() {
    this.showAttachments = false;
  }

  openAttachments() {
    if (this.attachmentsSessionId != this.session.id)
      this.attachmentsSessionId = this.session.id;

    this.showAttachments = true;
  }
}
