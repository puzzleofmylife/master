import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';
import { Page } from '../../models/Page';
import { User } from '../../models/User';

@Component({
    templateUrl: 'useregister.component.html',
  })


export class UserRegisterComponent implements OnInit{
    userPersonalForm: FormGroup;
    userHistoryForm: FormGroup;
    userPaymentForm: FormGroup;
    loading = false;
    submitted = false;
    page: number = 1;
    finalSubmitError: boolean = false;
    duplicateAlias: boolean;
    successEmailAddress: string;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
      ) { }    

    ngOnInit(){
        this.userPersonalForm = this.formBuilder.group({
            userAlias:['',Validators.required],
            userEmail:['',Validators.required],
            userPassword:['',Validators.required],
            userConfirmPassword:['',Validators.required]
        },
        {validator:this.validatePassword});

        this.userHistoryForm = this.formBuilder.group({
            userHistory1:[],
            userHistory2:[],
            userHistory3:[],
            userHistory4:[],
            userHistory5:[],
            userHistory6:[],
            userHistory7:[],
            userHistory8:[],
            userHistory9:[],
            userHistory10:[]
        });

        this.userPaymentForm = this.formBuilder.group({
            userPackage:['',Validators.required],
            userPaymentMethod:['',Validators.required]
        });

        
    }

    /* Submit Forms */

    onUserPersonalSubmit(){
        this.submitted = true;
        if (this.userPersonalForm .valid){
            this.submitted = false;
            this.page = 2;
        }
    }

    onUserHistorySubmit(){
        this.submitted = true;
        if (this.userHistoryForm .valid){
            this.submitted = false;
            this.page = 3;
        }
    }

    onUserPaymentSubmit(){
        this.submitted = true;
        if (this.userHistoryForm .valid){
            this.submitted = false;
            this.page = 4;
        }
    }

    async finalSubmit(){
        var newUser = new User();
        newUser.alias = this._userPersonalForm.userAlias.value;
        newUser.email = this._userPersonalForm.userEmail.value;
        newUser.password = this._userPersonalForm.userPassword.value
    }

    /* convenience getter for easy access to form fields */
    /* --------------------------------------------------------------------- */
    get _userPersonalForm() { return this.userPersonalForm.controls; }
    get _userHistoryForm() { return this.userHistoryForm.controls; }
    get _userPaymentForm() { return this.userPaymentForm.controls; }
    /* --------------------------------------------------------------------- */


    /* Password validation */
    /* --------------------------------------------------------------------- */
    validatePassword(group: FormGroup) {
        let pass = group.controls.userPassword.value;
        let confirmPass = group.controls.userConfirmPassword.value;

        if (pass === confirmPass)
            return null;
        else
            group.controls.userConfirmPassword.setErrors({ dontMatch: true });
    }
    /* --------------------------------------------------------------------- */

    /* Make sure all forms are valid, and navigate to them if not */
    /* --------------------------------------------------------------------- 
        checkValidation() {
        if (!this.userPersonalForm.valid) {
            //console.log("Personal Form Submitted!");
            this.router.navigate(['/psyregister'], { queryParams: { page: '1' } });
        } else if (!this.userHistoryForm.valid) {
            //console.log("Banking Form Submitted!");
            this.router.navigate(['/psyregister'], { queryParams: { page: '2' } });
        } else if (this.userPaymentForm.valid) {
            //console.log("Form Submitted!");
            this.router.navigate(['/psyregister'], { queryParams: { page: '3' } });
        } else {
            //console.log("all forms are valid");
        }
    }
    /* --------------------------------------------------------------------- */

}