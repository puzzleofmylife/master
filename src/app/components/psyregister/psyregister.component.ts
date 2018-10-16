import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PsychoService } from '../../services/psycho.service';
import { Page } from '../../models/Page';
import { RegisterPsycho } from '../../models/RegisterPsycho';

@Component({
  templateUrl: 'psyregister.component.html',
})
export class PsyregisterComponent implements OnInit {
  personalForm: FormGroup;
  bankingForm: FormGroup;
  professionalForm: FormGroup;
  attachmentForm: FormGroup;
  loading = false;
  submitted = false;
  page: number;
  maxFileSizeBytes: number = 5242880;
  finalSumbitError: boolean = false;
  duplicateUsername: boolean;
  successEmailAddress: string;

  @ViewChild("photoFile") photoFile;
  @ViewChild("idDocFile") idDocFile;
  @ViewChild("cvFile") cvFile;
  @ViewChild("licenseFile") licenseFile;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private psychoService: PsychoService,
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
      //console.log(params);
      this.page = params['page'];
    });

    this.checkValidation();
  }

  /* convenience getter for easy access to form fields */
  /* --------------------------------------------------------------------- */
  get _professionalForm() { return this.professionalForm.controls; }
  get _personalForm() { return this.personalForm.controls; }
  get _bankingForm() { return this.bankingForm.controls; }
  get _attachmentForm() { return this.attachmentForm.controls; }
  /* --------------------------------------------------------------------- */


  /* Form submit functions */
  /* --------------------------------------------------------------------- */
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
      //Clear any final submit errors that could have occured on a previously final submit
      this.finalSumbitError = false;
      this.duplicateUsername = false;
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
    registerPsycho.psychologistUser.email = this._personalForm.email.value;
    registerPsycho.psychologistUser.password = this._personalForm.password.value;
    registerPsycho.psychologistUser.firstName = this._personalForm.firstName.value;
    registerPsycho.psychologistUser.lastName = this._personalForm.surname.value;
    registerPsycho.psychologistUser.phoneNumber = this._personalForm.contactNum.value;
    registerPsycho.psychologistUser.psychologistIDNumber = this._personalForm.idNumber.value;
    registerPsycho.psychologistUser.psychologistAge = this._personalForm.age.value;
    registerPsycho.psychologistUser.psychologistUniversity = this._professionalForm.university.value;
    registerPsycho.psychologistUser.psychologistExperienceYears = this._professionalForm.yearsOfExperience.value;
    registerPsycho.psychologistUser.psychologistLicenseNumber = this._professionalForm.licenseNum.value;
    registerPsycho.psychologistUser.psychologistQualifications.push(this._professionalForm.qualification.value);
    registerPsycho.psychologistUser.psychologistBankAccountAccountNumber = this._bankingForm.accountNum.value;
    registerPsycho.psychologistUser.psychologistBankAccountBankName = this._bankingForm.bankName.value;
    registerPsycho.psychologistUser.psychologistBankAccountBranchCode = this._bankingForm.branchCode.value;
    registerPsycho.psychologistUser.psychologistBankAccountAccountType = this._bankingForm.accountType.value;

    var attachments = await this.generateAttachments();
    registerPsycho.psychologistUser.attachments = attachments;

    this.loading = true;
    this.psychoService.register(registerPsycho.psychologistUser).subscribe(result => {
      //Success....

      //Hide loading spinner
      this.loading = false;

      //Set email address for use on final success page
      this.successEmailAddress = this._personalForm.email.value;

      //Reset sign up forms
      this.personalForm.reset();
      this.professionalForm.reset();
      this.bankingForm.reset();
      this.attachmentForm.reset();

      //Nav to success
      this.router.navigate(['/psyregister'], { queryParams: { page: '5' } });
    },
      //Error
      error => {
        this.loading = false;
        this.finalSumbitError = true;

        //Check for duplictate username error
        if (error.error.DuplicateUserName) {
          this.duplicateUsername = true;
          //Dont show generic error msg
          this.finalSumbitError = false;
        }
        console.log(JSON.stringify(error.error));
      });
  }
  /* --------------------------------------------------------------------- */


  /* Make sure all forms are valid, and navigate to them if not */
  /* --------------------------------------------------------------------- */
  checkValidation() {
    if (!this.personalForm.valid) {
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
    }
  }
  /* --------------------------------------------------------------------- */


  /* Password validation */
  /* --------------------------------------------------------------------- */
  validatePassword(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    if (pass === confirmPass)
      return null;
    else
      group.controls.confirmPassword.setErrors({ dontMatch: true });
  }
  /* --------------------------------------------------------------------- */


  /* File size attachment validation */
  /* --------------------------------------------------------------------- */
  onCVFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let accepted : any = [""]
      if (event.target.files[0].size > this.maxFileSizeBytes)
        this._attachmentForm.cvFile.setErrors({ tooLarge: true });
      else
        this._attachmentForm.cvFile.setErrors(null);
    }
  }

  onIdDocFileChange(event) {
    if (event.target.files && event.target.files[0]) {

      if (event.target.files[0].size > this.maxFileSizeBytes)
        this._attachmentForm.idDocFile.setErrors({ tooLarge: true });
      else
        this._attachmentForm.idDocFile.setErrors(null);
    }
  }

  onPhotoFileChange(event) {
    this._attachmentForm.photoFile.setErrors(null);
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > this.maxFileSizeBytes)
        this._attachmentForm.photoFile.setErrors({ tooLarge: true });
      else
        this._attachmentForm.photoFile.setErrors(null);

      if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/jpg" || event.target.files[0].type == "image/png")
        this._attachmentForm.photoFile.setErrors(null);
      else
        this._attachmentForm.photoFile.setErrors({ isPDF: true });
    }
  }

  onLicenseFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > this.maxFileSizeBytes)
        this._attachmentForm.licenseFile.setErrors({ tooLarge: true });
      else
        this._attachmentForm.licenseFile.setErrors(null);
    }
  }
  /* --------------------------------------------------------------------- */


  /* Helpers */
  /* --------------------------------------------------------------------- */
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
  /* --------------------------------------------------------------------- */
}


