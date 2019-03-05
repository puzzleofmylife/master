import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { PatientPackage } from '../../models/PatientPackage';
import { PaymentService } from '../../services/payment.service';
import { HelpersService } from '../../services/helpers.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-patientpackage',
  templateUrl: './patientpackage.component.html',
  styleUrls: ['./patientpackage.component.css']
})
export class PatientPackageComponent implements OnInit {
  currentPackage: PatientPackage = new PatientPackage();

  outstandingBalance: number;
  loading: boolean;
  cancelReason: string;
  cancelReasonRequired: boolean;
  showCancelPromptFlag: boolean;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private paymentService: PaymentService,
    private helpersService: HelpersService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getPatientPackage();
  }

  private getPatientPackage() {
    this.loading = true;
    this.patientService.getCurrentPatientPackage().subscribe(result => {
      this.loading = false;
      this.currentPackage = result;
      if (this.currentPackage.statusId == 2) {
        this.paymentService.getOutstandingBalance().subscribe(balanceResp => {
          this.outstandingBalance = balanceResp.outstandingBalance;
        }, error => {
          console.error(JSON.stringify(error.error));
        });
      }
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error.error));
    });
  }

  undoCancelPackage() {
    this.loading = true;
    this.patientService.undoCancelPatientPackage().subscribe(result => {
      this.toastService.setSuccess('Success');
      //Success...reload
      this.getPatientPackage();
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastService.setError();
      console.error(JSON.stringify(error.error));
    });
  }

  reactivatePackage() {
    this.loading = true;
    this.patientService.reactivatePatientPackage().subscribe(result => {
      //Success...reload
      this.getPatientPackage();
      this.loading = false;
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error.error));
    });
  }

  getPackageStatusClass(statusId: number) {
    return this.helpersService.getPackageStatusClass(statusId);
  }

  hideCancelPrompt() {
    this.showCancelPromptFlag = false;
  }

  showCancelPrompt() {
    this.showCancelPromptFlag = true;
  }

  undoChangePackage() {
    this.loading = true;
    this.patientService.undoChangePatientPackage().subscribe(result => {
      this.toastService.setSuccess('Success');
      //Success...reload
      this.getPatientPackage();
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastService.setError();
      console.error(JSON.stringify(error.error));
    });
  }
}
