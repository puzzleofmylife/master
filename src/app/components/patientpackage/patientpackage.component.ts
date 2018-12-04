import { Component, OnInit } from '@angular/core';
import { PackageService } from 'src/app/services/package.service';
import { Package } from 'src/app/models/Package';
import { FormGroup } from '@angular/forms';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patientpackage',
  templateUrl: './patientpackage.component.html',
  styleUrls: ['./patientpackage.component.css']
})
export class PatientpackageComponent implements OnInit {
  currentPackage: Package;

  constructor(
    private patientService: PatientService,

  ) { }

  ngOnInit() {
    this.patientService.getCurrentPatientPackage().subscribe(result => {
      this.currentPackage = result;
    },
      error => {
        console.error(JSON.stringify(error.error));
      });
  }
}
