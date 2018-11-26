import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { PatientService } from 'src/app/services/patient.service';
import { Session } from 'src/app/models/Session';
import { HelpersService } from 'src/app/services/helpers.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-psychologist-session',
  templateUrl: './psychologist-session.component.html',
  styleUrls: ['./psychologist-session.component.css']
})
export class PsychologistSessionComponent implements OnInit {

  sessions: Session[];
  currentSession: Session;

  constructor(private sessionService: SessionService, private patientService: PatientService, private helpersService: HelpersService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sessionService.getPsychologistSessions().subscribe(response => {
      this.sessions = response;
    }, error => {
      console.error(JSON.stringify(error));
    })
  }

  getPatientQuestionaireAnswers(patientId: number){
    this.patientService.getQuestionAnswers(patientId).subscribe(response => {

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
    var backgroundColor = this.helpersService.getColourHashCode(patientName);
    var borderRadius = '50%';

    var color = 'black';
    //Check if the background color is light or dark, then set the text color to either black or white
    var rgb = this.hexToRgb(backgroundColor);
    var o = Math.round(((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000);
    if (o < 125) {
      color = 'white';
    }

    return this.sanitizer.bypassSecurityTrustStyle(`background-color:#${backgroundColor};border-radius:${borderRadius};color:${color};width:50px;height:50px;text-align:center;`);
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        [parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)]
     : null;
}

}
