import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Session } from 'src/app/models/Session';
import { ToastService } from 'src/app/services/toast.service';
import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-patient-session',
  templateUrl: './patient-session.component.html',
  styleUrls: ['./patient-session.component.css']
})
export class PatientSessionComponent implements OnInit, OnDestroy {

  session: Session;
  showPackageNotActiveError: boolean = false;
  showNoPsychError: boolean;
  loading: boolean;
  notificationsSubscription: any;

  constructor(
    private sessionService: SessionService,
    private toastService: ToastService,
    private pushService: PushService) { }

  ngOnInit() {
    this.getSession();
    this.subscribeToNotifcations();
  }

  private getSession() {
    this.loading = true;
    this.sessionService.getPatientSession().subscribe(response => {
      this.session = response;
      this.loading = false;
    }, error => {
      this.loading = false;
      if (error.error && error.error.PackageNotActive) {
        this.showPackageNotActiveError = true;
      }
      else if (error.error && error.error.PsychologistNotFound) {
        this.showNoPsychError = true;
      }
      else {
        this.toastService.setError();
        console.error(JSON.stringify(error));
      }
    });
  }

  subscribeToNotifcations(): any {
    this.notificationsSubscription = this.pushService.getNotifications().subscribe(resp => {
      var notifTypes = [7];//Psychologist not available (i.e they've been disabled)
      if (notifTypes.includes(resp.notificationTypeId))
        this.getSession();
    }, error => {
      console.error(JSON.stringify(error));
    });
  }

  ngOnDestroy(): void {
    if (this.notificationsSubscription)
      this.notificationsSubscription.unsubscribe();
  }

}
