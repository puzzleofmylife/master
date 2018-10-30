import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;
  showLoginFailed: boolean;
  showError: boolean;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit() {
    this.showLoginFailed = false;
    this.showError = false;
    this.submitted = true;

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
        .subscribe(result => {
          this.router.navigate(['/']);
        }, error => {
          if (error.error.LoginFailed)
            this.showLoginFailed = true;
          else
            this.showError = true;

          console.error('Login failed or error: ' + JSON.stringify(error.error));
        })
    }
  }
}
