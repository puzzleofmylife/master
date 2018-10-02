import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { PsychoService } from '../../services/psycho.service';
import { Page } from '../../models/Page';
import { RegisterPsycho } from '../../models/RegisterPsycho';
import Psycho from '../../models/Pyscho';

@Component({
  templateUrl: 'psyregister.component.html',
})
export class PsyregisterComponent implements OnInit {
  personalForm: FormGroup;
  bankingForm: FormGroup;
  professionalForm: FormGroup;
  registerForm: FormGroup;
  attachmentForm: FormGroup;
  loading = false;
  submitted = false;
  id: Page;
  maxFileSizeBytes: number = 5242880;
  sumbitError: boolean = false;
  duplicateUsername: boolean;

  @ViewChild("photoFile") photoFile;
  @ViewChild("idDocFile") idDocFile;
  @ViewChild("cvFile") cvFile;
  @ViewChild("licenseFile") licenseFile;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private psychoService: PsychoService,
    //private alertService: AlertService
  ) { }

  ngOnInit() {
    this.personalForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      idNumber: ['', Validators.required],
      age: ['', Validators.required],
      contactNum: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      { validator: this.validatePassword });

    this.bankingForm = this.formBuilder.group({
      bankName: ['', Validators.required],
      accountType: ['', Validators.required],
      accountNum: ['', Validators.required],
      branchCode: ['', Validators.required]
    });

    this.professionalForm = this.formBuilder.group({
      qualification: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      licenseNum: ['', Validators.required],
      university: ['', Validators.required]
    });

    this.attachmentForm = this.formBuilder.group({
      photoFile: ['', Validators.required],
      idDocFile: ['', Validators.required],
      cvFile: ['', Validators.required],
      licenseFile: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.id = params['page'];
    });

    this.checkValidation();
  }

  // convenience getter for easy access to form fields
  get pf() { return this.professionalForm.controls; }
  get p() { return this.personalForm.controls; }
  get b() { return this.bankingForm.controls; }
  get f() { return this.registerForm.controls; }
  get attachForm() { return this.attachmentForm.controls; }

  onPersonalSubmit() {
    this.submitted = true;

    if (this.personalForm.valid) {
      //console.log("Personal Form Submitted!");
      this.submitted = false;
      this.router.navigate(['/psyregister'], { queryParams: { page: '2' } });
    }
  }

  onBankingSubmit() {
    this.submitted = true;

    if (this.bankingForm.valid) {
      //console.log("Banking Form Submitted!");
      this.submitted = false;
      this.router.navigate(['/psyregister'], { queryParams: { page: '3' } });
    }
  }


  onProfessionalSubmit() {
    this.submitted = true;

    if (this.professionalForm.valid) {
      //console.log("Form Submitted!");
      this.submitted = false;
      this.router.navigate(['/psyregister'], { queryParams: { page: '4' } });
    }
  }

  onAttachmentsSubmit() {
    this.submitted = true;

    if (this.attachmentForm.valid) {
      //console.log("Form Submitted!");
      this.submitted = false;
      this.finalSubmit();
    }
  }

  async finalSubmit() {
    var registerPsycho = new RegisterPsycho();
    registerPsycho.psychologistUser = new Psycho();
    registerPsycho.psychologistUser.email = this.p.email.value;
    registerPsycho.psychologistUser.password = this.p.password.value;
    registerPsycho.psychologistUser.firstName = this.p.firstName.value;
    registerPsycho.psychologistUser.lastName = this.p.surname.value;
    registerPsycho.psychologistUser.phoneNumber = this.p.contactNum.value;
    registerPsycho.psychologistUser.psychoIDNumber = this.p.idNumber.value;
    registerPsycho.psychologistUser.psychoAge = this.p.age.value;
    registerPsycho.psychologistUser.psychoUniversity = this.pf.university.value;
    registerPsycho.psychologistUser.psychoExperienceYears = this.pf.yearsOfExperience.value;
    registerPsycho.psychologistUser.psychoLicenseNumber = this.pf.licenseNum.value;
    registerPsycho.psychologistUser.psychoQualifications = [];
    registerPsycho.psychologistUser.psychoQualifications.push(this.pf.qualification.value);
    registerPsycho.psychologistUser.psychoBankAccAccountNumber = this.b.accountNum.value;
    registerPsycho.psychologistUser.psychoBankAccBankName = this.b.bankName.value;
    registerPsycho.psychologistUser.psychoBankAccBranchCode = this.b.branchCode.value;
    registerPsycho.psychologistUser.psychoBankAccAccountType = this.b.accountType.value;

    var attachments = await this.generateAttachments();
    registerPsycho.psychologistUser.attachments = attachments;

    this.psychoService.register(registerPsycho).subscribe(result => {
      //Success
      var foo = result;
    },
      error => {
        this.sumbitError = true;

        //Check for duplictate username error
        if(error.error.Error){
          error.error.Error.forEach(element => {
            if(element.indexOf('DuplicateUserName') >= 0)
              this.duplicateUsername = true;
              //Dont show generic error msg
              this.sumbitError = false;
          });
        }
        console.log(JSON.stringify(error.error));
      });
  }

  private async generateAttachments() {
    /* 
    '1','CV'
    '2','Photo'
    '3','Certificate or License'
    '4','ID' 
    */

    var attachments = [];
    let photoFileEl = this.photoFile.nativeElement;
    if (photoFileEl.files && photoFileEl.files[0]) {
      let fileToUpload = photoFileEl.files[0];
      var attachment = await this.attachmentReader(fileToUpload, 2);
      attachments.push(attachment);
    }
    let cvFileEl = this.cvFile.nativeElement;
    if (cvFileEl.files && cvFileEl.files[0]) {
      let fileToUpload = cvFileEl.files[0];
      var attachment = await this.attachmentReader(fileToUpload, 1);
      attachments.push(attachment);
    }
    let idDocFileEl = this.idDocFile.nativeElement;
    if (idDocFileEl.files && idDocFileEl.files[0]) {
      let fileToUpload = idDocFileEl.files[0];
      var attachment = await this.attachmentReader(fileToUpload, 4);
      attachments.push(attachment);
    }
    let licenseFileEl = this.licenseFile.nativeElement;
    if (licenseFileEl.files && licenseFileEl.files[0]) {
      let fileToUpload = licenseFileEl.files[0];
      var attachment = await this.attachmentReader(fileToUpload, 3);
      attachments.push(attachment);
    }

    return attachments;
  }

  private attachmentReader(file, attachmentType) {
    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.onloadend = (e) => {
        resolve({
          Type: attachmentType,
          FileName: file.name,
          Base64File: fr.result.toString().split(',').pop()
        })
      };
      fr.readAsDataURL(file);
    });
  }

  checkValidation() {
    /* if (!this.personalForm.valid) {
      //console.log("Personal Form Submitted!");
      this.router.navigate(['/psyregister'], { queryParams: { page: '1' } });
    } else if (!this.bankingForm.valid) {
      //console.log("Banking Form Submitted!");
      this.router.navigate(['/psyregister'], { queryParams: { page: '2' } });
    } else if (this.professionalForm.valid) {
      //console.log("Form Submitted!");
      this.router.navigate(['/psyregister'], { queryParams: { page: '3' } });
    } else {
      //console.log("all forms are valid");
    } */
  }

  /* Password validation */
  validatePassword(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    if (pass === confirmPass)
      return null;
    else
      group.controls.confirmPassword.setErrors({ dontMatch: true });
  }

  /* File size attachment validation */
  onCVFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > this.maxFileSizeBytes)
        this.attachForm.cvFile.setErrors({ tooLarge: true });
      else
        this.attachForm.cvFile.setErrors(null);
    }
  }

  onIdDocFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > this.maxFileSizeBytes)
        this.attachForm.idDocFile.setErrors({ tooLarge: true });
      else
        this.attachForm.idDocFile.setErrors(null);
    }
  }

  onPhotoFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > this.maxFileSizeBytes)
        this.attachForm.photoFile.setErrors({ tooLarge: true });
      else
        this.attachForm.photoFile.setErrors(null);
    }
  }

  onLicenseFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > this.maxFileSizeBytes)
        this.attachForm.licenseFile.setErrors({ tooLarge: true });
      else
        this.attachForm.licenseFile.setErrors(null);
    }
  }
}

