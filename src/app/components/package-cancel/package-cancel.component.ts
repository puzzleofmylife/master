import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { PatientPackage } from 'src/app/models/PatientPackage';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-cancel',
  templateUrl: './package-cancel.component.html',
  styleUrls: ['./package-cancel.component.css']
})
export class PackageCancelComponent implements OnInit {
  loading: boolean;
  patientPackage: PatientPackage;
  cancelReason: string;
  cancelReasonTooLong: boolean;

  constructor(
    private patientService: PatientService,
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

  cancelPackage() {
    this.loading = true;
    if (this.cancelReason && this.cancelReason.length > 1000) {
      this.cancelReasonTooLong = true;
      return;
    }
    this.patientService.cancelPatientPackage(this.cancelReason).subscribe(resp => {
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
