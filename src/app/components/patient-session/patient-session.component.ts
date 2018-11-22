import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Session } from 'src/app/models/Session';

@Component({
  selector: 'app-patient-session',
  templateUrl: './patient-session.component.html',
  styleUrls: ['./patient-session.component.css']
})
export class PatientSessionComponent implements OnInit {

  session: Session;
  showPackageNotActiveError: boolean = false;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.getPatientSession().subscribe(response => {
      this.session = response;
    }, error => {
      if (error.error.PackageNotActive) {
        this.showPackageNotActiveError = true;
      } else {
        console.error(JSON.stringify(error));
      }
    });
  }
  
}
