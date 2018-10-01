import { Component, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { PsychoService } from '../../services/psycho.service';
import { Page } from '../../models/Page';
import { Psycho } from '../../models/Pyscho';

@Component({
  templateUrl: 'psyregister.component.html',
})
export class PsyregisterComponent implements OnInit {
  personalForm: FormGroup;
  bankingForm: FormGroup;
  professionalForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  id: Page;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    // private psychoService: PsychoService,
    private alertService: AlertService
    ) {}

    ngOnInit() {
      this.personalForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        surname: ['', Validators.required],
        contactNum: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
      });

      this.bankingForm = this.formBuilder.group({
        accountName: ['', Validators.required],
        bankName: ['', Validators.required],
        accountNum: ['', Validators.required],
        branch: ['', Validators.required],
        branchCode: ['', Validators.required]
      });

      this.professionalForm = this.formBuilder.group({
        qualification: ['', Validators.required],
        yearsOfExperience: ['', Validators.required],
        licenseNum: ['', Validators.required]
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

  onPersonalSubmit() {
    this.submitted = true;

    if (this.personalForm.valid){
      console.log("Personal Form Submitted!");
      this.submitted = false;
      this.router.navigate(['/psyregister'], { queryParams: { page: '2' } });
    }
  }

  onBankingSubmit() {
    this.submitted = true;

    if (this.bankingForm.valid){
      console.log("Banking Form Submitted!");
      this.router.navigate(['/psyregister'], { queryParams: { page: '3'} });
    }
  }


  onProfessionalSubmit() {
    this.submitted = true;
    
    if (this.professionalForm.valid) {
      console.log("Form Submitted!");
      this.router.navigate(['/psyregister'], { queryParams: { page: '4'} });
    }
  }

  checkValidation() {
    if (!this.personalForm.valid){
      console.log("Personal Form Submitted!");
      this.router.navigate(['/psyregister'], { queryParams: { page: '1' } });
    } else if (!this.bankingForm.valid){
      console.log("Banking Form Submitted!");
      this.router.navigate(['/psyregister'], { queryParams: { page: '2'} });
    } else if (this.professionalForm.valid) {
      console.log("Form Submitted!");
      this.router.navigate(['/psyregister'], { queryParams: { page: '4'} });
    } else {
      console.log("all forms are valid");
    }
  }
}

