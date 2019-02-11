import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/models/Package';
import { PackageService } from 'src/app/services/package.service';
import { PatientService } from '../../services/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientPackage } from 'src/app/models/PatientPackage';

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

  constructor(
    private packageService: PackageService,
    private patientService: PatientService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.availablePackagesForm = this.formBuilder.group({
      packageChoice: ['', Validators.required]
    });

    this.submitted = true;
    this.patientService.getCurrentPatientPackage().subscribe(curPackage => {
      if(curPackage.packageVoucher)
        this.showVoucherConfirm = true;
        
      this.packageService.getActivePackages().subscribe(result => {
        this.availablePackages = result.filter(x => x.id != curPackage.packageId);
        this.loaded = true;
      },
        error => {
          this.loaded = true;
          console.error('Could not load available packages: ' + JSON.stringify(error.error));
        });
    }, error => {
      this.loaded = true;
      console.error('Could not load patient current package: ' + JSON.stringify(error.error));
    });

  }

  onChoosePackageSubmit() {
    var newPackageId = this.availablePackagesForm.controls.packageChoice.value;
    this.patientService.changePatientPackage(newPackageId).subscribe(result => {
      //Show success message
      this.success = true;
      this.gotResult = true;
      this.resultText = "Your package has been changed."
    }, error => {
      //Show error message
      this.success = false;
      this.gotResult = true;
      this.resultText = "Error, could not change your package.";
      console.error('Could not change package: ' + JSON.stringify(error.error));
    });
  }
}

