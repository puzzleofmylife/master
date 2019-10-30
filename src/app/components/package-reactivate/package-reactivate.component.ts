import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-package-reactivate',
  templateUrl: './package-reactivate.component.html',
  styleUrls: ['./package-reactivate.component.css']
})
export class PackageReactivateComponent implements OnInit {
  loading: boolean;
  // patientPackage: import("/Users/danewilliams/Documents/Work/puzzleofmylifeapp/src/app/models/PatientPackage").PatientPackage;
  patientPackage: import("src/app/models/PatientPackage").PatientPackage;
  constructor(private patientService: PatientService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.patientService.getCurrentPatientPackage().subscribe(resp => {
      this.patientPackage = resp;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastService.setError();
      console.error(JSON.stringify(error));
    });
  }

  reactivatePackage() {
    this.loading = true;
    this.patientService.reactivatePatientPackage().subscribe(resp => {
      this.loading = false;
      this.toastService.setSuccess('Success');
      this.router.navigate(['/profile']);
    }, error => {
      this.loading = false;
      this.toastService.setError();
      console.error(JSON.stringify(error));
    });
  }

}
