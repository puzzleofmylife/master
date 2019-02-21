import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Session } from 'src/app/models/Session';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-patient-session',
  templateUrl: './patient-session.component.html',
  styleUrls: ['./patient-session.component.css']
})
export class PatientSessionComponent implements OnInit {

  session: Session;
  showPackageNotActiveError: boolean = false;
  showNoPsychError: boolean;
  loading: boolean;

  constructor(
    private sessionService: SessionService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.loading = true;
    this.sessionService.getPatientSession().subscribe(response => {
      this.session = response;
      this.loading = false;
    }, error => {
      this.loading = false;
      if (error.error.PackageNotActive) {
        this.showPackageNotActiveError = true;
      } else if (error.error.PsychologistNotFound) {
        this.showNoPsychError = true;
      } else {
        this.toastService.setError();
        console.error(JSON.stringify(error));
      }
    });
  }

}
