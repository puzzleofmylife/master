import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/models/Package';
import { PackageService } from 'src/app/services/package.service';
import { PatientService } from '../../services/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientPackage } from 'src/app/models/PatientPackage';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepackage',
  templateUrl: './changepackage.component.html',
  styleUrls: ['./changepackage.component.css']
})
export class ChangePackageComponent implements OnInit {

  availablePackagesForm: FormGroup;
  availablePackages: Package[];
  submitted = false;
  loaded: boolean;
  success: boolean = false;
  gotResult: boolean = false;
  resultText: string;
  showVoucherConfirm: boolean;
  cmpState: string;
  patientPackage: PatientPackage;

  constructor(
    private packageService: PackageService,
    private patientService: PatientService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {

    this.availablePackagesForm = this.formBuilder.group({
      packageChoice: ['', Validators.required]
    });

    this.submitted = true;
    this.patientService.getCurrentPatientPackage().subscribe(curPackage => {
      this.patientPackage = curPackage;
      if (curPackage.packageVoucher)
        this.cmpState = 'voucher_confirm';
      else
        this.cmpState = 'choose_package';

      this.packageService.getActivePackages().subscribe(result => {
        this.availablePackages = result.filter(x => x.id != curPackage.packageId);
        this.loaded = true;

      },
        error => {
          this.loaded = true;
          this.toastService.setError();
          console.error('Could not load available packages: ' + JSON.stringify(error.error));
        });
    }, error => {
      this.loaded = true;
      this.toastService.setError();
      console.error('Could not load patient current package: ' + JSON.stringify(error.error));
    });

  }

  onChoosePackageSubmit() {
    //Check if pending payment or cancelled
    if (this.patientPackage.statusId == 2 || this.patientPackage.statusId == 3) {
      this.cmpState = 'bill_confirm';
      return;
    }

    this.changePackage();
  }

  public changePackage() {
    this.loaded = false;
    var newPackageId = this.availablePackagesForm.controls.packageChoice.value;
    this.patientService.changePatientPackage(newPackageId).subscribe(result => {
      this.loaded = true;
      this.toastService.setSuccess("Success");
      this.router.navigate(['/profile']);
    }, error => {
      this.loaded = true;
      this.toastService.setError();
      console.error('Could not change package: ' + JSON.stringify(error.error));
    });
  }
}

