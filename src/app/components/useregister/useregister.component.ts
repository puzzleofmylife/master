import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    //All elements that will be displayed on the form will be prefixed with form*
    formQuestions :any[];
    formAnswersO :any [][];
    formAnswersI :any [][];
    
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private UserService: UserService
      ) { }    

      
    ngOnInit(){

        this.userPersonalForm = this.formBuilder.group({
            userAlias:['',Validators.required],
            userEmail:['',[Validators.required, Validators.email]],
            userPassword:['',Validators.required],
            userConfirmPassword:['',Validators.required]
        },
        {validator:this.validatePassword});
        this.userHistoryForm = this.formBuilder.group({ 
            Question1:['',Validators.required],
            Question2A1:[''],
            Question2A2:[''],
            Question2A3:[''],
            Question2A4:[''],
            Question2A5:[''],
            Question2A6:[''],
            Question3:['',Validators.required],
            Question4:['',Validators.required],
            Question5:['',Validators.required],
        });

        this.checkValidation();

        //Get the questions

        //Construct forms
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
        if (this.userHistoryForm.valid){
            this.submitted = false;
            this.page = 3;
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
    /*

    */

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
    /* --------------------------------------------------------------------- */
    checkValidation() {
        if (!this.userPersonalForm.valid) {
            //console.log("Personal Form Submitted!");
            this.router.navigate(['/useregister'], );
        } else if (!this.userHistoryForm.valid) {
            //console.log("Banking Form Submitted!");
            this.router.navigate(['/useregister'], );
        } else if (this.userPaymentForm.valid) {
            //console.log("Form Submitted!");
            this.router.navigate(['/useregister'], );
        } else {
            //console.log("all forms are valid");
        }
    }
    /* --------------------------------------------------------------------- */

}