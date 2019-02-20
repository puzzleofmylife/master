import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { SessionMessageAttachment } from 'src/app/models/SessionMessageAttachment';
import { SessionAttachmentStatus } from 'src/app/models/SessionAttachmentStatus';

@Component({
  selector: 'app-session-attachments',
  templateUrl: './session-attachments.component.html',
  styleUrls: ['./session-attachments.component.css']
})
export class SessionAttachmentsComponent implements OnInit {
  @Output() onFileUpload = new EventEmitter<any>();
  @Output() onClose = new EventEmitter();

  private _sessionId: number;
  @Input() set sessionId(value: number) {
    if (value) {
      this._sessionId = value;
      this.reset();
      this.load();
    }
  }
  get sessionId() {
    return this._sessionId;
  }

  page: number = 0;
  limit: number = 10;
  attachments: SessionMessageAttachment[] = [];
  loading: boolean;
  canLoadMore: boolean;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {

  }

  load() {
    this.page++;
    this.loading = true;

    this.sessionService.getAttachments(this.sessionId, this.page, this.limit).subscribe(resp => {
      this.loading = false;
      this.attachments.push(...resp);

      if (resp.length == this.limit) {
        this.canLoadMore = true;
      } else {
        this.canLoadMore = false;
      }
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error));
    });
  }

  handleFileUpload(event: any) {
    switch (event.status) {
      case SessionAttachmentStatus.success:
        var newAttachment = new SessionMessageAttachment();
        newAttachment.fileName = event.message.sessionMessageAttachment.fileName;
        newAttachment.url = event.message.sessionMessageAttachment.url;
        this.attachments.unshift(newAttachment);
        break;
      default:
        break;
    }
    this.onFileUpload.emit(event);
  }

  attachmentIsImage(sessionMessageAttachment: SessionMessageAttachment) {
    var imgExts = ['jpeg', 'jpg', 'png'];
    var incomingFileExt = sessionMessageAttachment.fileName.split(".").pop();
    return imgExts.filter(x => x === incomingFileExt).length > 0;
  }

  handleClose() {
    this.onClose.emit();
  }

  addAttachment(attachment: SessionMessageAttachment) {
    this.attachments.unshift(attachment);
  }

  reset() {
    this.page = 0;
    this.attachments = [];
  }
}
