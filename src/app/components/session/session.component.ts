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
import { PushService } from 'src/app/services/push.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthState } from 'src/app/models/AuthState';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit, OnDestroy {

  readonly initialGetCount: number = 50;
  readonly newMessageGetInterval: number = 60 * 1000;//60 secs
  readonly maxMessageChars: number = 5000;

  @Output() newMessagesEvent = new EventEmitter<number>();
  @ViewChild('messageInput') private messageInput: ElementRef;
  @ViewChild('attachmentsCmp') private attachmentsCmp: SessionAttachmentsComponent;

  private _session: Session;
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
  sessionMessageAttachment: SessionMessage;
  pushServiceStatusSubscription: Subscription;
  backOnlineCount: number = 0;
  notesSessionId: number;
  showNotes: boolean;
  authState: AuthState = new AuthState();

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

  constructor(
    private sessionService: SessionService,
    private helpersService: HelpersService,
    private sanitizer: DomSanitizer,
    private toastService: ToastService,
    private pushService: PushService,
    private authService: AuthService) {
    this.initProperties();
    this.subscribeToPushServiceStatus();
  }

  ngOnInit(): void {
    this.authService.authState().subscribe(x => this.authState = x);
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
    this.handleNotesClose();
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
        this.subscribeToNewMessages();
      }, error => {
        this.loading = false;
        this.toastService.setError();
        console.error(JSON.stringify(error));
      });
    } else {
      //Do an intial get of new messages, then subscribe to new ones while this session is loaded
      this.getNewMessages();
      this.subscribeToNewMessages();
    }
  }

  public subscribeToNewMessages() {
    this.newMsgSubscription = this.pushService.getSessionMessages()
      .subscribe(resp => {
        //Only get new messages if the incoming message session ID equals the current session ID
        if (this.session.id == resp.sessionId)
          this.getNewMessages();
      });
  }

  public subscribeToPushServiceStatus() {
    this.pushServiceStatusSubscription = this.pushService.getStatus()
      .subscribe(isConnected => {
        if (isConnected) {
          this.backOnlineCount++;
          if (this.backOnlineCount > 1) {
            //The second connected status means we've reconnected to the push service, so get any messasges we may have missed
            this.toastService.setSuccess('Back online');
            this.getNewMessages();
          }
        }
        else
          this.toastService.setError('Session disconnected');
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
    }, error => {
      //fail, remove new message inserted above, and restore message input textbox
      this.sessionMessages.splice(this.sessionMessages.indexOf(newMessage), 1);

      //If we dont have text in the input box, 
      //Set it to the failed message text
      if (!this.messageText) {
        this.messageText = newMessage.text;
        this.handleMessageInputChange();
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
    //We need to unsubscribe, otherwise the getting of subscriptions will continue even if we navigate away from this component
    this.unsubscribeToNewMessages();

    if (this.pushServiceStatusSubscription)
      this.pushServiceStatusSubscription.unsubscribe();
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

  handleMessageInputChange() {
    //Set chars left
    this.messageCharsLeft = this.maxMessageChars - this.messageText.length;
  }

  private resetMessageInput() {
    this.messageText = '';
    this.messageCharsLeft = this.maxMessageChars;
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

  toggleExpand() {
    var toggleHeight = '200px';
    this.messageInput.nativeElement.style.height = this.messageInput.nativeElement.style.height == toggleHeight ? '' : toggleHeight;
  }

  openNotes() {
    if (this.notesSessionId != this.session.id)
      this.notesSessionId = this.session.id;

    this.showNotes = true;
  }

  handleNotesClose() {
    this.showNotes = false;
  }
}
