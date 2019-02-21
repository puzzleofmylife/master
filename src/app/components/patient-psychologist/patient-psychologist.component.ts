import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Psychologist } from 'src/app/models/Psychologist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-psychologist',
  templateUrl: './patient-psychologist.component.html',
  styleUrls: ['./patient-psychologist.component.css']
})
export class PatientPsychologistComponent implements OnInit {

  psychologist: Psychologist;
  loading: boolean;
  showNoPsychMsg: boolean;
  showPackageNotActive: boolean;

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.patientService.getCurrentPatientPackage().subscribe(response => {
      this.loading = false;
      if (response.statusId == 1)//Active package
      {
        this.patientService.getPsychologist().subscribe(response => {
          this.loading = false;
          this.psychologist = response;

          if (!this.psychologist)
            this.showNoPsychMsg = true;
        }, error => {
          this.loading = false;
          console.error(JSON.stringify(error));
        });
      } else {
        this.showPackageNotActive = true;
      }
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error));
    });
  }

  changePsychologist() {
    this.router.navigate(['/profile/change-psychologist']);
  }
}
