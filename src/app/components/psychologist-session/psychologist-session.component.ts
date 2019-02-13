import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { PatientService } from 'src/app/services/patient.service';
import { Session } from 'src/app/models/Session';
import { HelpersService } from 'src/app/services/helpers.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs';
import { PsychologistSession } from 'src/app/models/PsychologistSession';

@Component({
  selector: 'app-psychologist-session',
  templateUrl: './psychologist-session.component.html',
  styleUrls: ['./psychologist-session.component.css']
})
export class PsychologistSessionComponent implements OnInit, OnDestroy {

  sessions: PsychologistSession[];
  currentSession: Session;
  selectedTabIndex: number = 0;
  sessionsGetInterval: number = 60 * 1000;
  sessionsSubscription: Subscription;
  loading: boolean = true;
  sessionHasNewMessages: boolean = false;
  showAccNotActive: boolean;
  noPatientsFound: boolean;
  showAccPaused: boolean;

  constructor(private sessionService: SessionService, private patientService: PatientService, private helpersService: HelpersService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sessionService.getPsychologistSessions().subscribe(response => {
      this.loading = false;
      this.sessions = response;

      if (this.sessions.length == 0)
        this.noPatientsFound = true;

      //Set timer to get sessions
      this.sessionsSubscription = TimerObservable.create(this.sessionsGetInterval, this.sessionsGetInterval)
        .subscribe(() => {
          this.getSessionsNewMessageCount();
        });
    }, error => {
      this.loading = false;
      if (error.error.PsychologistNotActive)
        this.showAccNotActive = true;

      if (error.error.PsychologistPaused)
        this.showAccPaused = true;

      console.error(JSON.stringify(error));
    })
  }

  getSessionsNewMessageCount(): void {
    this.sessionService.getPsychologistSessionsNewMessageCount().subscribe(response => {
      //Update newMessageCount (but not for our current session)
      var currentSessionId = this.currentSession ? this.currentSession.id : 0;
      response.forEach(item => {
        var sessionIndex = this.sessions.findIndex(x => x.id == item.id && x.id != currentSessionId);
        if (sessionIndex > -1)
          this.sessions[sessionIndex].newMessageCount = item.newMessageCount;
      });
      this.orderByNewMessageCount();
    }, error => {
      console.error(JSON.stringify(error));
    })
  }

  getPatientNameAbbrev(patientName: string) {
    //Get first 2 letters of recipient name
    var substringLength = patientName.length < 2 ? 1 : 2;
    return patientName.substring(0, substringLength).toUpperCase();
  }

  getPatientAbbrevStyle(patientName: string) {
    return this.sanitizer.bypassSecurityTrustStyle(this.helpersService.getDynamicColourAvatarStyle(patientName));
  }

  launchSession(session: PsychologistSession) {
    this.currentSession = new Session();
    this.currentSession.id = session.id;
    this.currentSession.recipientName = session.patientName;

    session.newMessageCount = 0;
    this.orderByNewMessageCount();

    this.selectedTabIndex = 1;
  }

  markCurrentSesssionAsHasNewMessages($event) {
    //Only if we're currently on the sessions tab
    if (this.selectedTabIndex == 0)
      this.sessionHasNewMessages = true;
  }

  changeToSessionTab() {
    this.sessionHasNewMessages = false;
    this.selectedTabIndex = 1;
  }

  orderByNewMessageCount() {
    //Order by newMessageCount
    this.sessions.sort((a, b) => { return b.newMessageCount - a.newMessageCount });
  }

  ngOnDestroy(): void {
    if (this.sessionsSubscription)
      this.sessionsSubscription.unsubscribe();
  }

}
