import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { SessionNote } from 'src/app/models/SessionNote';
import { SessionService } from 'src/app/services/session.service';
import { ToastService } from 'src/app/services/toast.service';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-session-notes',
  templateUrl: './session-notes.component.html',
  styleUrls: ['./session-notes.component.css']
})
export class SessionNotesComponent implements OnInit {

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

  @Input() patientName: string;
  @ViewChild('noteInput') private noteInput: ElementRef;
  page: number = 0;
  limit: number = 30;
  notes: SessionNote[] = [];
  loading: boolean;
  canLoadMore: boolean;
  noteText: string = '';
  maxNoteChars: number = 5000;
  noteCharsLeft: number = this.maxNoteChars;

  constructor(
    private sessionService: SessionService,
    private toastService: ToastService,
    private helpersService: HelpersService) { }

  ngOnInit() {
  }

  load() {
    this.page++;
    this.loading = true;

    this.sessionService.getNotes(this.sessionId, this.page, this.limit).subscribe(resp => {
      this.loading = false;
      this.notes.push(...resp);

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

  handleClose() {
    this.onClose.emit();
  }

  addNote() {
    if (!this.noteText)
      return;

    var note = new SessionNote();
    note.sessionId = this.sessionId;
    note.text = this.noteText;
    note.loading = true;

    this.notes.unshift(note);

    this.resetNoteInput();

    this.sessionService.createNote(note).subscribe(resp => {
      //replace note with incoming saved note
      this.notes[this.notes.indexOf(note)] = resp;
      this.noteText = '';
    }, error => {
      //Remove failed note
      this.notes.splice(this.notes.indexOf(note), 1);

      //Put the text back in the note textbox
      if (this.noteText == '') {
        this.noteText = note.text;
        this.handleMessageInputChange()
      }

      console.error(JSON.stringify(error));
      this.toastService.setError();
    });
  }

  private resetNoteInput() {
    this.noteText = '';
    this.noteCharsLeft = this.maxNoteChars;
  }

  reset() {
    this.page = 0;
    this.notes = [];
  }

  toggleExpand() {
    var toggleHeight = '200px';
    this.noteInput.nativeElement.style.height = this.noteInput.nativeElement.style.height == toggleHeight ? '' : toggleHeight;
  }

  handleMessageInputChange() {
    //Set chars left
    this.noteCharsLeft = this.maxNoteChars - this.noteText.length;
  }

}
