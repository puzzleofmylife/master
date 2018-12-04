import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  success: boolean;
  forgotPasswordForm: FormGroup;
  unexpectedError: boolean;
  submitted: boolean = false;


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onForgotPassword() {
    this.submitted = true;

    if (this.forgotPasswordForm.valid) {
      this.userService.sendPasswordReset(this.forgotPasswordForm.controls.email.value).subscribe(result => {
        this.success = true;
      }, error => {
        if (error.error.SendPasswordResetFailed)
          this.success = false;
        else
          this.unexpectedError = true;

        console.error(JSON.stringify(error.error));
      });
    }
  }
}
