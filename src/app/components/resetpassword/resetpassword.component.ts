import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  success: boolean;
  gotResetResult: boolean = false;
  userId: string;
  resetToken: string;
  submitted: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.validatePassword } );

    this.route.queryParams.subscribe(params => {
      this.userId = params['i'];
      this.resetToken = params['t'];
    });
  }

  onResetPassword() {
    this.submitted = true;
    if (this.resetPasswordForm.valid) {
      this.userService.resetPassword(this.userId, this.resetToken, this.resetPasswordForm.controls.newPassword.value).subscribe(result => {
        this.gotResetResult = true;
        this.success = true;
        this.authService.setAccessToken(result.token);
      }, error => {
        this.success = false;
        this.gotResetResult = true;
        console.log(JSON.stringify(error.error));
      });
    }
  }

  validatePassword(group: FormGroup) {
    let pass = group.controls.newPassword.value;
    let confirmPass = group.controls.confirmPassword.value;

    if (pass === confirmPass)
      return null;
    else
      group.controls.confirmPassword.setErrors({ dontMatch: true });
  }
}

