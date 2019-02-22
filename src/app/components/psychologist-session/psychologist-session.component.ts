import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { PatientService } from 'src/app/services/patient.service';
import { Session } from 'src/app/models/Session';
import { HelpersService } from 'src/app/services/helpers.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs';
import { PsychologistSession } from 'src/app/models/PsychologistSession';
import { PushService } from 'src/app/services/push.service';

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

  constructor(
    private sessionService: SessionService,
    private helpersService: HelpersService,
    private sanitizer: DomSanitizer,
    private pushService: PushService) { }

  ngOnInit() {
    this.sessionService.getPsychologistSessions().subscribe(response => {
      this.loading = false;
      this.sessions = response;

      if (this.sessions.length == 0)
        this.noPatientsFound = true;

      this.orderByMostRecentMessageDate();

      this.subscribeToNewMessages();
    }, error => {
      this.loading = false;
      if (error.error.PsychologistNotActive)
        this.showAccNotActive = true;

      if (error.error.PsychologistPaused)
        this.showAccPaused = true;

      console.error(JSON.stringify(error));
    })
  }

  subscribeToNewMessages(): any {
    this.sessionsSubscription = this.pushService.getSessionMessages().subscribe(resp => {
      var pushMessageSessionIndex = this.sessions.findIndex(x => x.id == resp.sessionId);
      this.sessions[pushMessageSessionIndex].newMessageCount++;
      this.sessions[pushMessageSessionIndex].mostRecentMessageDate = new Date(Date.now());
      this.orderByMostRecentMessageDate();
    }, error => {
      console.error(JSON.stringify(error));
    });
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

    this.changeToSessionTab();
  }

  markCurrentSesssionAsHasNewMessages($event) {
    //Only if we're currently on the sessions tab
    if (this.selectedTabIndex == 0)
      this.sessionHasNewMessages = true;
  }

  changeToSessionTab() {
    //Remove new message marker from current session tab
    this.sessionHasNewMessages = false;
    //Remove new message count from current session
    var currentSessionIndex = this.sessions.findIndex(x => x.id == this.currentSession.id);
    this.sessions[currentSessionIndex].newMessageCount = 0;

    this.selectedTabIndex = 1;
  }

  orderByMostRecentMessageDate() {
    this.sessions.sort((a, b) => {
      var aTimeMilliseconds = a.mostRecentMessageDate ? new Date(a.mostRecentMessageDate).getTime() : 0;
      var bTimeMilliseconds = b.mostRecentMessageDate ? new Date(b.mostRecentMessageDate).getTime() : 0;
      return bTimeMilliseconds - aTimeMilliseconds;
    });
  }

  ngOnDestroy(): void {
    if (this.sessionsSubscription)
      this.sessionsSubscription.unsubscribe();
  }

}
