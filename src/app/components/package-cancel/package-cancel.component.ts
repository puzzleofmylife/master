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
  patientPsych: import("/Users/danewilliams/Documents/Work/puzzleofmylifeapp/src/app/models/Psychologist").Psychologist;
  cmpState: string;
  rating: any;

  constructor(
    private patientService: PatientService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;

    this.patientService.getPsychologist().subscribe(resp => {
      this.patientPsych = resp;
      if (this.patientPsych) {
        this.cmpState = 'show_rating';
        this.getCurPackage();
      }
      else {
        this.cmpState = 'show_confirm';
        this.getCurPackage();
      }
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error));
    });
  }

  private getCurPackage() {
    this.patientService.getCurrentPatientPackage().subscribe(resp => {
      this.patientPackage = resp;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastService.setError();
      console.error(JSON.stringify(error));
    });
  }

  handleCancelClick() {
    this.loading = true;
    if (this.cancelReason && this.cancelReason.length > 1000) {
      this.cancelReasonTooLong = true;
      return;
    }

    if (this.rating) {
      this.patientService.ratePsychologist(this.rating).subscribe(result => {
        this.cancelPackage();
      }, error => {
        console.error(JSON.stringify(error));
        this.cancelPackage();
      });
    }
    else
      this.cancelPackage();
  }

  private cancelPackage() {
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

  handleRatingClick(event: number) {
    this.rating = event;
  }
}
