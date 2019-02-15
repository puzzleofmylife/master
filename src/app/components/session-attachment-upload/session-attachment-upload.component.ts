import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { SessionAttachmentStatus } from 'src/app/models/SessionAttachmentStatus';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-session-attachment-upload',
  templateUrl: './session-attachment-upload.component.html',
  styleUrls: ['./session-attachment-upload.component.css']
})
export class SessionAttachmentUploadComponent implements OnInit {

  /* @ViewChild('fileInput') fileInput: ElementRef; */
  @Output() onFileUpload = new EventEmitter<any>();
  @Input('sessionId') sessionId: number;
  SessionAttachmentStatus: typeof SessionAttachmentStatus = SessionAttachmentStatus;

  constructor(
    private sessionService: SessionService,
    private ng2ImgMax: Ng2ImgMaxService) { }

  ngOnInit() {
  }

  async uploadFile(event) {
    if (event.target.files && event.target.files[0]) {
      let fileToUpload = event.target.files[0];

      this.emitStatus(SessionAttachmentStatus.pending, null, fileToUpload.name);

      if (this.fileIsImageType(fileToUpload))
        this.processImageFile(fileToUpload);
      else
        this.processFile(fileToUpload);
    }
  }

  async processFile(fileToUpload: any): Promise<any> {
    var sessionAttachment = await this.attachmentCreator(fileToUpload);
    this.doUpload(sessionAttachment);
  }

  processImageFile(image: any): any {
    this.ng2ImgMax.resizeImage(image, 10000, 800).subscribe(
      async result => {
        var resizedImage = new File([result], result.name);
        var sessionAttachment = await this.attachmentCreator(resizedImage);
        this.doUpload(sessionAttachment);
      },
      error => {
        console.log(JSON.stringify(error));
        this.emitStatus(SessionAttachmentStatus.failed, null, null, 'An error occurred');
      }
    );
  }

  private doUpload(sessionAttachment: {}) {
    this.sessionService.uploadFile(sessionAttachment).subscribe(resp => {
      this.emitStatus(SessionAttachmentStatus.success, resp);
    }, error => {
      if (error.error.FileTooLarge)
        this.emitStatus(SessionAttachmentStatus.failed, null, null, 'Max file size is 2 MB');
      else if (error.error.InvalidFile)
        this.emitStatus(SessionAttachmentStatus.failed, null, null, 'File type not supported');
      else
        this.emitStatus(SessionAttachmentStatus.failed, null, null, 'An error occurred');

      console.error(JSON.stringify(error));
    });
  }

  private fileIsImageType(fileToUpload: any): any {
    return fileToUpload.type.indexOf('image/') === 0;
  }

  private attachmentCreator(file) {
    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.onloadend = (e) => {
        resolve({
          FileName: file.name,
          Base64File: fr.result.toString().split(',').pop(),
          SessionId: this.sessionId
        })
      };
      fr.readAsDataURL(file);
    });
  }

  private emitStatus(status: SessionAttachmentStatus, message: any = null, filename: string = null, errorMsg: string = null) {
    this.onFileUpload.emit({ status: status, message: message, filename: filename, errorMsg: errorMsg });
  }
}
