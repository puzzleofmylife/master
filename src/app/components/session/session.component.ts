import { Component, OnInit, Input } from '@angular/core';
import { Session } from 'src/app/models/Session';
import { SessionService } from 'src/app/services/session.service';
import { SessionMessage } from 'src/app/models/SessionMessage';
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  @Input() session: Session;
  sessionMessages: SessionMessage[] = [];
  showSessionEmptyMsg: boolean;
  showSessionErrorMsg: boolean;
  initialGetCount: number = 100;
  newMessageGetInterval: number = 30 * 1000;//60 secs
  messageText: string = '';
  loaded: boolean = false;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    //Temp
    this.session = new Session();
    this.session.id = 1;
    this.session.recipientName = 'Recip Name';
    
    //Initial get of last X messages
    this.sessionService.getSessionMessages(this.session.id, this.initialGetCount).subscribe(response => {
      this.loaded = true;

      this.sessionMessages = response;
      if (this.sessionMessages.length == 0)
        this.showSessionEmptyMsg = true;
    }, error => {
      this.loaded = true;

      this.showSessionErrorMsg = true;
      console.error(JSON.stringify(error));
    });

    //Recurring get of messages since last message date
    TimerObservable.create(this.newMessageGetInterval, this.newMessageGetInterval)
      .subscribe(() => {
        var lastMessageDate = new Date(0);
        var lastRecipientMessageIndex = this.sessionMessages.map(x => x.mine).lastIndexOf(false);
        if(this.sessionMessages[lastRecipientMessageIndex])
          lastMessageDate = new Date(this.sessionMessages[lastRecipientMessageIndex].createDate + ' UTC');

        this.sessionService.getSessionMessagesSince(this.session.id, lastMessageDate)
          .subscribe(response => {
            response.forEach(item => {
              this.sessionMessages.push(item);
            });
          }, error => {
            console.error(JSON.stringify(error));
          });
      });
  }

  createMessage() {
    if(this.messageText.length == 0)
      return;
    
    var newMessage = new SessionMessage();
    newMessage.sessionId = this.session.id;
    newMessage.text = this.messageText;
    newMessage.createDate = new Date(Date.now());
    newMessage.mine = true;

    this.sessionMessages.push(newMessage);
    var newMsgIndex = this.sessionMessages.length - 1;

    this.messageText = '';

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

}
