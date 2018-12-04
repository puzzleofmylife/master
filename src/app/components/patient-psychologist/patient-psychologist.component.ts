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
  loaded: boolean;

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit() {
    this.patientService.getPsychologist().subscribe(response => {
      this.loaded = true;
      this.psychologist = response;
    }, error => {
      console.error(JSON.stringify(error));
    });
  }

  changePsychologist() {
    this.router.navigate(['/profile/change-psychologist']);
  }
}
